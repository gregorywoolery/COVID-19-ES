from os import error
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from prolog_bridge import DiagnosePatient, GetStatistics, GetVariants, AddNewFact, GetPatientObj, GetSymptoms, GetBloodPressureSymptoms

app = Flask(__name__)
CORS(app)

# Validation Schemas for api
def FactsValidationSchema(object):
    if(not 'type' in object or not 'fact' in object):
        abort(400)
    if(object['type'] == "precaution" and not 'precautionType' in object):
        abort(400)
    elif(object['type'] == "symptom" and (not 'symtomType' in object or not 'variant' in object)):
        abort(400)
    elif(object['type'] != "symptom" and object['type'] != "precaution" and object['type'] != "bloodpressure"):
        abort(400)

def PatientDiagnosisValidation(object):
    if(not 'patient' in object):
        abort(400)
    data = object['patient']
    if(not 'firstName' in data or not 'lastName' in data
        or not 'age' in data or not 'covidExposed' in data
            or not 'temperature' in data or not 'symptoms' in data):
        abort(400)
    return data



# API function for getting overall statistics throughout exprt system.
# Call receives nothing and returns JSON with various statistics.
@app.route("/api/statistics")
def Statistics():
    stats = GetStatistics()
    return jsonify(stats)


# API function for adding facts to the Prolog Knowledge base
# Recieve facts object and return response if success or not
@app.route("/api/facts", methods=["POST"])
def AddFacts():
    data = request.get_json()
    FactsValidationSchema(data)
    AddNewFact(data)
    return jsonify(data)


# API function for getting all covid variants
# Call reveived nothing and return JSON with COVID-19 variants
@app.route("/api/facts/variants")
def GetFacts():
    try:
        variants = GetVariants()
        return jsonify(variants)
    except:
        pass

# API function for getting all covid symptoms.
# Call reveived nothing and return JSON with COVID-19 symptoms.
@app.route("/api/facts/symptoms")
def GetSymptomsRoute():
    symptoms = GetSymptoms()
    return jsonify(symptoms)

# API function for getting all covid symptoms.
# Call reveived nothing and return JSON with COVID-19 symptoms.
@app.route("/api/facts/symptoms/bloodpressure")
def GetBloodPressureSymptomsRoute():
    if(not 'option' in request.args):
            abort(400)

    isBloodPressure = request.args.get("option")
    
    symptoms = GetBloodPressureSymptoms(isBloodPressure)
    return jsonify(symptoms)


# API function for diagnosis patient wit COVID-19 symptons.
# Call receives JSON with Patient Information and returns result.
@app.route("/api/patient-diagnosis", methods=["POST"])
def PatientDiagnosis():
    data = request.get_json()
    data = PatientDiagnosisValidation(data)
    patientDiagnosis = DiagnosePatient(data)
    return jsonify(patientDiagnosis)


# API Function for retrieving patient Diagnosis information.
# Call recived patient id which is a number and returns patient diagnosis information
@app.route("/api/patient")
def GetPatient():
    if(not 'patientid' in request.args):
        abort(400)

    patientid = request.args.get("patientid")
    patient = GetPatientObj(patientid)
    return jsonify(patient)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
