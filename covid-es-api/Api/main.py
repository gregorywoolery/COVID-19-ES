from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields
from flask_cors import CORS
from Routes import CovidVariantRoute, FactsRoute, PatientDiagnosisRoute, StatisticsRoute

app = Flask(__name__)
CORS(app)
api = Api(app)


factsRoute = FactsRoute
patientDiagnosisRoute = PatientDiagnosisRoute
covidVariantRoute = CovidVariantRoute
statisticsRoute = StatisticsRoute


api.add_resource(factsRoute, "/Facts")
api.add_resource(statisticsRoute, "/Statistics")
api.add_resource(patientDiagnosisRoute, "/PatientDiagnosis")
api.add_resource(covidVariantRoute, "/CovidVariant")

if __name__ == "__main__":
    app.run(debug=True)
