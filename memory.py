import json
import os
import re
from datetime import datetime

MEMORY_FILE = "data/feedback_memory.json"


# -----------------------------------
# Create memory file if it doesn't exist
# -----------------------------------
def initialize_memory():
    if not os.path.exists(MEMORY_FILE):
        with open(MEMORY_FILE, "w") as file:
            json.dump([], file)


# -----------------------------------
# Load all feedback memory
# -----------------------------------
def load_memory():
    initialize_memory()

    with open(MEMORY_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


# -----------------------------------
# Save memory back to JSON
# -----------------------------------
def save_memory(memory):
    with open(MEMORY_FILE, "w", encoding="utf-8") as file:
        json.dump(
            memory,
            file,
            indent=4,
            ensure_ascii=False
        )


# -----------------------------------
# Add new feedback record
# -----------------------------------
def add_feedback(
        company_name,
        research_summary,
        drafted_email,
        confidence_score,
        human_rating,
        correction_note=""
):
    memory = load_memory()

    record = {
        "id": len(memory) + 1,
        "timestamp": datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        ),
        "company_name": company_name,
        "research_summary": research_summary,
        "drafted_email": drafted_email,
        "confidence_score": confidence_score,
        "human_rating": human_rating,
        "correction_note": correction_note
    }

    memory.append(record)

    save_memory(memory)


# -----------------------------------
# Get best previous examples
# -----------------------------------
def get_good_examples(limit=3):

    memory = load_memory()

    good_examples = []

    for item in memory:
        if item["human_rating"] == "good":
            good_examples.append(item)

    good_examples = sorted(
        good_examples,
        key=lambda x: x["confidence_score"],
        reverse=True
    )

    return good_examples[:limit]


# -----------------------------------
# Get recent mistakes/corrections
# -----------------------------------
def get_recent_corrections(limit=5):

    memory = load_memory()

    corrections = []

    for item in reversed(memory):

        if (
            item["human_rating"] == "needs_improvement"
            and item["correction_note"].strip()
        ):
            corrections.append(
                item["correction_note"]
            )

        if len(corrections) >= limit:
            break

    return corrections


# -----------------------------------
# Find similar examples
# -----------------------------------
def get_relevant_examples(
        company_summary,
        limit=3
):
    """
    Simple keyword matching.
    No embeddings yet.
    """

    memory = load_memory()

    query_words = set(
        re.findall(
            r"\w+",
            company_summary.lower()
        )
    )

    scored_examples = []

    for item in memory:

        if item["human_rating"] != "good":
            continue

        summary = item["research_summary"]

        summary_words = set(
            re.findall(
                r"\w+",
                summary.lower()
            )
        )

        overlap = len(
            query_words.intersection(
                summary_words
            )
        )

        if overlap > 0:
            scored_examples.append(
                (overlap, item)
            )

    scored_examples.sort(
        key=lambda x: x[0],
        reverse=True
    )

    results = []

    for score, item in scored_examples[:limit]:
        results.append(item)

    return results