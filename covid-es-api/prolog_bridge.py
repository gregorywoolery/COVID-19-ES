"""
Python function to bridge between the server and the Prolog logic.
"""
from typing import ByteString
from flask import json, abort
from flask.json import jsonify
from pyswip.easy import Query
from pyswip_mt import PrologMT
from smtp_mail import sendMail
from fileoperations import writePatient, getPatientFromFile, getAllPatientsFromFile
from jinja2 import Template
from os import path

FACTS_PROLOG_FILE = "Prolog/facts.pl"
BASE_PROLOG_FILE = "Prolog/patient_diagnosis.pl"

STACK_LIMIT = 4000000000    # Limit to about 30 seconds runtime

prolog = PrologMT()

# Function used to get patient from file using patientid
def GetPatientObj(patientid):
    # Consults prolog files for making request
    consult_covid_system()

    # Gets patient from file, if none then throw exception
    patientResponse = getPatientFromFile(int(patientid))
    if patientResponse == '':
        abort(400)

    # Query Prolog knowledge base to return precautions, short and long term COVID-19 actions
    shortTermActionsQuery = f"covid_precautions(Actions)"
    if(patientResponse['risk_analysis'] > 0):
        shortTermActionsQuery = f"all_short_term_actions(Actions)"

    # Stores response in list variable for parsing
    shortTermActionsResponse = list(prolog.query(shortTermActionsQuery))
    shortTermActions = []
    for action in shortTermActionsResponse:
        shortTermActions.append(action['Actions'])

    longTermActionsQuery = f"all_long_term_actions(Actions)"
    longTermActionsResponse = list(prolog.query(longTermActionsQuery))
    longTermActions = []
    for action in longTermActionsResponse:
        longTermActions.append(action['Actions'])

    patientResponse['short_term_actions'] = shortTermActions
    patientResponse['long_term_actions'] = longTermActions

    # Gets covid risk status based on risk analysis variable stored
    patientResponse['risk_note'] = f"{patientResponse['firstName']} is not at risk"

    if(patientResponse['risk_analysis'] == 1):
        patientResponse['risk_note'] = f"{patientResponse['firstName']} may be at risk"
    if(patientResponse['risk_analysis'] == 2):
        patientResponse['risk_note'] = f"{patientResponse['firstName']} is at serious risk"

    return patientResponse


def GetPatientList():
    patients = getAllPatientsFromFile()
    patientList = []
    for patient in patients:
        patientInfo = {
            "id" : patient['id'],
            "name": patient["firstName"] + " " + patient["lastName"]
        }
        patientList.append(patientInfo)

    return patientList

