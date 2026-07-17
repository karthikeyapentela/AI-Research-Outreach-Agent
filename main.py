from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

from research import research_company
from summary import summarize_company
from draft_email import generate_email
from verify import verify_email

app = FastAPI(
    title="AI Research & Outreach Agent API",
    version="1.0.0"
)

# ====================================
# CORS
# ====================================

frontend_origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000"
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ====================================
# Request Model
# ====================================

class CompanyRequest(BaseModel):
    company_name: str


# ====================================
# Health Endpoint
# ====================================

@app.get("/")
def home():
    return {
        "message": "AI Research Agent API Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "AI Research Agent"
    }


# ====================================
# Main Endpoint
# ====================================

@app.post("/research")
def generate_outreach(data: CompanyRequest):

    company = data.company_name.strip()

    if not company:
        raise HTTPException(
            status_code=400,
            detail="company_name is required"
        )

    # -------------------------
    # Research
    # -------------------------
    research_data = research_company(company)

    if (
        not research_data
        or not research_data.get("results")
    ):
        raise HTTPException(
            status_code=404,
            detail="No company information found"
        )

    research_text = ""

    for item in research_data["results"]:
        research_text += f"""
Title: {item.get('title')}

Content:
{item.get('content')}
"""

    # -------------------------
    # Summary
    # -------------------------
    summary = summarize_company(
        company,
        research_text
    )

    try:
        summary_json = json.loads(summary)
    except:
        summary_json = {
            "description": summary
        }

    # -------------------------
    # Email
    # -------------------------
    email = generate_email(summary)

    # -------------------------
    # Verification
    # -------------------------
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
            "confidence_score": 0,
            "reason": verification,
            "human_review_required": True
        }

    # -------------------------
    # Final Response
    # -------------------------
    return {
        "company_name": company,
        "research_count": len(
            research_data["results"]
        ),
        "summary": summary_json,
        "email": email,
        "verification": verification_json
    }