import os
import pandas as pd
from dotenv import load_dotenv
from tavily import TavilyClient

# Load environment variables
load_dotenv()

# Get API key
tavily_api_key = os.getenv("TAVILY_API_KEY")

if not tavily_api_key:
    raise ValueError("TAVILY_API_KEY not found in .env")

# Create Tavily client
client = TavilyClient(api_key=tavily_api_key)


# ---------------------------------------------------
# Remove duplicate URLs
# ---------------------------------------------------
def remove_duplicates(results):

    unique_results = []
    seen_urls = set()

    for item in results:

        url = item.get("url")

        if url and url not in seen_urls:
            unique_results.append(item)
            seen_urls.add(url)

    return unique_results


# ---------------------------------------------------
# Save failed searches
# ---------------------------------------------------
def log_failed_search(company_name, reason):

    file_path = "data/failed_searches.csv"

    data = {
        "company_name": [company_name],
        "reason": [reason]
    }

    df = pd.DataFrame(data)

    if os.path.exists(file_path):
        df.to_csv(
            file_path,
            mode="a",
            header=False,
            index=False
        )
    else:
        df.to_csv(
            file_path,
            index=False
        )


# ---------------------------------------------------
# Research Company
# ---------------------------------------------------
def research_company(company_name):

    # India-aware search queries
    queries = [
        f"{company_name}",
        f"{company_name} India",
        f"{company_name} Pvt Ltd",
        f"{company_name} LLP",
        f"{company_name} startup India",
        f"{company_name} official website",
        f"{company_name} company overview",
        f"{company_name} products and services",
        f"{company_name} latest news"
    ]

    all_results = []

    for query in queries:

        try:
            response = client.search(
                query=query,
                search_depth="advanced",
                max_results=3
            )

            if response.get("results"):
                all_results.extend(
                    response["results"]
                )

        except Exception as e:
            print(
                f"Search Error for '{query}': {e}"
            )

    # Remove duplicate URLs
    all_results = remove_duplicates(
        all_results
    )

    # ---------------------------------------
    # Confidence score
    # ---------------------------------------
    if len(all_results) == 0:
        confidence = 1

    elif len(all_results) < 3:
        confidence = 3

    elif len(all_results) < 6:
        confidence = 6

    else:
        confidence = min(
            len(all_results),
            10
        )

    # ---------------------------------------
    # Log sparse searches
    # ---------------------------------------
    if len(all_results) == 0:

        log_failed_search(
            company_name,
            "No public information found"
        )

    elif len(all_results) < 3:

        log_failed_search(
            company_name,
            "Very little public information found"
        )

    # Return data
    return {
        "company_name": company_name,
        "confidence": confidence,
        "results": all_results
    }


# ---------------------------------------------------
# Test Mode
# ---------------------------------------------------
if __name__ == "__main__":

    company = input(
        "Enter company name: "
    ).strip()

    if not company:
        print(
            "Please enter a company name."
        )

    else:

        data = research_company(
            company
        )

        print("\n" + "=" * 100)
        print(
            f"COMPANY : {data['company_name']}"
        )
        print(
            f"CONFIDENCE : {data['confidence']}/10"
        )
        print("=" * 100)

        if not data["results"]:
            print(
                "\nNo public information found."
            )

        for i, item in enumerate(
                data["results"],
                start=1
        ):

            print("\n" + "-" * 100)
            print(f"Result #{i}")
            print(
                "TITLE :",
                item.get("title")
            )
            print(
                "URL   :",
                item.get("url")
            )
            print("CONTENT:")
            print(
                item.get("content")
            )