# Function make decision on whether patient covid 19 state.
# Recieves patient data and returns diagnosis
def DiagnosePatient(patient):
    consult_covid_system()

    # If the symtpms dizziness, fainting or blurred vision were selected the check 
    # for systolic and diastolic values in patient object
    bloodPressureCheck = 0
    isBloodPressureCheck = False

    bloodPressureSymptoms = GetBloodPressureSymptoms('0')['symptomList']
    for bloodPressureSymptom in bloodPressureSymptoms:
        symptom = bloodPressureSymptom.decode() # Changes Byte to string to be used in comparison
        if symptom in patient['symptoms']:
            isBloodPressureCheck = True
            break


    if(isBloodPressureCheck == True):
        systolicValue = patient['systolic']
        diastolicValue = patient['diastolic']

        # Check blood pressure of user by querying Prolog knowledge base.
        # Result is parsed and stores in vaiable
        bloodPressureQuery = f"cal_low_blood_pressure_check({systolicValue}, {diastolicValue}, Result)"
        bloodPressureResponse = list(
            prolog.query(bloodPressureQuery, maxresult=1))
        bloodPressureCheck = bloodPressureResponse[0]['Result']

    # Queries prolog knowledge base for temperature conversion into Fahrenheit
    patientTemperature = patient['temperature']
    temperatureQuery = f"cal_celsius_to_fahrenheit({patientTemperature}, Result)"
    temperatureResponse = list(prolog.query(temperatureQuery, maxresult=1))
    temperature = temperatureResponse[0]['Result']

    # Section for determining covid-19 status of patient
    # Uses numbering system to assign covid risk based on
    # type of variant and level of syptom 
    covidRisk = 0
    mildSymptoms = 0
    severeSymptoms = 0
    variant = 'none'
    regularCovidCount = 0
    deltaCovidCount = 0
    muCovidCount = 0
    riskAnalysis = 0

    muMildCount = 0
    muSevereCount = 0
    deltaMildCount = 0
    deltaSereveCount = 0
    regularMildCount = 0
    regularSevereCount = 0

    patientSymptoms = patient['symptoms']

    # Gets all current patient syptoms an performs calculations on determining risk
    for symptom in patientSymptoms:
        variantTypeQuery = f'symptoms_type_variant(Type, Variant, "{symptom}")'
        variantTypeResponse = list(prolog.query(
            variantTypeQuery, maxresult=1))[0]

        if (len(variantTypeResponse) != 0):
            if(variantTypeResponse['Type'] == 'severe'):
                severeSymptoms += 1
                covidRisk += 5

            if(variantTypeResponse['Type'] == 'mild'):
                mildSymptoms += 1
                covidRisk += 1

            if(variantTypeResponse['Variant'] == 'regular'):
                regularCovidCount += 1
                covidRisk += 3

            if(variantTypeResponse['Variant'] == 'delta'):
                deltaCovidCount += 1
                covidRisk += 5
            if(variantTypeResponse['Variant'] == 'mu'):
                muCovidCount += 1
                covidRisk += 5

            # Place in function
            if(variantTypeResponse['Variant'] == 'mu' and variantTypeResponse['Type'] == 'mild'):
                muMildCount += 1
            if(variantTypeResponse['Variant'] == 'mu' and variantTypeResponse['Type'] == 'severe'):
                muSevereCount += 1
            if(variantTypeResponse['Variant'] == 'delta' and variantTypeResponse['Type'] == 'mild'):
                deltaMildCount += 1
            if(variantTypeResponse['Variant'] == 'delta' and variantTypeResponse['Type'] == 'severe'):
                deltaSereveCount += 1
            if(variantTypeResponse['Variant'] == 'regular' and variantTypeResponse['Type'] == 'mild'):
                regularMildCount += 1
            if(variantTypeResponse['Variant'] == 'regular' and variantTypeResponse['Type'] == 'severe'):
                regularSevereCount += 1

    # Matrix counting system to determine if patient at risk of Covid
    covidExposed = patient['covidExposed']
    riskAnalysisQuery = f"covid_risk_analysis({covidRisk}, {mildSymptoms}, {regularCovidCount}, {deltaCovidCount}, {muCovidCount}, {covidExposed}, CovidRisk, RiskAnalysis)"
    riskAnalysisResponse = list(prolog.query(riskAnalysisQuery, maxresult=1))
    riskAnalysis = riskAnalysisResponse[0]['RiskAnalysis']

    # Identify_covid_variant
    if(riskAnalysis >= 1):
        # variantAnalysisQuery = f"covid_variant_select({muCovidCount}, {deltaCovidCount}, {regularCovidCount}, {muSevereCount}, {muMildCount}, {deltaSereveCount}, {deltaMildCount}, Variant)"
        # variantAnalysisResponse = list(prolog.query(variantAnalysisQuery))
        # # variant = variantAnalysisResponse[0]['Variant']
        # print(variantAnalysisResponse)

        if(muCovidCount > deltaCovidCount or
            (muSevereCount >= 1 and muSevereCount >= deltaSereveCount) or
                (muMildCount >= 1 and muMildCount >= deltaMildCount)):
            variant = 'mu'

        elif(deltaCovidCount > muCovidCount or
             (deltaSereveCount >= 1 and deltaSereveCount > muSevereCount) or
                (deltaMildCount >= 1 and deltaMildCount > muMildCount)):
            variant = 'delta'

        elif(regularCovidCount >= 1):
            variant = 'regular'

    # Write patient to file
    patientDiagnosis = {
        "firstName": patient['firstName'],
        "lastName": patient['lastName'],
        "age":  patient['age'],
        "covid_exposed": patient['covidExposed'],
        "temperature": temperature,
        "isBloodPressureCheck": isBloodPressureCheck,
        "blood_presure": bloodPressureCheck,
        "risk_analysis": riskAnalysis,
        "variant": variant,
        "symptoms": patientSymptoms,
        "systolic": patient['systolic'],
        "diastolic": patient['diastolic']
    }

    patientID = writePatient(patientDiagnosis)

    # When finished -> Check if spike
    CheckIfSpike()

    return {
        "patientID": patientID
    }

