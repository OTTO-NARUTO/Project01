from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from config.db import init_db
from routes.user_routes import user_bp

# Load variables from .env file
load_dotenv()

# Create the Flask app
app = Flask(__name__)
CORS(app)

# Connect the app to the database
init_db(app)

# Register API routes
app.register_blueprint(user_bp, url_prefix="/api/users")

# Remove this for Lambda deployment:
if __name__ == "__main__":
     app.run(port=5000, debug=True)
