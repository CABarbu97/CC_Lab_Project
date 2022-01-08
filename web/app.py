from flask import Flask, jsonify, request, json, Response
from flask_restful import Api, Resource
from pymongo import MongoClient
 
 
app = Flask(__name__)
api = Api(app)
 
 
client = MongoClient("mongodb://db:27017")
db = client["TestDB"]
testCollection = db["testCollection"]
 
 
 
# -- Welcome API
class Welcome(Resource):
    def get(self):
        # Show a welcome greetings
        retJson = {
            "status": "ok",
            "msg": "Welcome Mihnea! Your Python & MongoDB based API server is working successfully!"
        }
        return jsonify(retJson)
 
 
 
 
 
api.add_resource(Welcome, '/welcome')
 
 
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
