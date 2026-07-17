import json

from research import research_company
from summary import summarize_company
from draft_email import generate_email
from verify import verify_email


def main():

    print("=" * 80)
    print("AI RESEARCH & OUTREACH AGENT")
    print("=" * 80)

    company = input("\nEnter company name: ").strip()

    if not company:
        print("Please enter a company name.")
        return

    print("\nResearching company...")

    research_data = research_company(company)

    if not research_data["results"]:
        print("No information found.")
        return

    # Convert research results into text
    research_text = ""

    for item in research_data["results"]:
        research_text += (
            f"\nTitle: {item.get('title', '')}"
            f"\nContent: {item.get('content', '')}\n"
        )

    # Generate summary
    print("\nGenerating AI summary...")

    summary = summarize_company(
        company,
        research_text
    )

    print("\n" + "=" * 80)
    print("AI SUMMARY")
    print("=" * 80)
    print(summary)

    # Generate email
    print("\nGenerating outreach email...")

    email = generate_email(summary)

    print("\n" + "=" * 80)
    print("OUTREACH EMAIL")
    print("=" * 80)
    print(email)

    # Verify email
    print("\nVerifying email...")

    verification = verify_email(
        research_text,
        email
    )

    verification_data = json.loads(verification)

    print("\n" + "=" * 80)
    print("VERIFICATION")
    print("=" * 80)

    print(
        f"Confidence Score: "
        f"{verification_data['confidence_score']}/10"
    )

    print(
        f"Human Review Required: "
        f"{verification_data['human_review_required']}"
    )

    print(
        f"\nReason:\n"
        f"{verification_data['reason']}"
    )


if __name__ == "__main__":
    main()