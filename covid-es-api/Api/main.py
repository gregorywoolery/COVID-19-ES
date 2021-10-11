from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)


class FactsRoute(Resource):
    def get(self):
        return {"data": "this is facts"}

    def post(self):
        return {"data": "posted"}


class StatisticsRoute(Resource):
    def get(self):
        return {"data": "1 of 4"}

    def post(self):
        return {"data": "posted"}


class PatientDiagnosisRoute(Resource):
    def get(self, name):
        return {"data": name}

    def post(self):
        return {"data": "posted"}

# /CovidVariant


class CovidVariantRoute(Resource):
    def get(self, name):
        return {"data": name}

    def post(self):
        return {"data": "posted"}


api.add_resource(FactsRoute, "/Facts")
api.add_resource(StatisticsRoute, "/Statistics")
api.add_resource(PatientDiagnosisRoute, "/PatientDiagnosis")
api.add_resource(CovidVariantRoute, "/CovidVariant")

if __name__ == "__main__":
    app.run(debug=True)
