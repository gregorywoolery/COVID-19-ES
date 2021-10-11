from flask_restful import Resource


class FactsRoute(Resource):
    def get(self):
        return {"data": "this is facts"}

    def post(self):
        return {"data": "posted"}