# Determines if spike has been shown in covid system.
# If there are 10 or more patients having a risk of covid then
# Send email to those in charge of the system 
def CheckIfSpike():
    # Gets all patients from file and runs a loop, extracting their risk analysis
    # Adds to riskOfCovid then makes decision on spike

    patients = getAllPatientsFromFile()
    riskOfCovid = 0

    for patient in patients:
        if(patient['risk_analysis'] > 0):
            riskOfCovid += 1

    if(riskOfCovid >= 10):
        sendMail()


# Function to get all covid symtpoms from the prolog knowledge base
# A prolog query is used with _ operations to just recieve the Symptoms
def GetSymptoms():
    consult_covid_system()
    query = "symptoms_type_variant(_,_,Symptom)"
    query_result = list(prolog.query(query))
    return query_result

# Function to get all covid symtpoms from the prolog knowledge base
# A prolog query is used with _ operations to just recieve the Symptoms
def GetBloodPressureSymptoms(isBloodPressure):
    consult_covid_system()
    symptomsList = []

    # Get Symptoms from blood pressure check and regular symptoms
    # With this the symptoms in the blood pressure symptoms can be removed
    # from regular syptoms list
    symptomsQuery = "blood_pressure_check_symptoms(BloodPressure)"
    symptomsResult = list(prolog.query(symptomsQuery))
    bloodPressureSyptomList = []
    for symptom in symptomsResult:
        bloodPressureSyptomList.append(symptom["BloodPressure"])

    if isBloodPressure == '1':
        symptomsQuery = "symptoms_type_variant(_,_,Symptom)"
        symptomsResult = list(prolog.query(symptomsQuery))
        regularSymptomsList = []
        for symptom in symptomsResult:
            regularSymptomsList.append(symptom["Symptom"])

        # Remove blood pressure symptoms from list
        for bloodPressureSymptom in bloodPressureSyptomList:
            regularSymptomsList.remove(bloodPressureSymptom)

        symptomsList = regularSymptomsList
    if isBloodPressure == '0':
        symptomsList = bloodPressureSyptomList


    return {
        "symptomList": symptomsList
    }



