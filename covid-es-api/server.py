from flask import Flask, jsonify, request
from flask_cors import CORS
from prolog_bridge import diagnosePatient, getStatistics

app = Flask(__name__)
CORS(app)

"""
API function for getting overall statistics throughout exprt system.
Call receives nothing and returns JSON with various statistics.
"""


@app.route("/api/statistics")
def Statistics():
    stats = getStatistics()
    return jsonify(stats)


@app.route("/api/facts", methods=["POST"])
def AddFacts():
    data = request.get_json()
    print(data)
    return jsonify(data)


@app.route("/api/facts/variants")
def GetFacts():
    return jsonify({'Variant': 'Mu'}, {'Variant': 'Delta'}, {'Variant': 'Regular'})


"""
API function for diagnosis patient wit COVID-19 symptons.
Call receives JSON with Patient Information and returns result.
"""


@app.route("/api/patient-diagnosis", methods=["POST"])
def PatientDiagnosis():
    data = request.get_json()
    patientDiagnosis = diagnosePatient(data)
    return jsonify(patientDiagnosis)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
