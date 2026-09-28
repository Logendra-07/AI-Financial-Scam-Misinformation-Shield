import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "nambikkai.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Create tables exactly following Sangyan Hackathon Architecture
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        language TEXT DEFAULT 'English',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS analyses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        input_type TEXT DEFAULT 'text',
        original_text TEXT NOT NULL,
        masked_text TEXT,
        language TEXT DEFAULT 'English',
        risk_level TEXT NOT NULL,
        risk_score INTEGER DEFAULT 0,
        summary TEXT,
        explanation TEXT NOT NULL,
        actions TEXT,
        disclaimer TEXT,
        is_advice_intercepted INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS risk_indicators (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        analysis_id INTEGER REFERENCES analyses(id),
        indicator TEXT NOT NULL,
        severity TEXT NOT NULL,
        category TEXT DEFAULT 'General',
        description TEXT,
        weight INTEGER DEFAULT 10
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        analysis_id INTEGER REFERENCES analyses(id),
        source_name TEXT NOT NULL,
        source_url TEXT,
        verification_status TEXT DEFAULT 'UNVERIFIED'
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS learn_modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE,
        category TEXT DEFAULT 'Scam Defense',
        read_time TEXT DEFAULT '3 min',
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        red_flags TEXT
    );
    """)

    conn.commit()

    # Seed if learn_modules is empty
    cursor.execute("SELECT COUNT(*) FROM learn_modules")
    count = cursor.fetchone()[0]
    if count == 0:
        seed_db(conn, cursor)

    conn.close()


def seed_db(conn, cursor):
    print("Seeding initial NambikkAI database records...")

    # Default User
    cursor.execute(
        "INSERT INTO users (name, email, language) VALUES (?, ?, ?)",
        ("Tamil Retail Investor", "investor@sangyan.in", "Tamil")
    )
    user_id = cursor.lastrowid

    # 5 Investor Education Modules
    modules = [
        (
            "The Truth About 'Guaranteed Returns' in Stock Markets",
            "guaranteed-returns-scam",
            "Regulatory Defense",
            "3 min",
            "Why no legal entity in India can promise fixed percentage returns on equities, and how to spot fraudulent claims.",
            """Under SEBI (Securities and Exchange Board of India) regulations, all equity investments are subject to market risks. No registered broker, mutual fund, or investment advisor is legally permitted to promise or guarantee fixed returns.

### The Mathematics of Fraud
Scammers often promise '30% per month' or 'doubling money in 21 days'. Consider this: If someone could genuinely generate 30% per month, an initial capital of ₹10,000 would turn into over ₹2.3 Crores in just 3 years! If they had such a formula, they would never need to solicit ₹5,000 deposits from stranger groups on WhatsApp.

### What Regulators Say
- SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/15 explicitly bans intermediaries from associating with any person offering guaranteed returns.
- Always check the SEBI website for registered entities.""",
            json.dumps([
                "Phrases like '100% risk free', 'guaranteed monthly profit', 'capital protection'",
                "High returns exceeding 20% annualized for non-debt products",
                "Requests for money transfers to private savings accounts or UPI handles"
            ])
        ),
        (
            "Fake Telegram VIP Trading Groups & Pump-and-Dump",
            "telegram-trading-scams",
            "Social Media Fraud",
            "4 min",
            "How scammers fabricate trading profit screenshots and trap retail investors in illiquid penny stocks.",
            """Telegram and WhatsApp have become the ground zero for organized investment fraud targeting Tier-2 and Tier-3 Indian cities.

### The Typical Playbook
1. **The Hook**: You are added without consent to a group named 'VIP Bull Traders' or 'HNI Institutional Calls'.
2. **Social Proof Illusion**: The group is filled with bots posting fake Zerodha/Groww P&L screenshots showing lakhs in daily profits.
3. **The Pump**: The admin announces a 'secret jackpot penny stock' and urges everyone to buy at market price.
4. **The Dump**: The scammers sell their own massive holdings to the unsuspecting buyers, crashing the stock price by 90% and leaving retail investors trapped with worthless shares.

