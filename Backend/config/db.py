from flask_sqlalchemy import SQLAlchemy
import os

# Create a SQLAlchemy database instance
db = SQLAlchemy()

def init_db(app):
    # Configure the Flask app with the database URI from the .env file
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize SQLAlchemy with the app
    db.init_app(app)
