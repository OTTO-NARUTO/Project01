from flask import Blueprint, request, jsonify
from models.user_model import db, PlanSelection  

plan_bp = Blueprint("plan_bp", __name__)

@plan_bp.route("/save", methods=["POST"])
def save_plan():
    data = request.json
    try:
        new_plan = PlanSelection(
            user_id=data["userId"],
            plan_name=data["planName"],
            price=data["price"]
        )
        db.session.add(new_plan)
        db.session.commit()
        return jsonify({"message": "Plan saved successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@plan_bp.route("/<int:user_id>", methods=["GET"])
def get_user_plans(user_id):
    try:
        plans = PlanSelection.query.filter_by(user_id=user_id).all()
        result = [{
            "planName": plan.plan_name,
            "price": plan.price,
            "selectedAt": plan.selected_at
        } for plan in plans]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