### Key Defense Rule
Never buy stocks based on unsolicited messaging app tips. Genuine SEBI Registered Research Analysts (RA) will always provide their registration number and publish compliant research reports.""",
            json.dumps([
                "Unsolicited addition to Telegram/WhatsApp trading groups",
                "Admins claiming 'exclusive insider news' or 'operator tie-ups'",
                "Calls to buy little-known penny stocks with upper circuit locks"
            ])
        ),
        (
            "'Digital Arrest' & Fake Law Enforcement Extortion Exposed",
            "digital-arrest-scam",
            "Extortion Scams",
            "4 min",
            "Understanding why police and government agencies never arrest citizens over video calls or demand security deposits.",
            """The Indian Ministry of Home Affairs (MHA) and Prime Minister's Office have issued multiple public warnings regarding the dangerous 'Digital Arrest' cyber crime.

### How the Extortion Operates
- Victims receive an IVR call claiming an urgent parcel sent in their name containing narcotics or fake passports has been intercepted at customs.
- The call is transferred to a fake 'CBI Officer' or 'Cyber Cell' sitting against a backdrop featuring police insignia.
- The scammer creates psychological terror, claiming the victim is under 'Digital Arrest' and must stay on video call for hours.
- Victims are coerced into transferring their entire life savings into a 'Reserve Bank verification account' which is actually a mule account.

### The Absolute Truth
1. There is NO concept of 'Digital Arrest' in Indian law.
2. No police officer, CBI official, ED agent, or judge conducts judicial proceedings or arrests via Skype/WhatsApp.
3. Government agencies NEVER ask citizens to transfer money to prove their innocence.""",
            json.dumps([
                "Caller claiming to be police/CBI demanding you stay on a video call",
                "Allegations of illegal narcotics parcels seized in your Aadhaar/name",
                "Demands to transfer money to 'RBI security clearance' or 'court escrow' accounts"
            ])
        ),
        (
            "Fake Pre-IPO and 'Institutional Quota' Allotment Scams",
            "fake-ipo-allotment-scam",
            "Securities Fraud",
            "3 min",
            "How scammers exploit IPO frenzy by promising guaranteed allotment outside regular stock exchange channels.",
            """Whenever high-profile companies announce IPOs in India, scammers invent fake 'Institutional Allotment Quotas'.

### The Legitimate Process
In India, retail investor IPO applications can ONLY be made through ASBA (Application Supported by Blocked Amount) via your registered bank account or UPI through a recognized Demat broker. The money remains blocked in your own bank account until allotment is finalized.

### The Scam Mechanics
- Scammers ask you to download a custom trading app (.APK file) or transfer funds directly to their entity.
- They claim to have 'Foreign Portfolio Investor (FPI)' or 'HNI Institutional' quotas with 100% allocation.
- In reality, your funds are diverted to cyber syndicate wallets, and the dashboard displays fictitious holdings.""",
            json.dumps([
                "Promises of guaranteed 100% allotment for oversubscribed IPOs",
                "Requirement to transfer money instead of standard ASBA bank blockage",
                "Instructions to install third-party trading APKs outside Google Play Store"
            ])
        ),
        (
            "How to Verify Any Advisor on the Official SEBI Portal in 2 Minutes",
            "how-to-verify-sebi-advisor",
            "Investor Toolkit",
            "2 min",
            "A step-by-step guide to checking SEBI registration before trusting anyone with investment advice.",
            """Before taking advice or paying for advisory services, follow these 3 simple verification steps:

