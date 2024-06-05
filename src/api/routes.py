"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json(silent=True)
    print(body)
    if body is None: 
        return jsonify({'msg': "Debes enviar info en el body"}), 400
    if 'email' not in body:
        return jsonify({'msg': "El campo email es obligatorio"}), 400
    if 'password' not in body:
        return jsonify({'msg': "El campo password es obligatorio"}), 400
    new_user = User()
    new_user.email = body['email']
    new_user.password = body['password']
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': "El usuario ha sido creado con éxito"}), 201


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None: 
        return jsonify({'msg': "Debes enviar info en el body"}), 400
    if 'email' not in body:
        return jsonify({'msg': "El campo email es obligatorio"}), 400
    if 'password' not in body:
        return jsonify({'msg': "El campo password es obligatorio"}), 400
    user = User.query.filter_by(email=body['email']).first()
    if user is None: 
        return jsonify({'msg': "El usuario no existe"})
    if user.password != body['password']:
        return jsonify({'msg': "Contraseñla incorrecta"})
    access_token = create_access_token(identity=user.email)
    return jsonify({'msg': 'Login Successful', 'token': access_token})

@api.route("/protected", methods=["GET"])

def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
