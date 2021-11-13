import os.path
from flask import json


# Function creates file and opens for appending to it
def createFile():
    open("patients.txt", "a")

# Function writes new patient to file and returns their id from the file
def writePatient(patient):
    patientCount = getTotalPatients()

    # Adds an identifier to patient object to be stored
    patient['id'] = patientCount

    # Opens file for appending and writes new patient to file
    # File closes automatically by "with" command
    with open(r"patients.txt", 'a') as patientFile:
        patientFile.write(f'{str(patient)}\n')

    return patient['id']


# Function gets total patient count from the file.
# Initialises patient counter to 0 and open file for reading from where the 
# total nnumber of patients will be extracted and returned.
def getTotalPatients():
    patientCount = 0
    if(os.path.exists('patients.txt')):
        with open(r"patients.txt", 'r') as patientFile:
            patientCount = len(patientFile.readlines())

    return patientCount


# Function gets all patient records from the file
# Opens file for reading and stores each patient record in a list variable
# New patient list is returned
def getAllPatientsFromFile():
    patients = []
    if(os.path.exists('patients.txt')):
        with open(r"patients.txt", 'r') as patientFile:
            for data in patientFile:
                patient = eval(data.rstrip('\n'))
                patients.append(patient)

    return patients

# Function get specific patient from file 
# Function recieves patient id from where file will be opened for reading.
# Records will be searched for specific record that contains the id
# Returns the patient object for particular id
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
