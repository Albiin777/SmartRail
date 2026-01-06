from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend to access backend

@app.route("/")
def home():
    return "Backend is running"

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    print("REGISTER DATA:", data)
    return jsonify({"message": "Registered successfully"})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print("LOGIN DATA:", data)
    return jsonify({"message": "Login successful"})

if __name__ == "__main__":
    app.run(debug=True)
