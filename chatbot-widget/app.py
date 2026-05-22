import os
import json
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types

app = Flask(__name__)
CORS(app)

# 🔑 SECURE CREDENTIAL CHECK: Paste your Google AI Studio key here
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")  
# Initialize the official Google GenAI client architecture
ai_client = genai.Client(api_key=GEMINI_API_KEY)

def load_client_config():
    """Reads the configuration blueprint dynamically from disk"""
    with open("config.json", "r") as file:
        return json.load(file)

@app.route("/")
def index():
    # Pass the config data straight into the HTML layer when it loads
    config = load_client_config()
    return render_template("index.html", config=config)

@app.route("/api/chat", methods=["POST"])
def chat_gateway():
    data = request.json
    user_message = data.get("message")
    
    # 1. Pull the fresh client rules from config.json
    config = load_client_config()
    
    try:
        # 2. Fire the payload to Google's real-time engine using the new SDK
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=user_message,
            config=types.GenerateContentConfig(
                system_instruction=config["system_instructions"],
                temperature=0.7
            )
        )
        
        # 3. Ship the text back to the frontend bubble
        return jsonify({"status": "SUCCESS", "reply": response.text})
        
    except Exception as e:
        return jsonify({"status": "ERROR", "reply": "Connection latency anomaly."}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)

@app.route("/widget.js")
def serve_widget():
    from flask import send_file
    return send_file("widget.js")