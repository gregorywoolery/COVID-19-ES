"""
Python function to bridge between the server and the Prolog logic.
"""
from os import path
from typing import List, Optional
from itertools import islice

from pyswip_mt import PrologMT
from jinja2 import Template

BASE_PROLOG_FILE = "patient_diagnosis.pl"
STACK_LIMIT = 4000000000    # Limit to about 30 seconds runtime

prolog = PrologMT()
currently_consulted = ""


def diagnosePatient(patient):
    consult_covid_system()

    prolog_query = f"celsius_to_Fahrenheit({patient})"
    print(patient)
    query_result = list(prolog.query(prolog_query, maxresult=1))

    # Return result
    return query_result


def getStatistics():
    consult_covid_system()

    prolog_query = f"celsius_to_Fahrenheit(1)"
    query_result = list(prolog.query(prolog_query, maxresult=1))

    # Return result
    return query_result


def consult_covid_system():
    """
    Generate the right sized prolog file and add it as
    consulted file to global prolog obj.
    """
    # Enlarge stack
    next(prolog.query(f"set_prolog_flag(stack_limit, {STACK_LIMIT})."))
    prolog.consult(BASE_PROLOG_FILE)
