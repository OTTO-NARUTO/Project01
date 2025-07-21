from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from config.db import init_db, db
from routes.user_routes import user_bp
from routes.plan_routes import plan_bp
from models.user_model import User, PlanSelection  # ✅ Register models

# ✅ Load environment variables from .env (if needed)
load_dotenv()

# ✅ Create the Flask app instance
app = Flask(__name__)
CORS(app)

# ✅ Initialize DB connection with app
init_db(app)

# ✅ Register API routes
app.register_blueprint(user_bp, url_prefix="/api/users")
app.register_blueprint(plan_bp, url_prefix="/api/plans")

# ✅ Auto-create tables (user & plan_selection)
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=5000, debug=True)
