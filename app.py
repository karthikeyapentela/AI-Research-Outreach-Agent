import streamlit as st
import json
from google.api_core.exceptions import ResourceExhausted

from research import research_company
from summary import summarize_company
from draft_email import generate_email
from verify import verify_email

st.set_page_config(
    page_title="AI Research & Outreach Agent",
    page_icon="🚀",
    layout="wide"
)

# -----------------------------
# Session State
# -----------------------------
if "result" not in st.session_state:
    st.session_state.result = None

# -----------------------------
# Cache Functions
# -----------------------------
@st.cache_data
def get_research(company):
    return research_company(company)


@st.cache_data
def get_summary(company, research_text):
    return summarize_company(company, research_text)


@st.cache_data
def get_email(summary):
    return generate_email(summary)


@st.cache_data
def get_verification(research_text, email):
    return verify_email(research_text, email)


# -----------------------------
# Premium CSS
# -----------------------------
st.markdown("""
<style>

.stApp {
    background-color: #050816;
    color: white;
}

.main-title {
    font-size: 45px;
    font-weight: bold;
    color: white;
}

.sub-title {
    color: #8ea2ff;
    font-size:18px;
}

.glass {
    background: rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:20px;
    padding:25px;
    backdrop-filter: blur(20px);
    margin-top:20px;
    box-shadow:
        0 0 20px rgba(0,150,255,0.15);
}

.success-card {
    background: rgba(0,255,100,0.08);
    padding:20px;
    border-radius:20px;
}

.warning-card {
    background: rgba(255,100,100,0.08);
    padding:20px;
    border-radius:20px;
}

</style>
""", unsafe_allow_html=True)

# -----------------------------
# Header
# -----------------------------
st.markdown(
    "<div class='main-title'>AI Research & Outreach Agent</div>",
    unsafe_allow_html=True
)

st.markdown(
    "<div class='sub-title'>Research companies, generate outreach emails and self-verify before sending.</div>",
    unsafe_allow_html=True
)

st.divider()

# -----------------------------
# Company Input
# -----------------------------
company = st.text_input(
    "Enter Company Name",
    placeholder="BatX Energies"
)

# -----------------------------
# Generate Button
# -----------------------------
if st.button("Generate Outreach"):

    if not company.strip():
        st.warning("Please enter a company name.")
        st.stop()

    try:
        with st.spinner("Researching company..."):

            research_data = get_research(company)

            if not research_data or not research_data.get("results"):
                st.error("No company information found.")
                st.stop()

            research_text = ""

            for item in research_data["results"]:
                research_text += (
                    f"\nTitle: {item['title']}"
                    f"\nContent: {item['content']}\n"
                )

        with st.spinner("Generating summary..."):
            summary = get_summary(
                company,
                research_text
            )

        with st.spinner("Generating email..."):
            email = get_email(summary)

        with st.spinner("Verifying email..."):
            verification = get_verification(
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

        st.session_state.result = {
            "summary": summary,
            "email": email,
            "verification": verification_json
        }

    except ResourceExhausted:
        st.error(
            "Gemini API quota exceeded. Please wait and try again later."
        )
        st.stop()

    except Exception as e:
        st.error(f"Error: {e}")
        st.stop()

# -----------------------------
# Display Results
# -----------------------------
if st.session_state.result:

    result = st.session_state.result

    summary = result["summary"]
    email = result["email"]
    verification_json = result["verification"]

    st.markdown(
        "<div class='glass'>",
        unsafe_allow_html=True
    )

    st.subheader("Research Summary")

    st.code(
        summary,
        language="json"
    )

    st.markdown(
        "</div>",
        unsafe_allow_html=True
    )

    st.markdown(
        "<div class='glass'>",
        unsafe_allow_html=True
    )

    st.subheader("Generated Outreach Email")

    st.write(email)

    st.markdown(
        "</div>",
        unsafe_allow_html=True
    )

    score = verification_json.get(
        "confidence_score"
    )

    review = verification_json.get(
        "human_review_required"
    )

    reason = verification_json.get(
        "reason"
    )

    if review:
        st.markdown(
            f"""
            <div class='warning-card'>
            <h3>Confidence Score: {score}/10</h3>
            <p>{reason}</p>
            <p>Human review required.</p>
            </div>
            """,
            unsafe_allow_html=True
        )
    else:
        st.markdown(
            f"""
            <div class='success-card'>
            <h3>Confidence Score: {score}/10</h3>
            <p>{reason}</p>
            <p>Email is ready.</p>
            </div>
            """,
            unsafe_allow_html=True
        )