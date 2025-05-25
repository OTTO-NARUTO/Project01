from app import app
from config.db import db
from models.user_model import User

# Create tables inside the connected MySQL database
with app.app_context():
    db.create_all()
    print(" Tables created successfully!")
