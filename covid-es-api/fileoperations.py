import os.path
from flask import json


def createFile():
    open("patients.txt", "a")


def writePatient(patient):
    patientCount = getTotalPatients()
    patient['id'] = patientCount

    with open(r"patients.txt", 'a') as patientFile:
        patientFile.write(f'{str(patient)}\n')


def getTotalPatients():
    patientCount = 0
    if(os.path.exists('patients.txt')):
        with open(r"patients.txt", 'r') as patientFile:
            patientCount = len(patientFile.readlines())

    return patientCount


def getAllPatientsFromFile():
    patients = []
    if(os.path.exists('patients.txt')):
        with open(r"patients.txt", 'r') as patientFile:
            for data in patientFile:
                patient = eval(data.rstrip('\n'))
                patients.append(patient)

    return patients


def getPatientFromFile(patientid):
    patientObj = ''
    if(os.path.exists('patients.txt')):
        with open(r"patients.txt", 'r') as patientFile:
            for data in patientFile:
                patient = eval(data.rstrip('\n'))
                if patient['id'] == patientid:
                    patientObj = patient
                    break

    return patientObj
