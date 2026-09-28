import re
import os
import json
from typing import Dict, Any, List

# Check if Gemini API is available
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
HAS_GEMINI = False

if GEMINI_API_KEY:
    try:
        from google import genai
        gemini_client = genai.Client(api_key=GEMINI_API_KEY)
        HAS_GEMINI = True
    except Exception as e:
        print(f"Gemini client initialization notice: {e}")
        HAS_GEMINI = False


# Comprehensive Scam Heuristics Library tailored for Indian Investor Scenarios
SCAM_INDICATOR_RULES = [
    {
        "id": "GUARANTEED_RETURNS",
        "name": "Guaranteed or Risk-Free Return Claim",
        "category": "Regulatory Violation",
        "severity": "HIGH",
        "weight": 35,
        "patterns": [
            r'\bguaranteed\b', r'\b100%\s*return\b', r'\bfixed\s*return\b', r'\brisk\s*free\b',
            r'\bzero\s*risk\b', r'\bdouble\s*(your\s*)?money\b', r'\btriple\s*(your\s*)?\b',
            r'\bno\s*loss\b', r'\bsure\s*shot\b',
            r'உறுதியான வருமானம்', r'இடர் இல்லை', r'பணம் இரட்டிப்பு',
            r'पक्का रिटर्न', r'गारंटीड', r'बिना रिस्क', r'पैसे डबल',
            r'ఖచ్చితమైన రాబడి', r'రిస్క్ లేదు'
        ],
        "description": "SEBI strictly prohibits entities from guaranteeing returns in the securities market. Market investments are inherently subject to market fluctuations."
    },
    {
        "id": "UNREALISTIC_HIGH_YIELD",
        "name": "Abnormally High Return Promise",
        "category": "Ponzi Indicator",
        "severity": "HIGH",
        "weight": 30,
        "patterns": [
            r'\b\d{2,3}%\s*(monthly|daily|per month|per day|every month|a month)\b',
            r'\b(20|30|40|50|60|70|80|90|100)%\s*(return|profit|gain)\b',
            r'\b\d+%\s*daily\b',
            r'\bdouble in \d+ (days|weeks|months)\b',
            r'மாதம் \d+%', r'प्रतिदिन \d+%', r'महीने में \d+%'
        ],
        "description": "Legitimate equity instruments typically yield 12-15% annually. Promising double-digit monthly or daily returns is a hallmark of Ponzi schemes."
    },
    {
        "id": "ARTIFICIAL_URGENCY",
        "name": "High-Pressure Urgency / FOMO",
        "category": "Social Engineering",
        "severity": "MEDIUM",
        "weight": 15,
        "patterns": [
            r'\b(only|last)\s*\d+\s*(slots?|spots?|seats?)\b',
            r'\blimited\s*(slots?|spots?|seats?|time|period)\b',
            r'\b(today only|hurry up|valid for \d+ hours?|last chance|expires soon|act fast|act immediately)\b',
            r'\b(pay today|register today|join today)\b',
            r'இன்றே', r'கடைசி வாய்ப்பு', r'சீக்கிரம்',
            r'केवल \d+ स्लॉट', r'जल्दी करें', r'आज ही',
            r'చివరి అవకాశం', r'త్వరపడండి'
        ],
        "description": "Scammers induce psychological panic to force users into making hasty financial decisions without performing due diligence."
    },
    {
        "id": "ADVANCE_PAYMENT_REQUEST",
        "name": "Upfront Payment or Transfer Request",
        "category": "Advance Fee Fraud",
        "severity": "HIGH",
        "weight": 25,
        "patterns": [
            r'\b(pay|transfer|send|deposit)\s*(₹|rs\.?|inr)?\s*[\d,]+\b',
            r'\btransfer to upi\b', r'\bsend money to\b', r'\bprocessing fee\b',
            r'\bregistration (fee|charges?)\b', r'\bunlock fee\b', r'\bgst fee before withdrawal\b',
            r'பணம் செலுத்துங்கள்', r'பணம் அனுப்புங்கள்',
            r'पैसे ट्रांसफर', r'शुल्क जमा करें', r'డబ్బు చెల్లించండి'
        ],
        "description": "Legitimate investment platforms deduct statutory charges from your demat balance, never asking for upfront transfers to private UPI handles."
    },
    {
        "id": "DIGITAL_ARREST_POLICE",
        "name": "Digital Arrest / Fake Law Enforcement",
        "category": "Extortion Scam",
        "severity": "HIGH",
        "weight": 40,
        "patterns": [
            r'\bdigital arrest\b', r'\bcbi (officer|team|notice)\b', r'\bcyber crime (mumbai|delhi|cell)\b',
            r'\bparcel (seized|intercepted)\b', r'\bdrugs in parcel\b', r'\barrest warrant\b',
            r'\bsupreme court order\b', r'\bstay on video call\b', r'\bskype call\b',
            r'டிஜிட்டல் கைது', r'போலீஸ் வாரண்ட்', r'डिजिटल अरेस्ट', r'पार्सल जब्त', r'सीबीआई अधिकारी'
        ],
        "description": "Indian Police and agencies NEVER conduct arrests over Skype, WhatsApp, or video calls. 'Digital Arrest' is a total cyber extortion fabrication."
    },
    {
        "id": "FAKE_IPO_ALLOTMENT",
        "name": "Fake IPO / Institutional Quota Scheme",
        "category": "Securities Fraud",
        "severity": "HIGH",
        "weight": 35,
        "patterns": [
            r'\binstitutional (quota|allotment)\b', r'\bguaranteed ipo\b', r'\bpre-ipo (secret|allocation|quota)\b',
            r'\bhni quota without demat\b', r'\ballotment guaranteed\b', r'\bgrey market premium 100%\b',
            r'ஐபிஓ உறுதி', r'गारंटीड आईपीओ', r'ప్రత్యేక ఐపీఓ కోటా'
        ],
        "description": "SEBI IPO allotments are done transparently through ASBA and stock exchange lottery systems. Guaranteed institutional quotas for retail users are fraudulent."
    },
    {
        "id": "TASK_SCAM_WFH",
        "name": "Part-time Task / YouTube Like Scam",
        "category": "Employment / Task Fraud",
        "severity": "HIGH",
        "weight": 30,
        "patterns": [
            r'\blike youtube videos?\b', r'\bearn (₹|rs\.?)?\s*[\d,]+\s*(daily|per day)\b',
            r'\bpart time telegram task\b', r'\brate hotels? on google maps?\b',
            r'\breview products? earn\b', r'\bpart time job without investment\b',
            r'வீட்டிலிருந்தே வேலை', r'घर बैठे कमाई', r'యూట్యూబ్ లైక్ చేసి సంపాదించండి'
        ],
        "description": "Victims are initially paid ₹100-200 for simple tasks to build trust, then lured into depositing lakhs into fake 'VIP crypto merchant accounts'."
    },
    {
        "id": "APK_SIDELOAD",
        "name": "Suspicious APK / Malicious App Link",
        "category": "Malware / Phishing",
        "severity": "HIGH",
        "weight": 30,
        "patterns": [
            r'\.apk\b', r'\bdownload our app from link\b', r'\binstall outside play store\b',
            r'\byono update link\b', r'\bpan kyc update link\b', r'\bbit\.ly/', r'\btinyurl\.com/'
        ],
        "description": "Direct APK installations or unverified short links frequently inject banking trojans and screen-monitoring spyware."
    },
    {
        "id": "REGULATOR_IMPERSONATION",
        "name": "Unverified Regulatory Claim",
        "category": "Impersonation",
        "severity": "MEDIUM",
        "weight": 20,
        "patterns": [
            r'\brbi approved (trader|platform)\b', r'\bsebi authorized (group|telegram|bot)\b',
            r'\bgovernment backed trading bot\b',
            r'மத்திய அரசு அங்கீகாரம்', r'आरबीआई प्रमाणित', r'సెబీ గుర్తింపు పొందిన ట్రేడర్'
        ],
        "description": "SEBI and RBI do NOT endorse individual WhatsApp/Telegram groups or trading bots. Scammers forge logos and certificates."
    },
    {
        "id": "PYRAMID_REFERRAL",
        "name": "Multi-Level Referral / Downline Scheme",
        "category": "Pyramid Scheme",
        "severity": "MEDIUM",
        "weight": 20,
        "patterns": [
            r'\brefer \d+ friends\b', r'\bbinary matching\b', r'\bdownline bonus\b',
            r'\bteam earnings\b', r'\bdirect sponsor bonus\b',
            r'நண்பர்களை சேர்க்கவும்', r'दोस्त जोड़ें कमीशन', r'ఫ్రెండ్స్ ని జాయిన్ చేయండి'
        ],
        "description": "Basing income on recruiting new participants rather than genuine underlying financial assets violates the Prize Chits and Money Circulation Act."
    }
]

