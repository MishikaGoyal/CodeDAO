import google.generativeai as palm
from crewai.agent import Agent
import os

class ProjectReviewAgent(Agent):
    def __init__(self):
        # Initialize Google Generative AI
        palm.configure(api_key=os.getenv("GOOGLE_GENAI_API_KEY"))

    # Duplication Check Feature
    def duplication_check(self, description, project_owner_email):
        """
        Use Google Generative AI to find similar projects and determine duplication.
        """
        query = f"Search for existing projects similar to this one: '{description}'. Return the match percentage and details."
        response = palm.chat(model="models/chat-bison-001", messages=[{"content": query}])

        # Simulate parsed output for demonstration purposes
        matches = response.last if response else []
        for project in matches:
            if project.get("match_percentage", 0) > 50:
                self.notify_project_owner(project_owner_email, project["url"])
                return {
                    "status": "flagged",
                    "message": "Project matches an existing one with >50% similarity. Notified owner to contribute.",
                    "match_details": project,
                }

        return {
            "status": "unique",
            "message": "No significant matches found. Project is unique.",
        }

    def notify_project_owner(self, project_owner_email, existing_project_url):
        """
        Notify the project owner to contribute to an existing project.
        """
        print(f"Notification sent to {project_owner_email}:")
        print(f"Your project is similar to an existing one. Please consider contributing here: {existing_project_url}")

    # Categorization Feature
    def categorize_project(self, description):
        """
        Use Google Generative AI to categorize the project.
        """
        candidate_labels = [
            "Web Development", "Mobile Development", "Blockchain",
            "AI and Machine Learning", "Data Science", "Game Development",
            "DevOps", "Cybersecurity", "IoT", "Healthcare", "Finance",
            "E-Commerce", "Entertainment", "Environment", "Education",
            "Transportation", "Agriculture", "Utilities", "Creative Arts",
            "Nonprofit", "Scientific Research"
        ]
        query = f"Categorize this project description into one of these categories: {candidate_labels}. Description: {description}"
        response = palm.chat(model="models/chat-bison-001", messages=[{"content": query}])

        # Return the top predicted category
        return response.last.get("category", "Uncategorized") if response else "Uncategorized"

    # Project Evaluation Feature
    def evaluate_project(self, repo_url):
        """
        Use Google Generative AI to evaluate a project repository.
        """
        query = f"Evaluate the project at {repo_url} based on the following criteria: " \
                f"README quality, creativity, innovation, functionality, and integration. Provide scores (1-10) for each."
        response = palm.chat(model="models/chat-bison-001", messages=[{"content": query}])

        # Simulate evaluation output
        evaluation = response.last if response else {}
        evaluation_results = {
            "readme": evaluation.get("readme_score", "N/A"),
            "creativity": evaluation.get("creativity_score", "N/A"),
            "innovation": evaluation.get("innovation_score", "N/A"),
            "functionality": evaluation.get("functionality_score", "N/A"),
            "integration": evaluation.get("integration_score", "N/A"),
        }

        # Final rating
        scores = [score for score in evaluation_results.values() if isinstance(score, (int, float))]
        evaluation_results["final_rating"] = sum(scores) / len(scores) if scores else "N/A"

        return evaluation_results

    # Unified Run Method
    def run(self, data):
        """
        Executes all functionalities:
        1. Duplication check.
        2. Categorization.
        3. Project evaluation.
        """
        description = data["description"]
        project_owner_email = data.get("project_owner_email")
        repo_url = data.get("repo_url")

        # Duplication Check
        duplication_results = self.duplication_check(description, project_owner_email)

        # Categorization
        category = self.categorize_project(description)

        # Evaluation
        evaluation_results = self.evaluate_project(repo_url) if repo_url else "Repository URL not provided."

        return {
            "duplication_results": duplication_results,
            "category": category,
            "evaluation_results": evaluation_results,
        }