from flask import Blueprint
from controllers.user_controller import (
    register_user, login_user,
    get_users, update_user, delete_user
)

user_bp = Blueprint("user_bp", __name__)

user_bp.route("/register", methods=["POST"])(register_user)
user_bp.route("/login", methods=["POST"])(login_user)
user_bp.route("/", methods=["GET"])(get_users)
user_bp.route("/<int:user_id>", methods=["PUT"])(update_user)
user_bp.route("/<int:user_id>", methods=["DELETE"])(delete_user)
