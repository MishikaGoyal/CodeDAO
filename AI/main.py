from flask import Flask, request, jsonify
from tasks import perform_duplication_check, perform_categorization, perform_evaluation
from agents import ProjectReviewAgent
import os
from dotenv import load_dotenv

# Initialize Flask app
app = Flask(__name__)

# Load environment variables
load_dotenv()

# Initialize the agent
agent = ProjectReviewAgent()

@app.route('/')
def home():
    return "Project Review Agent API is running."

@app.route('/duplication-check', methods=['POST'])
def duplication_check():
    """
    Endpoint to check if the project description is a duplicate.
    Expects JSON with 'description' and 'project_owner_email'.
    """
    data = request.json
    description = data.get('description')
    project_owner_email = data.get('project_owner_email')

    if not description or not project_owner_email:
        return jsonify({"error": "Missing description or project_owner_email"}), 400

    duplication_results = perform_duplication_check(agent, description, project_owner_email)
    return jsonify(duplication_results)

@app.route('/categorize', methods=['POST'])
def categorize():
    """
    Endpoint to categorize the project based on its description.
    Expects JSON with 'description'.
    """
    data = request.json
    description = data.get('description')

    if not description:
        return jsonify({"error": "Missing description"}), 400

    category = perform_categorization(agent, description)
    return jsonify({"category": category})

@app.route('/evaluate', methods=['POST'])
def evaluate():
    """
    Endpoint to evaluate the project repository.
    Expects JSON with 'repo_url'.
    """
    data = request.json
    repo_url = data.get('repo_url')

    if not repo_url:
        return jsonify({"error": "Missing repo_url"}), 400

    evaluation_results = perform_evaluation(agent, repo_url)
    return jsonify(evaluation_results)

if __name__ == '__main__':
    # Run Flask app
    app.run(debug=True)
