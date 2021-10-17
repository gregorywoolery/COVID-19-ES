from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields
from flask_cors import CORS
import pyswip
# from ThreadPool import dowork, initialise, process, pool

app = Flask(__name__)
CORS(app)
api = Api(app)


class CovidVariantRoute(Resource):
    def get(self):
        return {"data": "name"}

    def post(self):
        return {"data": "posted"}


class FactsRoute(Resource):
    def get(self):
        return {"data": "this is facts"}

    def post(self):
        return {"data": "posted"}


class StatisticsRoute(Resource):
    def get(self):
        return {"TotalPatient": "4", "CovidPatients": "1"}

    def post(self):
        return {"data": "posted"}


class PatientDiagnosisRoute(Resource):
    def get(self):
        # process("celsius_to_Fahrenheit(10)")
        # initialise()
        # temperature = dowork("celsius_to_Fahrenheit(10)")
        return {"data": "temp"}

    def post(self):
        return {"data": "posted"}


api.add_resource(FactsRoute, "/Facts")
api.add_resource(StatisticsRoute, "/Statistics")
api.add_resource(PatientDiagnosisRoute, "/PatientDiagnosis")
api.add_resource(CovidVariantRoute, "/CovidVariant")

if __name__ == "__main__":
    app.run(debug=True)
