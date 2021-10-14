from pyswip import Prolog
from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields
from flask_cors import CORS
from Routes import CovidVariantRoute, FactsRoute, PatientDiagnosisRoute, StatisticsRoute

app = Flask(__name__)
CORS(app)
api = Api(app)


prolog = Prolog()

prolog.consult("Application/Prolog_KnowledgeBase/lovebirds.pl")

# for(x in Countries):
#     prolog.asserta(countryWithHighRisk(x))

lovebirds = list(prolog.query("lovebirds(" + "Person1" + ",Person2)"))
# hasCovid = bool(prolog.query("diagnose_patient(" + symtom +"," + hasFever + "," + hasTaste)"))
# return {"PatientDiagnosis": hasCovid}
# diagnose_patient(symtom,hasFever,hasTaste)

print(lovebirds[0]['Person1'])
# print(lovebirds)


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