# Function to calulate needed statistics from patient covid-19 test records.
def GetStatistics():
    # Consults prolog file and recieves all patients from file
    consult_covid_system()
    patients = getAllPatientsFromFile()
    totalPatients = len(patients)

    # Variables will be used to store statisics
    patientAtRisk = patientNoneRisk = 0
    deltaVariantCount = muVariantCount = regularCount = 0
    mildCount = severeCount = 0
    NoneRiskPercentage = RiskPercentage = ServerePercentage = MildPercentage = MuPercentage = DeltaPercentage = RegularPercentage = 0

    # Goes through lis of patients and adds to each covid variant, at risk and symptom type variables.
    # Statistics recived will be a percentage of Covid Variants, Patients at risk and symptom type, whether mild or severe.
    for patient in patients:
        if(patient['variant'] == "mu"):
            muVariantCount += 1
        elif(patient['variant'] == "delta"):
            deltaVariantCount += 1
        elif(patient['variant'] == "regular"):
            regularCount += 1

        if(patient['risk_analysis'] > 0):
            patientAtRisk += 1
        else:
            patientNoneRisk += 1

        mildType = False
        severeType = True
        for symptom in patient['symptoms']:
            symptomTypeQuery = f'symptoms_type_variant(Type,_,"{symptom}")'
            symptomTypeResponse = list(
                prolog.query(symptomTypeQuery, maxresult=1))
            symptomType = symptomTypeResponse[0]['Type']
            if(symptomType == "mild"):
                mildCount += 1
            if(symptomType == "severe"):
                severeCount += 1

    
    totalRecordedSymptomType = mildCount + severeCount

    # Calculates percentages using prolog queries and result parsing for respective values
    # To avoid diviing by zero: If there are no patients then skip calculation step
    if patients != []:
        RiskCalulationQuery = f'pos_neg_calculation({totalPatients},{patientAtRisk},{patientNoneRisk},RiskPercentaage, NoneRiskPercentage)'
        RiskCalulationResponse = list(
            prolog.query(RiskCalulationQuery, maxresult=1))
        RiskPercentage = RiskCalulationResponse[0]['RiskPercentaage']
        NoneRiskPercentage = RiskCalulationResponse[0]['NoneRiskPercentage']

        if(totalRecordedSymptomType != 0):
            SymptomsTypeCalculationQuery = f"symptoms_type_calculations({totalRecordedSymptomType}, {mildCount}, {severeCount}, MildPercentage, ServerePercentage)"
            SymptomsTypeCalculationResponse = list(
                prolog.query(SymptomsTypeCalculationQuery, maxresult=1))
            MildPercentage = SymptomsTypeCalculationResponse[0]['MildPercentage']
            ServerePercentage = SymptomsTypeCalculationResponse[0]['ServerePercentage']

        VariantCalculationQuery = f"variant_calculations({totalPatients}, {muVariantCount}, {deltaVariantCount}, {regularCount}, MuPercentage, DeltaPercentage, RegularPercentage)"
        VariantCalculationResponse = list(
            prolog.query(VariantCalculationQuery, maxresult=1))
        MuPercentage = VariantCalculationResponse[0]['MuPercentage']
        DeltaPercentage = VariantCalculationResponse[0]['DeltaPercentage']
        RegularPercentage = VariantCalculationResponse[0]['RegularPercentage']

    return {
        "Risk": {
            "NoneRisk": {
                "amount": patientNoneRisk,
                "percentage": "{:.2f}".format(NoneRiskPercentage),
            },
            "AtRisk": {
                "amount": patientAtRisk,
                "percentage": "{:.2f}".format(RiskPercentage),
            }
        },
        "CovidVariant": {
            "Delta": {
                "amount": deltaVariantCount,
                "percentage": "{:.2f}".format(DeltaPercentage)
            },
            "Mu": {
                "amount": muVariantCount,
                "percentage": "{:.2f}".format(MuPercentage)
            },
            "Regular": {
                "amount": regularCount,
                "percentage": "{:.2f}".format(RegularPercentage)
            }
        },
        "Symptom": {
            "Mild": {
                "amount": mildCount,
                "percentage": "{:.2f}".format(MildPercentage)
            },
            "Severe": {
                "amount": severeCount,
                "percentage": "{:.2f}".format(ServerePercentage)
            },
        }
    }


# Function queries prolog knowledge base to get list of covid variants and returns them
def GetVariants():
    # Gets covid variants and regular virus from Prolog Database
    consult_covid_system()
    query = "covid_variant(Variant)"
    query_result = list(prolog.query(query))
    return query_result


# Function delegates adding of new fact to either precautions or symptoms functions
def AddNewFact(factParam):
    if(factParam['type'] == "precaution"):
        HandlePrecautionFact(factParam)
    if(factParam['type'] == "symptom"):
        HandleSymptomFact(factParam)
    if(factParam['type'] == "bloodpressure"):
        HandleBloodPressureSymptomFact(factParam)