1. **Ask for Registration Number**: Every genuine advisor has an INA (Investment Advisor) or INH (Research Analyst) number issued by SEBI.
2. **Check the Official Directory**: Visit `https://www.sebi.gov.in` → 'Recognised Intermediaries' → Check the name and registration validity.
3. **Match Bank Account**: Ensure that fees are paid only into the officially registered entity bank account, never to an individual's personal UPI ID.
4. **File Complaints on SCORES**: If you suspect fraud, file a complaint on SEBI's official SCORES 2.0 portal (`scores.sebi.gov.in`) or call the SEBI Toll-Free Investor Helpline: **1800 22 7575**.""",
            json.dumps([
                "Advisor refuses to provide their official SEBI registration certificate",
                "Registration number provided does not match the name on the SEBI portal",
                "Advisor asks for trading account passwords or demat credentials"
            ])
        )
    ]

    for m in modules:
        cursor.execute(
            """INSERT INTO learn_modules 
               (title, slug, category, read_time, summary, content, red_flags) 
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            m
        )

    # Seed Sample Demo Analyses
    samples = [
        (
            user_id,
            "text",
            "Guaranteed 50% monthly returns! Pay ₹10,000 today and double your money. Only 5 slots remaining for special VIP group.",
            "Guaranteed 50% monthly returns! Pay ₹10,000 today and double your money. Only 5 slots remaining for special VIP group.",
            "Tamil",
            "HIGH",
            90,
            "Identified 4 risk factor(s) with an overall risk score of 90/100.",
            "🚨 தீவிர எச்சரிக்கை: இந்தச் செய்தியில் 4 முக்கியமான நிதி மோசடி அறிகுறிகள் கண்டறியப்பட்டுள்ளன. இந்தியாவில் எந்தவொரு சட்டபூர்வமான நிதி நிறுவனமும் பங்குச் சந்தையில் 100% உறுதியான லாபத்தை உத்தரவாதம் செய்ய முடியாது. உடனடி யுபிஐ (UPI) மூலம் பணம் அனுப்புவது உங்கள் பணத்தை முழுமையாக இழக்கும் அபாயத்தை ஏற்படுத்தும்.",
            json.dumps([
                "🚨 STOP: Do NOT send money, do not click provided links, and do NOT share OTPs.",
                "Never transfer money through private UPI handles or personal bank accounts for investment purposes.",
                "Verify if the advisor or platform is registered on SEBI (sebi.gov.in).",
                "Dial 1930 immediately or lodge a complaint on cybercrime.gov.in if funds were transferred."
            ]),
            "Statutory Disclaimer: Educational safety assessment only.",
            0
        ),
        (
            user_id,
            "screenshot",
            "Exclusive Pre-IPO allocation! Get 100% guaranteed allotment of upcoming mega IPO without Demat lottery. Pay registration fee ₹25,000 today to VIP account.",
            "Exclusive Pre-IPO allocation! Get 100% guaranteed allotment of upcoming mega IPO without Demat lottery. Pay registration fee ₹25,000 today to VIP account.",
            "English",
            "HIGH",
            85,
            "Identified 3 risk factor(s) with an overall risk score of 85/100.",
            "🚨 DANGER WARNING: This message displays 3 critical warning signs of a financial scam. Guaranteed institutional quotas for retail investors outside regular ASBA blockage are completely fraudulent.",
            json.dumps([
                "🚨 STOP: Do NOT send money, do not click provided links, and do NOT share OTPs.",
                "Apply for IPOs strictly through ASBA bank blockage using your own registered Demat account."
            ]),
            "Statutory Disclaimer: Educational safety assessment only.",
            0
        ),
        (
            user_id,
            "text",
            "HDFC Bank Alert: Dear customer, monthly savings interest of ₹1,420 has been credited to your account. Bank never calls to ask for OTP or NetBanking password.",
            "HDFC Bank Alert: Dear customer, monthly savings interest of ₹1,420 has been credited to your account. Bank never calls to ask for OTP or NetBanking password.",
            "English",
            "LOW",
            5,
            "Identified 0 risk factor(s) with an overall risk score of 5/100.",
            "✅ LOW RISK / INFORMATIONAL: No severe predatory scam indicators detected in this content. The message follows standard regulatory banking safety guidelines.",
            json.dumps([
                "No action required.",
                "Always remember to never share your Banking OTP, PIN, or passwords with anyone."
            ]),
            "Statutory Disclaimer: Educational safety assessment only.",
            0
        )
    ]

    for item in samples:
        cursor.execute(
            """INSERT INTO analyses 
               (user_id, input_type, original_text, masked_text, language, risk_level, risk_score, 
                summary, explanation, actions, disclaimer, is_advice_intercepted)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            item
        )
        analysis_id = cursor.lastrowid

        # Insert indicators for high risk item
        if item[5] == "HIGH":
            cursor.execute(
                """INSERT INTO risk_indicators (analysis_id, indicator, severity, category, description, weight)
                   VALUES (?, ?, ?, ?, ?, ?)""",
                (analysis_id, "Guaranteed Return Claim", "HIGH", "Regulatory Violation", "SEBI strictly prohibits guaranteed returns.", 35)
            )
            cursor.execute(
                """INSERT INTO risk_indicators (analysis_id, indicator, severity, category, description, weight)
                   VALUES (?, ?, ?, ?, ?, ?)""",
                (analysis_id, "High-Pressure Urgency", "MEDIUM", "Social Engineering", "Artificial deadline created to prompt hasty transfer.", 15)
            )

        cursor.execute(
            """INSERT INTO sources (analysis_id, source_name, source_url, verification_status)
               VALUES (?, ?, ?, ?)""",
            (analysis_id, "Securities and Exchange Board of India (SEBI)", "https://www.sebi.gov.in", "OFFICIAL_REGULATOR")
        )

    conn.commit()
    print("Database seeding completed.")
