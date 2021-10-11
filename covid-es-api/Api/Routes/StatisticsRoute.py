from flask_restful import Resource


from flask_restful import Resource


class StatisticsRoute(Resource):
    def get(self):
        return {"data": "1 of 4"}

    def post(self):
        return {"data": "posted"}