# Functions add precaution fact to knowledge base 
def HandlePrecautionFact(precautionFact):
    consult_covid_system()
    
    fact = precautionFact['fact']
    precautionType = precautionFact['precautionType']

    # Check if fact has already been added using Prolog query
    # If it has then throw error that it has been added
    precautionExistquery = f'precaution_exist("{fact}", "{fact}", "{fact}")'
    query_result = bool(list(prolog.query(precautionExistquery)))

    if(query_result == True):
        abort(400)

    # Construct fact to be added in database
    newPrologFact = ""
    if(precautionType == "long_term"):
        newPrologFact = f"long_term_actions(\"{fact}\")."
        prolog.assertz("long_term_actions(\""+fact+"\")")

    elif(precautionType == "short_term"):
        newPrologFact = f"short_term_actions(\"{fact}\")."
        prolog.assertz("short_term_actions(\""+fact+"\")")

    # Place fact in prolog file
    if(newPrologFact != ''):
        HandleAddToProlog(newPrologFact)

# Function adds new symptoms to prolog knowledge base
def HandleSymptomFact(symptomFact):
    consult_covid_system()

    fact = symptomFact['fact']
    symptomType = symptomFact['symtomType']
    variant = symptomFact['variant']

    # Check if fact has already been added using Prolog query
    # If it has then throw error that it has been added
    symptomExistquery = f'symptom_exist("{fact}")'
    query_result = bool(list(prolog.query(symptomExistquery)))

    if(query_result == True):
        abort(400)

    # Check if variant recieved exist in prolog knowledge base use a query
    # If it doesn't exist then throw error 
    variantExistquery = f'covid_variant({variant})'
    query_result = bool(list(prolog.query(variantExistquery)))

    if(query_result == False):
        abort(400)
    
    # Check if symptom type is either sever or mild
    # If it is not then throw error
    if(symptomType != "severe" and symptomType != "mild"):
        abort(400)
        
    # Add fact to knowledge base
    newPrologFact = f'symptoms_type_variant({symptomType}, {variant}, "{fact}").'
    prolog.assertz("symptoms_type_variant({symptomType}, {variant}, \""+fact+"\")")

    # Place fact in prolog file
    if(newPrologFact != ''):
        HandleAddToProlog(newPrologFact)


def HandleBloodPressureSymptomFact(bloodPressureFact):
    consult_covid_system()

    fact = bloodPressureFact['fact']

    # Check if fact has already been added using Prolog query
    # If it has then throw error that it has been added
    symptomExistquery = f'blood_pressure_check_symptoms("{fact}")'
    query_result = bool(list(prolog.query(symptomExistquery)))

    if(query_result == True):
        abort(400)
     
    # Add fact to knowledge base
    newPrologFact = f'blood_pressure_check_symptoms("{fact}").'
    prolog.assertz("blood_pressure_check_symptoms(\""+fact+"\")")

    # Place fact in prolog file
    if(newPrologFact != ''):
        HandleAddToProlog(newPrologFact)


# Function adds new prolog fact to knowledge base by rewriting the file and adding the new fact
def HandleAddToProlog(fact):
    # Check if file wasn't already generated
    if path.exists(FACTS_PROLOG_FILE):
        # Load pl file as template
        with open(FACTS_PROLOG_FILE, "r") as f_obj:
            template = f_obj.read()

        # Generate and write new statements
        rendered_template = f"{template}\n{fact}"

        with open("Prolog/facts.pl", "w") as f_obj:
            f_obj.write(rendered_template)


def consult_covid_system():
    """
    Consults prolog files and sets overall stack limit
    """
    # Enlarge stack
    next(prolog.query(f"set_prolog_flag(stack_limit, {STACK_LIMIT})."))
    prolog.consult(FACTS_PROLOG_FILE)
    prolog.consult(BASE_PROLOG_FILE)
