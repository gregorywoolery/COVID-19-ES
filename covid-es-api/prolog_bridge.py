"""
Python function to bridge between the server and the Prolog logic.
"""

from flask import json
from flask.json import jsonify
from pyswip.easy import Query
from pyswip_mt import PrologMT
from smtp_mail import sendMail
from fileoperations import writePatient, getPatientFromFile, getAllPatientsFromFile


FACTS_PROLOG_FILE = "Prolog/facts.pl"
BASE_PROLOG_FILE = "Prolog/patient_diagnosis.pl"

STACK_LIMIT = 4000000000    # Limit to about 30 seconds runtime

prolog = PrologMT()


def GetPatientObj(patientid):
    consult_covid_system()

    patientResponse = getPatientFromFile(int(patientid))
    if patientResponse == '':
        return {"success": "false"}

    shortTermActionsQuery = f"covid_precautions(Actions)"
    if(patientResponse['risk_analysis'] > 0):
        shortTermActionsQuery = f"all_short_term_actions(Actions)"

    shortTermActionsResponse = list(
        prolog.query(shortTermActionsQuery))
    shortTermActions = []
    for action in shortTermActionsResponse:
        shortTermActions.append(
            action['Actions']
        )

    longTermActionsQuery = f"all_long_term_actions(Actions)"
    longTermActionsResponse = list(
        prolog.query(longTermActionsQuery))
    longTermActions = []
    for action in longTermActionsResponse:
        longTermActions.append(
            action['Actions']
        )

    patientResponse['short_term_actions'] = shortTermActions
    patientResponse['long_term_actions'] = longTermActions

    patientResponse['risk_note'] = f"{patientResponse['firstName']} is not at risk"

    if(patientResponse['risk_analysis'] == 1):
        patientResponse['risk_note'] = f"{patientResponse['firstName']} is at risk"
    if(patientResponse['risk_analysis'] == 2):
        patientResponse['risk_note'] = f"{patientResponse['firstName']} is at serious risk"

    return patientResponse


# Function make decision on whether patient covid 19 state.
# Recieves patient data and returns diagnosis
def DiagnosePatient(patient):
    consult_covid_system()

    bloodPressureCheck = 0
    if('dizziness' in patient['symptoms'] or
        'fainting' in patient['symptoms'] or
       'blurred vision' in patient['symptoms']):
        systolicValue = patient['systolic']
        diastolicValue = patient['diastolic']

        bloodPressureQuery = f"cal_low_blood_pressure_check({systolicValue}, {diastolicValue}, Result)"
        bloodPressureResponse = list(
            prolog.query(bloodPressureQuery, maxresult=1))
        bloodPressureCheck = bloodPressureResponse[0]['Result']

    patientTemperature = patient['temperature']
    temperatureQuery = f"cal_celsius_to_fahrenheit({patientTemperature}, Result)"
    temperatureResponse = list(prolog.query(temperatureQuery, maxresult=1))
    temperature = temperatureResponse[0]['Result']

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
    if(mildSymptoms > 4):
        covidRisk += 4

    if(regularCovidCount >= 3):
        covidRisk += 4

    if(deltaCovidCount > 2):
        covidRisk += 10

    if(muCovidCount > 2):
        covidRisk += 10

    if(patient['covidExposed'] == 1):
        covidRisk += 3

    # Analyze risk based of how much of a risk
    if(covidRisk > 6):
        riskAnalysis = 1

    if(covidRisk > 14):
        riskAnalysis = 2

    print(riskAnalysis)
    print(covidRisk)

    # identify_covid_variant
    if(riskAnalysis >= 1):
        if(muCovidCount >= deltaCovidCount):
            variant = 'mu'
        elif(deltaCovidCount < muCovidCount):
            variant = 'delta'
        elif(muSevereCount > deltaSereveCount or muMildCount > deltaMildCount):
            variant = 'mu'
        elif(deltaSereveCount > muSevereCount or deltaMildCount > muMildCount):
            variant = 'delta'
        elif(regularCovidCount >= 3):
            variant = 'regular'

    # Write patient to file
    patientDiagnosis = {
        "firstName": patient['firstName'],
        "lastName": patient['lastName'],
        "age":  patient['age'],
        "covid_exposed": patient['covidExposed'],
        "temperature": temperature,
        "blood_presure": bloodPressureCheck,
        "risk_analysis": riskAnalysis,
        "variant": variant,
        "symptoms": patientSymptoms,
        "systolic": patient['systolic'],
        "diastolic": patient['diastolic']
    }

    patientID = writePatient(patientDiagnosis)

    # When finished -> Check if spike
    # CheckIfSpike()

    return {
        "patientID": patientID
    }


