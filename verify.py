import json
from llm_client import ask_llm


def verify_email(research_text, email_text):
    """
    Verify whether the generated email
    is supported by the research data.
    """

    # Handle sparse or missing research
    if (
        not research_text
        or len(research_text.strip()) < 200
    ):
        return json.dumps(
            {
                "confidence_score": 2,
                "reason":
                    "Insufficient public information available.",
                "human_review_required": True
            },
            indent=4
        )

    prompt = f"""
You are an AI verifier.

Research Information:
{research_text}

Generated Email:
{email_text}

Check whether the email is factually grounded in the research.

Return ONLY valid JSON:

{{
    "confidence_score": 1,
    "reason": "",
    "human_review_required": true
}}

Rules:
1. Confidence score must be between 1 and 10.
2. If any claim is unsupported, reduce confidence.
3. If information is weak, reduce confidence.
4. If confidence < 7:
   human_review_required = true
5. Otherwise:
   human_review_required = false
6. Never guess or fabricate facts.
"""

    try:
        result = ask_llm(prompt)

        if not result:
            return json.dumps(
                {
                    "confidence_score": 5,
                    "reason":
                        "No response received from LLM.",
                    "human_review_required": True
                },
                indent=4
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
                    "confidence_score": 5,
                    "reason":
                        "LLM returned invalid JSON.",
                    "human_review_required": True
                },
                indent=4
            )

    except Exception as e:
        return json.dumps(
            {
                "confidence_score": 5,
                "reason":
                    f"LLM error: {str(e)}",
                "human_review_required": True
            },
            indent=4
        )


# Test Mode
if __name__ == "__main__":

    research = input(
        "Enter research text: "
    )

    email = input(
        "Enter email text: "
    )

    result = verify_email(
        research,
        email
    )

    print(result)