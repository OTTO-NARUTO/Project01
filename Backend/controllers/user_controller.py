from flask import request, jsonify
from models.user_model import User
from config.db import db

# registraion process
def register_user():
    data = request.get_json()

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already exists"}), 400

    full_name = f"{data['firstName']} {data['lastName']}"
    
    # Storing data in the database (without encrption )
    new_user = User(
        firstName=data["firstName"],
        lastName=data["lastName"],
        full_name=full_name,
        email=data["email"],
        password=data["password"]
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Login a user and return full user data (AUTH)
def login_user():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if user and user.password == data["password"]:
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "fullName": user.full_name,
                "email": user.email
            }
        }), 200

    return jsonify({"message": "Invalid email or password"}), 401

# Get all users (READ)
def get_users():
    users = User.query.all()
    result = [{
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "fullName": user.full_name,
        "email": user.email
    } for user in users]

    return jsonify(result), 200

# Update user by ID (UPDATE)
def update_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    user.firstName = data.get("firstName", user.firstName)
    user.lastName = data.get("lastName", user.lastName)
    user.full_name = f"{user.firstName} {user.lastName}"
    user.email = data.get("email", user.email)

    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# Delete user by ID (DELETE)
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
