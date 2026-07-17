from llm_client import ask_llm
from memory import (
    get_relevant_examples,
    get_recent_corrections
)


def generate_email(summary_json):
    """
    Generate a personalized outreach email using
    feedback memory and OpenRouter.
    """

    examples = get_relevant_examples(summary_json)
    corrections = get_recent_corrections()

    examples_text = ""

    if examples:
        examples_text += "\nGOOD EXAMPLES:\n"

        for ex in examples:
            examples_text += f"""
Company: {ex['company_name']}
Email:
{ex['drafted_email']}
"""

    corrections_text = ""

    if corrections:
        corrections_text += "\nPAST MISTAKES TO AVOID:\n"

        for note in corrections:
            corrections_text += f"- {note}\n"

    prompt = f"""
You are an SDR (Sales Development Representative).

Using this company research:

{summary_json}

{examples_text}

{corrections_text}

Write a personalized outreach email.

Rules:
- Keep it under 150 words.
- Mention one recent company achievement.
- Mention one personalization hook.
- Sound professional and friendly.
- End with a clear call to action.
- Do NOT invent facts.
- Use only information provided.

Return ONLY the email.
"""

    return ask_llm(prompt)


# Test directly
if __name__ == "__main__":

    summary = input("Enter summary:\n")

    email = generate_email(summary)

    print("\nEMAIL\n")
    print(email)