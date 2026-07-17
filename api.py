from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from google.api_core.exceptions import ResourceExhausted

from research import research_company
from summary import summarize_company
from draft_email import generate_email
from verify import verify_email

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CompanyRequest(BaseModel):
    company_name: str


@app.get("/")
def root():
    return {"message": "AI Research & Outreach Agent API Running"}


@app.post("/research")
def research(request: CompanyRequest):
    try:
        company = request.company_name

        research_data = research_company(company)

        if not research_data or not research_data.get("results"):
            return {
                "success": False,
                "message": "No company information found."
            }

        research_text = ""

        for item in research_data["results"]:
            research_text += (
                f"\nTitle: {item['title']}"
                f"\nContent: {item['content']}\n"
            )

        summary = summarize_company(
            company,
            research_text
        )

        email = generate_email(summary)

        verification = verify_email(
            research_text,
            email
        )

        try:
            verification_json = json.loads(
                verification
            )
        except:
            verification_json = {
                "confidence_score": "?",
                "reason": verification,
                "human_review_required": True
            }

        return {
            "success": True,
            "summary": summary,
            "email": email,
            "verification": verification_json
        }

    except ResourceExhausted:
        return {
            "success": False,
            "message": "Gemini API quota exceeded."
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }