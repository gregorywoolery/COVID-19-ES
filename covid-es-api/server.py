from os import error
from flask import Flask, jsonify, request
from flask_cors import CORS
from prolog_bridge import DiagnosePatient, GetStatistics, GetVariants, AddNewFact, GetPatientObj, GetSymptoms

app = Flask(__name__)
CORS(app)


# API function for getting overall statistics throughout exprt system.
# Call receives nothing and returns JSON with various statistics.
@app.route("/api/statistics")
def Statistics():
    stats = GetStatistics()
    return jsonify(stats)


@app.route("/api/facts", methods=["POST"])
def AddFacts():
    data = request.get_json()
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

# API function for getting all covid symptoms
# Call reveived nothing and return JSON with COVID-19 symptoms


@app.route("/api/facts/symptoms")
def GetSymptomsRoute():
    symptoms = GetSymptoms()
    return jsonify(symptoms)


# API function for diagnosis patient wit COVID-19 symptons.
# Call receives JSON with Patient Information and returns result.
@app.route("/api/patient-diagnosis", methods=["POST"])
def PatientDiagnosis():
    data = request.get_json()['patient']
    patientDiagnosis = DiagnosePatient(data)
    return jsonify(patientDiagnosis)


@app.route("/api/patient")
def GetPatient():
    patientid = request.args.get("patientid")
    patient = GetPatientObj(patientid)
    return jsonify(patient)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
