import re
from typing import Tuple, Dict, Any, List

# Regex patterns for Indian PII detection
PHONE_REGEX = re.compile(r'(\+91[\-\s]?)?[6-9]\d{9}\b')
PAN_REGEX = re.compile(r'\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b', re.IGNORECASE)
AADHAAR_REGEX = re.compile(r'\b\d{4}\s\d{4}\s\d{4}\b|\b\d{12}\b')
UPI_REGEX = re.compile(r'[\w\.\-]+@(oksbi|okhdfcbank|okicici|okaxis|paytm|ybl|apl|upi|postbank|ibl)', re.IGNORECASE)
CARD_REGEX = re.compile(r'\b(?:\d{4}[-\s]?){3}\d{4}\b')
EMAIL_REGEX = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b')

# Patterns indicating user asking for personalized financial advice
ADVICE_SEEKING_PATTERNS = [
    r'\bshould i (buy|sell|invest in|hold)\b',
    r'\bwhich (stock|crypto|coin|share|mutual fund|ipo) (to|should i) (buy|invest)\b',
    r'\bgive me (a )?(stock tip|trading tip|intraday call|recommendation)\b',
    r'\bwhere (should i|can i) invest\b',
    r'\bwill (reliance|tata|nifty|banknifty|btc|bitcoin) go up\b',
    r'\btarget price for\b',
    r'\bcan i invest (₹|rs\.?|inr)?\s?\d+',
    r'\bவாங்குவது நல்லதா\b', # Tamil "is it good to buy"
    r'\bஎன்ன பங்கு வாங்கலாம்\b', # Tamil "which share to buy"
    r'\bक्या मैं (खरीदूं|निवेश करूं)\b', # Hindi "should I buy/invest"
    r'\bकौन सा शेयर (खरीदें|अच्छा है)\b', # Hindi "which share to buy"
    r'\bఏ షేర్ కొనాలి\b' # Telugu "which share to buy"
]

def mask_pii(text: str) -> Tuple[str, List[str]]:
    """
    Masks sensitive personal identifiable information (PII) to protect user privacy.
    Returns the sanitized text and a list of redacted types.
    """
    redacted_items = []
    sanitized = text

    if PHONE_REGEX.search(sanitized):
        sanitized = PHONE_REGEX.sub("[REDACTED_PHONE_NUMBER]", sanitized)
        redacted_items.append("Phone Number")

    if PAN_REGEX.search(sanitized):
        sanitized = PAN_REGEX.sub("[REDACTED_PAN_CARD]", sanitized)
        redacted_items.append("PAN Number")

    if AADHAAR_REGEX.search(sanitized):
        sanitized = AADHAAR_REGEX.sub("[REDACTED_AADHAAR]", sanitized)
        redacted_items.append("Aadhaar Number")

    if UPI_REGEX.search(sanitized):
        sanitized = UPI_REGEX.sub("[REDACTED_UPI_ID]", sanitized)
        redacted_items.append("UPI ID")

    if CARD_REGEX.search(sanitized):
        sanitized = CARD_REGEX.sub("[REDACTED_CARD_NUMBER]", sanitized)
        redacted_items.append("Debit/Credit Card")

    if EMAIL_REGEX.search(sanitized):
        sanitized = EMAIL_REGEX.sub("[REDACTED_EMAIL]", sanitized)
        redacted_items.append("Email Address")

    return sanitized, redacted_items


def check_financial_advice_guardrail(text: str, language: str = "English") -> Tuple[bool, Dict[str, Any]]:
    """
    Detects if the query is seeking personalized investment advice.
    Enforces SEBI compliance guardrails to prevent AI from offering unauthorized financial recommendations.
    """
    lower_text = text.lower()
    for pattern in ADVICE_SEEKING_PATTERNS:
        if re.search(pattern, lower_text):
            # Guardrail triggered
            explanations = {
                "English": (
                    "Guardrail Alert: NambikkAI is strictly programmed NOT to provide personalized stock tips, "
                    "buy/sell calls, or asset recommendations in adherence to SEBI (Investment Advisers) Regulations, 2013. "
                    "Our mission is to protect you from scams and enhance your financial literacy, not dispense trading advice."
                ),
                "Tamil": (
                    "பாதுகாப்பு எச்சரிக்கை: செபி (SEBI) வழிகாட்டுதல்களின்படி தனிப்பயனாக்கப்பட்ட பங்குப் பரிந்துரைகளையோ "
                    "அல்லது வாங்குதல்/விற்பனை ஆலோசனைகளையோ வழங்க NambikkAI அனுமதிக்கப்படவில்லை. "
                    "நாங்கள் உங்களை மோசடிகளிலிருந்து பாதுகாத்து நிதி அறிவை மட்டுமே வழங்குகிறோம்."
                ),
                "Hindi": (
                    "सुरक्षा गार्डरेल अलर्ट: सेबी (SEBI) नियमों के तहत NambikkAI किसी भी प्रकार की व्यक्तिगत शेयर या "
                    "निवेश सलाह, खरीद/बिक्री कॉल देने के लिए अधिकृत नहीं है। "
                    "हमारा उद्देश्य आपको धोखाधड़ी से बचाना और वित्तीय साक्षरता प्रदान करना है।"
                ),
                "Telugu": (
                    "రక్షణ హెచ్చరిక: సెబీ (SEBI) నిబంధనల ప్రకారం NambikkAI వ్యక్తిగత స్టాక్ లేదా పెట్టుబడి సలహాలను "
                    "ఇవ్వదు. మోసాల నుండి మిమ్మల్ని రక్షించడం మరియు అవగాహన కల్పించడమే మా ముఖ్య లక్ష్యం."
                )
            }

            actions = [
                "Consult only SEBI-registered Investment Advisors (RIA) or Research Analysts (RA)",
                "Verify registration on the official SEBI portal (sebi.gov.in)",
                "Never trade based on unverified tips received on WhatsApp or Telegram channels",
                "Learn fundamental and technical analysis through official investor education portals like SEBI Saa₹thi"
            ]

            return True, {
                "risk_level": "GUARDRAIL_INTERCEPTED",
                "risk_score": 0,
                "summary": "Personal Financial Advice Request Intercepted (SEBI Compliance)",
                "explanation": explanations.get(language, explanations["English"]),
                "actions": actions,
                "disclaimer": "Statutory Notice: NambikkAI is an educational financial safety filter. We never provide buy/sell recommendations.",
                "is_advice_intercepted": True
            }

    return False, {}
