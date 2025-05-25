from flask import request, jsonify
from models.user_model import User
from config.db import db
import bcrypt

# ✅ Register a new user (CREATE)
def register_user():
    data = request.get_json()

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already exists"}), 400

    hashed_pw = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())

    new_user = User(
        firstName=data["firstName"],
        lastName=data["lastName"],
        email=data["email"],
        password=hashed_pw.decode("utf-8")
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# ✅ Login a user and return full user data (AUTH)
def login_user():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if user and bcrypt.checkpw(data["password"].encode("utf-8"), user.password.encode("utf-8")):
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email
            }
        }), 200

    return jsonify({"message": "Invalid email or password"}), 401

# ✅ Get all users (READ)
def get_users():
    users = User.query.all()
    result = [{
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email
    } for user in users]

    return jsonify(result), 200

# ✅ Update user by ID (UPDATE)
def update_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    user.firstName = data.get("firstName", user.firstName)
    user.lastName = data.get("lastName", user.lastName)
    user.email = data.get("email", user.email)

    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# ✅ Delete user by ID (DELETE)
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
