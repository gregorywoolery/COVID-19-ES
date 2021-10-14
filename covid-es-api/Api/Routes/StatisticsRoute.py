from flask_restful import Resource


class StatisticsRoute(Resource):
    def get(self):
        return {"TotalPatient": "4", "CovidPatients": "1"}

    def post(self):
        return {"data": "posted"}
