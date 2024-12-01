from agents import ProjectReviewAgent

agent=ProjectReviewAgent()

def perform_duplication_check(agent, description, project_owner_email):
    """
    Perform duplication check using the agent.
    """
    return agent.duplication_check(description, project_owner_email)

def perform_categorization(agent, description):
    """
    Perform categorization using the agent.
    """
    return agent.categorize_project(description)

def perform_evaluation(agent, repo_url):
    """
    Perform project evaluation using the agent.
    """
    return agent.evaluate_project(repo_url)