# Trusted Official Financial Knowledge Bases for Source Verification
OFFICIAL_SOURCES = [
    {
        "source_name": "Securities and Exchange Board of India (SEBI)",
        "source_url": "https://www.sebi.gov.in",
        "verification_status": "OFFICIAL_REGULATOR"
    },
    {
        "source_name": "Reserve Bank of India (RBI Kehta Hai)",
        "source_url": "https://rbikehtahai.rbi.org.in",
        "verification_status": "OFFICIAL_REGULATOR"
    },
    {
        "source_name": "National Cyber Crime Reporting Portal (1930)",
        "source_url": "https://cybercrime.gov.in",
        "verification_status": "OFFICIAL_REGULATOR"
    }
]


def generate_regional_explanation(risk_level: str, matched_indicators: List[Dict[str, Any]], language: str) -> str:
    """
    Generates culturally grounded, easy-to-understand explanations across English, Tamil, Hindi, and Telugu.
    """
    num_flags = len(matched_indicators)
    if risk_level == "HIGH":
        explanations = {
            "English": (
                f"🚨 DANGER WARNING: This message displays {num_flags} critical warning signs of a financial scam. "
                "In India, no legitimate entity can guarantee stock market returns or demand immediate UPI transfers to personal accounts. "
                "Transferring funds to this offer carries an extremely high likelihood of complete capital loss."
            ),
            "Tamil": (
                f"🚨 தீவிர எச்சரிக்கை: இந்தச் செய்தியில் {num_flags} முக்கியமான நிதி மோசடி அறிகுறிகள் கண்டறியப்பட்டுள்ளன. "
                "இந்தியாவில் எந்தவொரு சட்டபூர்வமான நிதி நிறுவனமும் பங்குச் சந்தையில் 100% உறுதியான லாபத்தை உத்தரவாதம் செய்ய முடியாது. "
                "உடனடி யுபிஐ (UPI) மூலம் பணம் அனுப்புவது உங்கள் பணத்தை முழுமையாக இழக்கும் அபாயத்தை ஏற்படுத்தும்."
            ),
            "Hindi": (
                f"🚨 उच्च जोखिम चेतावनी: इस संदेश में {num_flags} वित्तीय धोखाधड़ी के गंभीर लक्षण पाए गए हैं। "
                "भारत में सेबी (SEBI) के नियमों के अनुसार कोई भी शेयर बाजार में गारंटीड रिटर्न नहीं दे सकता। "
                "किसी भी व्यक्तिगत UPI आईडी या खाते में तुरंत पैसे ट्रांसफर करने से आपका सारा पैसा डूब सकता है।"
            ),
            "Telugu": (
                f"🚨 తీవ్రమైన హెచ్చరిక: ఈ మెసేజ్‌లో {num_flags} ఆర్థిక మోసపూరిత సంకేతాలు గుర్తించబడ్డాయి. "
                "భారతదేశంలో ఏ చట్టబద్ధమైన సంస్థ కూడా స్టాక్ మార్కెట్లో గ్యారెంటీ రాబడిని అందించలేదు. "
                "అపరిచిత వ్యక్తులకు లేదా ప్రైవేట్ ఖాతాలకు యూపీఐ (UPI) ద్వారా డబ్బు పంపడం చాలా ప్రమాదకరం."
            )
        }
    elif risk_level == "MEDIUM":
        explanations = {
            "English": (
                "⚠️ CAUTION ADVISED: This communication contains suspicious elements like artificial urgency or unverified claims. "
                "While it may not be an overt extortion attempt, you should independently verify the credentials of the sender before engaging."
            ),
            "Tamil": (
                "⚠️ கவனம் தேவை: இந்தச் செய்தியில் அவசரப்படுத்தும் மொழியோ அல்லது சரிபார்க்கப்படாத உரிமைகளோ உள்ளன. "
                "அனுப்புநரின் நம்பகத்தன்மையை செபி (SEBI) இணையதளத்தில் உறுதிப்படுத்தாமல் எந்த முடிவும் எடுக்காதீர்கள்."
            ),
            "Hindi": (
                "⚠️ सावधानी आवश्यक: इस संदेश में अस्वाभाविक जल्दबाजी या अपुष्ट दावे दिखाई दे रहे हैं। "
                "आगे कोई भी कदम उठाने से पहले संबंधित संस्था के सेबी या बैंक रजिस्ट्रेशन की स्वतंत्र जांच अवश्य करें।"
            ),
            "Telugu": (
                "⚠️ జాగ్రత్త అవసరం: ఈ సందేశంలో అత్యవసర ఒత్తిడి లేదా ధృవీకరించబడని క్లెయిమ్‌లు ఉన్నాయి. "
                "ముందుకు వెళ్ళే ముందు సదరు సంస్థ వివరాలను అధికారికంగా తనిఖీ చేయండి."
            )
        }
    else:
        explanations = {
            "English": (
                "✅ LOW RISK / INFORMATIONAL: No severe predatory scam indicators detected in this content. "
                "However, remember to never share your Banking OTP, ATM PIN, or passwords with anyone under any circumstances."
            ),
            "Tamil": (
                "✅ குறைவான அபாயம்: இதில் வெளிப்படையான மோசடி அறிகுறிகள் ஏதும் இல்லை. "
                "ஆயினும், உங்கள் வங்கி OTP அல்லது கடவுச்சொற்களை யாரிடமும் எக்காரணம் கொண்டும் பகிர வேண்டாம்."
            ),
            "Hindi": (
                "✅ कम जोखिम: इस संदेश में सीधे तौर पर धोखाधड़ी के बड़े संकेत नहीं मिले हैं। "
                "फिर भी हमेशा सतर्क रहें और किसी के साथ भी अपना बैंक ओटीपी (OTP) या पासवर्ड साझा न करें।"
            ),
            "Telugu": (
                "✅ తక్కువ రిస్క్: ఈ సమాచారంలో స్పష్టమైన మోసపూరిత సంకేతాలు కనిపించలేదు. "
                "అయినప్పటికీ మీ బ్యాంకింగ్ ఓటీపీ (OTP) లేదా పాస్‌వర్డ్‌లను ఎవరితోనూ పంచుకోవద్దు."
            )
        }

    return explanations.get(language, explanations["English"])


