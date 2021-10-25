import os.path


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
        print('exist')
        with open(r"patients.txt", 'r') as patientFile:
            patientCount = len(patientFile.readlines())

    return patientCount
