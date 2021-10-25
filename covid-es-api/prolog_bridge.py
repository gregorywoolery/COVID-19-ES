"""
Python function to bridge between the server and the Prolog logic.
"""

from pyswip_mt import PrologMT
from smtp_mail import sendMail
from fileoperations import writePatient
BASE_PROLOG_FILE = "Prolog/patient_diagnosis.pl"
STACK_LIMIT = 4000000000    # Limit to about 30 seconds runtime

prolog = PrologMT()
currently_consulted = ""

"""
    Function make decision on whether patient covid 19 state. 
    Recieves patient data and returns diagnosis
"""


def diagnosePatient(patient):
    consult_covid_system()
    query = f"celsius_to_Fahrenheit({patient['Temperature']}, Result)"
    diagnosis = list(prolog.query(query, maxresult=1))
    writePatient(patient)
    # sendMail()
    return diagnosis


def getStatistics():
    consult_covid_system()

    prolog_query = f"celsius_to_Fahrenheit(1, Result)"
    query_result = list(prolog.query(prolog_query, maxresult=1))

    # Return result
    return query_result


def consult_covid_system():
    """
    Consults prolog files and sets overall stack limit
    """
    # Enlarge stack
    next(prolog.query(f"set_prolog_flag(stack_limit, {STACK_LIMIT})."))
    prolog.consult(BASE_PROLOG_FILE)