def analyze_with_rules(text: str, language: str) -> Dict[str, Any]:
    """
    Core deterministic heuristic engine. Runs in < 15ms with 100% offline reliability.
    """
    matched_indicators = []
    total_score = 0

    for rule in SCAM_INDICATOR_RULES:
        is_matched = False
        for pat in rule["patterns"]:
            if re.search(pat, text, re.IGNORECASE):
                is_matched = True
                break
        
        if is_matched:
            matched_indicators.append({
                "name": rule["name"],
                "severity": rule["severity"],
                "category": rule["category"],
                "description": rule["description"],
                "weight": rule["weight"]
            })
            total_score += rule["weight"]

    # Cap score at 100
    final_score = min(total_score, 100)

    if final_score >= 50:
        risk_level = "HIGH"
    elif final_score >= 20:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    explanation = generate_regional_explanation(risk_level, matched_indicators, language)

    # Contextual safety actions
    actions = [
        "Never transfer money through private UPI handles or personal bank accounts for investment purposes.",
        "Verify if the advisor or platform is registered on SEBI (sebi.gov.in) under Registered Investment Advisors (RIA) or Intermediaries.",
        "Remember that neither Police nor Government officials ever conduct 'Digital Arrest' or court proceedings via WhatsApp/Skype."
    ]

    if risk_level == "HIGH":
        actions.insert(0, "🚨 STOP: Do NOT send money, do not click provided links, and do NOT share OTPs.")
        actions.append("If money was already deducted, dial 1930 immediately or lodge a complaint on cybercrime.gov.in within the golden hour.")

    summary = f"Identified {len(matched_indicators)} risk factor(s) with an overall risk score of {final_score}/100."

    return {
        "risk_level": risk_level,
        "risk_score": final_score,
        "summary": summary,
        "indicators": matched_indicators,
        "explanation": explanation,
        "actions": actions,
        "sources": OFFICIAL_SOURCES,
        "language": language,
        "disclaimer": "Statutory Disclaimer: NambikkAI is an AI-powered financial safety and fraud detection assistant. It is strictly educational and does not constitute personalized financial, legal, or investment advice."
    }


