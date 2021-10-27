"""
Python function to bridge between the server and the Prolog logic.
"""

from flask import json
from flask.json import jsonify
from pyswip_mt import PrologMT
from smtp_mail import sendMail
from fileoperations import writePatient, getPatientFromFile
import simplejson


FACTS_PROLOG_FILE = "Prolog/facts.pl"
BASE_PROLOG_FILE = "Prolog/patient_diagnosis.pl"

STACK_LIMIT = 4000000000    # Limit to about 30 seconds runtime

prolog = PrologMT()


def GetPatientObj(patientid):
    consult_covid_system()
    patient = getPatientFromFile(int(patientid))
    if patient == '':
        return {"success": "false"}

    return patient


# Function make decision on whether patient covid 19 state.
# Recieves patient data and returns diagnosis
def DiagnosePatient(patient):
    consult_covid_system()
    patientSymptoms = patient['Symptoms']
    symptoms = []
    for symp in patientSymptoms:
        symptoms.append(symp['Symptom'])

    query = f"celsius_to_Fahrenheit({patient['Temperature']}, Result)"
    diagnosis = list(prolog.query(query, maxresult=1))
    # writePatient(patient)
    # sendMail()
    return diagnosis


def GetStatistics():
    consult_covid_system()

    query = f"celsius_to_Fahrenheit(1, Result)"
    query_result = list(prolog.query(query, maxresult=1))

    # Return result
    return query_result


def GetVariants():
    consult_covid_system()
    query = "getVariants(Variant)"
    query_result = simplejson.dumps(list(prolog.query(query)))
    return simplejson.dumps(query_result)


def AddNewFact(fact):
    consult_covid_system()
    if fact['factType'] == "countries":
        assertion = f"covidCountries({fact['factOperand']})"

    print(assertion)
    query = prolog.asserta(assertion)


def GetCovidCountries():
    consult_covid_system()
    query = "covidCountries(Countries)"
    query_result = list(prolog.query(query))
    print(query_result)
    return simplejson.dumps(query_result)


def consult_covid_system():
    """
    Consults prolog files and sets overall stack limit
    """
    # Enlarge stack
    next(prolog.query(f"set_prolog_flag(stack_limit, {STACK_LIMIT})."))
    prolog.consult(FACTS_PROLOG_FILE)
    prolog.consult(BASE_PROLOG_FILE)
