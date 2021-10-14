from flask_restful import Resource


class CovidVariantRoute(Resource):
    def get(self, name):
        return {"data": name}

    def post(self):
        return {"data": "posted"}
