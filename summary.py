import json
from llm_client import ask_llm


def summarize_company(company_name, research_results):
    """
    Generate a structured company summary.
    Returns a JSON string.
    """

    prompt = f"""
You are a business research analyst.

Company Name:
{company_name}

Research:
{research_results}

Return ONLY valid JSON in this format:

{{
    "company_name": "",
    "description": "",
    "recent_news": "",
    "products_services": "",
    "personalization_hook": "",
    "likely_pain_point": ""
}}

Rules:
- Do not invent facts.
- If information is unavailable, write "Not enough public information available".
- Keep responses concise and factual.
"""

    try:
        result = ask_llm(prompt)

        if not result:
            return json.dumps(
                {
                    "company_name": company_name,
                    "description": "No summary generated.",
                    "recent_news": "",
                    "products_services": "",
                    "personalization_hook": "",
                    "likely_pain_point": ""
                }
            )

        result = (
            result
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        # Validate JSON
        try:
            json.loads(result)
            return result

        except json.JSONDecodeError:
            return json.dumps(
                {
                    "company_name": company_name,
                    "description": result,
                    "recent_news": "",
                    "products_services": "",
                    "personalization_hook": "",
                    "likely_pain_point": ""
                }
            )

    except Exception as e:
        return json.dumps(
            {
                "company_name": company_name,
                "description": f"LLM error: {str(e)}",
                "recent_news": "",
                "products_services": "",
                "personalization_hook": "",
                "likely_pain_point": ""
            }
        )


# Test the file directly
if __name__ == "__main__":

    company = input("Enter company name: ")

    research = input("Enter research text: ")

    result = summarize_company(
        company,
        research
    )

    print("\nAI SUMMARY\n")
    print(result)