def analyze_with_gemini(text: str, language: str) -> Dict[str, Any]:
    """
    Optional LLM deep semantic enhancement powered by Google Gemini 3.8 Flash.
    """
    if not HAS_GEMINI:
        return None

    try:
        prompt = f"""
You are NambikkAI, an expert AI Financial Safety & Fraud Detection Assistant for Indian retail investors (part of the Sangyan initiative).
Analyze the following financial message, advertisement, or query:

"{text}"

Analyze for:
1. Risk Level: LOW, MEDIUM, or HIGH
2. Risk Score: 0 to 100
3. Specific Red Flags (e.g., Guaranteed Returns, Fake IPO, Digital Arrest, Urgency, Advance Fee)
4. Empathetic and clear explanation in {language}
5. Practical, safe next steps for an Indian citizen
6. SEBI / RBI regulatory context

Respond ONLY in valid JSON with this exact schema:
{{
  "risk_level": "LOW|MEDIUM|HIGH",
  "risk_score": 85,
  "summary": "Short 1-line overview",
  "indicators": [
    {{"name": "...", "severity": "HIGH|MEDIUM|LOW", "category": "...", "description": "...", "weight": 25}}
  ],
  "explanation": "Explanation in {language}",
  "actions": ["Action 1", "Action 2"],
  "sources": [
    {{"source_name": "SEBI SCORES", "source_url": "https://scores.sebi.gov.in", "verification_status": "OFFICIAL_REGULATOR"}}
  ],
  "disclaimer": "Statutory Disclaimer: Educational safety assessment only."
}}
"""
        response = gemini_client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json"
            }
        )
        if response and response.text:
            data = json.loads(response.text)
            data["language"] = language
            return data
    except Exception as e:
        print(f"Gemini API call failed, gracefully falling back to heuristic engine: {e}")
        return None


def run_scam_analysis(text: str, language: str = "English") -> Dict[str, Any]:
    """
    Master analyzer combining rule-based heuristics with Gemini 3.8 Flash LLM fallback.
    """
    # Try Gemini if key is configured
    if HAS_GEMINI:
        gemini_result = analyze_with_gemini(text, language)
        if gemini_result:
            return gemini_result

    # Default to robust rule-based engine
    return analyze_with_rules(text, language)
