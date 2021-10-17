from flask import Flask, jsonify, request
from flask_cors import CORS

from prolog_bridge import diagnosePatient, getStatistics

app = Flask(__name__)
CORS(app)


@app.route("/api/statistics")
def Statistics():
    stats = getStatistics()
    return jsonify(stats)


@app.route("/api/patient-diagnosis", methods=["POST"])
def PatientDiagnosis():
    """
    API function for diagnosis patient wit COVID-19 symptons.
    Call receives JSON with Patient Information and returns result.
    """
    data = request.get_json()
    print(data)
    patientDiagnosis = diagnosePatient(1)
    return jsonify(patientDiagnosis)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