def CheckIfSpike():
    patients = getAllPatientsFromFile()
    riskOfCovid = 0

    for patient in patients:
        if(patient['risk_analysis'] > 0):
            riskOfCovid += 1

    if(riskOfCovid >= 2):
        sendMail()


def GetSymptoms():
    consult_covid_system()

    query = "symptoms_type_variant(_,_,Symptom)"
    query_result = list(prolog.query(query))
    return query_result


def GetStatistics():
    consult_covid_system()
    patients = getAllPatientsFromFile()
    totalPatients = len(patients)

    patientAtRisk = 0
    patientNoneRisk = 0

    deltaVariantCount = 0
    muVariantCount = 0
    regularCount = 0

    mildCount = 0
    severeCount = 0
    # Patients At Risk vs Not At Risk
    for patient in patients:
        if(patient['variant'] == "mu"):
            muVariantCount += 1
        elif(patient['variant'] == "delta"):
            deltaVariantCount += 1
        else:
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
                mildType = True
            if(symptomType == "severe"):
                severeType = True

        if(mildType == True):
            mildCount += 1
        if(severeType == True):
            severeCount += 1

    print(mildCount)

    RiskCalulationQuery = f'pos_neg_calculation({totalPatients},{patientAtRisk},{patientNoneRisk},RiskPercentaage, NoneRiskPercentage)'
    RiskCalulationResponse = list(
        prolog.query(RiskCalulationQuery, maxresult=1))
    RiskPercentage = RiskCalulationResponse[0]['RiskPercentaage']
    NoneRiskPercentage = RiskCalulationResponse[0]['NoneRiskPercentage']

    SymptomsTypeCalculationQuery = f"symptoms_type_calculations({totalPatients}, {mildCount}, {severeCount}, MildPercentage, ServerePercentage)"
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


def GetVariants():
    consult_covid_system()
    query = "covid_variant(Variant)"
    query_result = list(prolog.query(query))
    return query_result


def AddNewFact(factParam):
    print(factParam)
    if(factParam['type'] == "precaution"):
        HandlePrecautionFact(factParam)
    if(factParam['type'] == "symptom"):
        HandleSymptomFact(factParam)


def HandlePrecautionFact(precautionFact):
    consult_covid_system()
    fact = precautionFact['fact']
    precautionType = precautionFact['precautionType']
    # # precautionExistquery = f'precaution_exist(Fact)'
    # # query_result = list(prolog.query(precautionExistquery))
    # # print(query_result)

    assertionFact = f'covid_precautions("{fact}")'
    print(assertionFact)

    # prolog.asserta(assertion=assertionFact)


def HandleSymptomFact(symptomFact):
    fact = symptomFact['fact']
    # symptomType = symptomFact['symtomType']
    # symptomExistquery = f"covid_precautions({fact})"
    # query = f"symptoms_type_variant(_, _, {fact})"


def consult_covid_system():
    """
    Consults prolog files and sets overall stack limit
    """
    # Enlarge stack
    next(prolog.query(f"set_prolog_flag(stack_limit, {STACK_LIMIT})."))
    prolog.consult(FACTS_PROLOG_FILE)
    prolog.consult(BASE_PROLOG_FILE)
