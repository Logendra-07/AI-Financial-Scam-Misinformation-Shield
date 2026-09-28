import json
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
import models

def seed_database():
    """
    Populates initial test data, realistic history, and investor safety learning modules.
    """
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(models.LearnModule).count() > 0:
        db.close()
        return

    print("Seeding initial NambikkAI safety modules and history...")

    # 1. Seed Investor Education Modules
    modules = [
        models.LearnModule(
            title="The Truth About 'Guaranteed Returns' in Stock Markets",
            slug="guaranteed-returns-scam",
            category="Regulatory Defense",
            read_time="3 min",
            summary="Why no legal entity in India can promise fixed percentage returns on equities, and how to spot fraudulent claims.",
            content="""
Under SEBI (Securities and Exchange Board of India) regulations, all equity investments are subject to market risks. No registered broker, mutual fund, or investment advisor is legally permitted to promise or guarantee fixed returns.

### The Mathematics of Fraud
Scammers often promise '30% per month' or 'doubling money in 21 days'. Consider this: If someone could genuinely generate 30% per month, an initial capital of ₹10,000 would turn into over ₹2.3 Crores in just 3 years! If they had such a formula, they would never need to solicit ₹5,000 deposits from stranger groups on WhatsApp.

### What Regulators Say
- SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/15 explicitly bans intermediaries from associating with any person offering guaranteed returns.
- Always check the SEBI website for registered entities.
            """,
            red_flags=json.dumps([
                "Phrases like '100% risk free', 'guaranteed monthly profit', 'capital protection'",
                "High returns exceeding 20% annualized for non-debt products",
                "Requests for money transfers to private savings accounts or UPI handles"
            ])
        ),
        models.LearnModule(
            title="Fake Telegram VIP Trading Groups & Pump-and-Dump",
            slug="telegram-trading-scams",
            category="Social Media Fraud",
            read_time="4 min",
            summary="How scammers fabricate trading profit screenshots and trap retail investors in illiquid penny stocks.",
            content="""
Telegram and WhatsApp have become the ground zero for organized investment fraud targeting Tier-2 and Tier-3 Indian cities.

### The Typical Playbook
1. **The Hook**: You are added without consent to a group named 'VIP Bull Traders' or 'HNI Institutional Calls'.
2. **Social Proof Illusion**: The group is filled with bots posting fake Zerodha/Groww P&L screenshots showing lakhs in daily profits.
3. **The Pump**: The admin announces a 'secret jackpot penny stock' and urges everyone to buy at market price.
4. **The Dump**: The scammers sell their own massive holdings to the unsuspecting buyers, crashing the stock price by 90% and leaving retail investors trapped with worthless shares.

### Key Defense Rule
Never buy stocks based on unsolicited messaging app tips. Genuine SEBI Registered Research Analysts (RA) will always provide their registration number and publish compliant research reports.
            """,
            red_flags=json.dumps([
                "Unsolicited addition to Telegram/WhatsApp trading groups",
                "Admins claiming 'exclusive insider news' or 'operator tie-ups'",
                "Calls to buy little-known penny stocks with upper circuit locks"
            ])
        ),
        models.LearnModule(
            title="'Digital Arrest' & Fake Law Enforcement Extortion Exposed",
            slug="digital-arrest-scam",
            category="Extortion Scams",
            read_time="4 min",
            summary="Understanding why police and government agencies never arrest citizens over video calls or demand security deposits.",
            content="""
The Indian Ministry of Home Affairs (MHA) and Prime Minister's Office have issued multiple public warnings regarding the dangerous 'Digital Arrest' cyber crime.

### How the Extortion Operates
- Victims receive an IVR call claiming an urgent parcel sent in their name containing narcotics or fake passports has been intercepted at customs.
- The call is transferred to a fake 'CBI Officer' or 'Cyber Cell' sitting against a backdrop featuring police insignia.
- The scammer creates psychological terror, claiming the victim is under 'Digital Arrest' and must stay on video call for hours.
- Victims are coerced into transferring their entire life savings into a 'Reserve Bank verification account' which is actually a mule account.

### The Absolute Truth
1. There is NO concept of 'Digital Arrest' in Indian law.
2. No police officer, CBI official, ED agent, or judge conducts judicial proceedings or arrests via Skype/WhatsApp.
3. Government agencies NEVER ask citizens to transfer money to prove their innocence.
            """,
            red_flags=json.dumps([
                "Caller claiming to be police/CBI demanding you stay on a video call",
                "Allegations of illegal narcotics parcels seized in your Aadhaar/name",
                "Demands to transfer money to 'RBI security clearance' or 'court escrow' accounts"
            ])
        ),
        models.LearnModule(
            title="Fake Pre-IPO and 'Institutional Quota' Allotment Scams",
            slug="fake-ipo-allotment-scam",
            category="Securities Fraud",
            read_time="3 min",
            summary="How scammers exploit IPO frenzy by promising guaranteed allotment outside regular stock exchange channels.",
            content="""
Whenever high-profile companies announce IPOs in India, scammers invent fake 'Institutional Allotment Quotas'.

### The Legitimate Process
In India, retail investor IPO applications can ONLY be made through ASBA (Application Supported by Blocked Amount) via your registered bank account or UPI through a recognized Demat broker. The money remains blocked in your own bank account until allotment is finalized.

### The Scam Mechanics
- Scammers ask you to download a custom trading app (.APK file) or transfer funds directly to their entity.
- They claim to have 'Foreign Portfolio Investor (FPI)' or 'HNI Institutional' quotas with 100% allocation.
- In reality, your funds are diverted to cyber syndicate wallets, and the dashboard displays fictitious holdings.
            """,
            red_flags=json.dumps([
                "Promises of guaranteed 100% allotment for oversubscribed IPOs",
                "Requirement to transfer money instead of standard ASBA bank blockage",
                "Instructions to install third-party trading APKs outside Google Play Store"
            ])
        ),
        models.LearnModule(
            title="How to Verify Any Advisor on the Official SEBI Portal in 2 Minutes",
            slug="how-to-verify-sebi-advisor",
            category="Investor Toolkit",
            read_time="2 min",
            summary="A step-by-step guide to checking SEBI registration before trusting anyone with investment advice.",
            content="""
Before taking advice or paying for advisory services, follow these 3 simple verification steps:

1. **Ask for Registration Number**: Every genuine advisor has an INA (Investment Advisor) or INH (Research Analyst) number issued by SEBI.
2. **Check the Official Directory**: Visit `https://www.sebi.gov.in` → 'Recognised Intermediaries' → Check the name and registration validity.
3. **Match Bank Account**: Ensure that fees are paid only into the officially registered entity bank account, never to an individual's personal UPI ID.
4. **File Complaints on SCORES**: If you suspect fraud, file a complaint on SEBI's official SCORES 2.0 portal (`scores.sebi.gov.in`) or call the SEBI Toll-Free Investor Helpline: **1800 22 7575**.
            """,
            red_flags=json.dumps([
                "Advisor refuses to provide their official SEBI registration certificate",
                "Registration number provided does not match the name on the SEBI portal",
                "Advisor asks for trading account passwords or demat credentials"
            ])
        )
    ]

    for m in modules:
        db.add(m)

    # 2. Seed Default User
    demo_user = models.User(
        name="Tamil Investor",
        email="investor@sangyan.in",
        language="Tamil"
    )
    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)

    # 3. Seed Realistic Historical Analyses for Judge Demonstration
    sample_analyses = [
        {
            "input_type": "text",
            "original_text": "Guaranteed 50% monthly returns! Pay ₹10,000 today and double your money. Only 5 slots remaining for special VIP group.",
            "masked_text": "Guaranteed 50% monthly returns! Pay ₹10,000 today and double your money. Only 5 slots remaining for special VIP group.",
            "language": "Tamil",
            "risk_level": "HIGH",
            "risk_score": 90,
            "summary": "Identified 4 risk factor(s) with an overall risk score of 90/100.",
            "explanation": "🚨 தீவிர எச்சரிக்கை: இந்தச் செய்தியில் 4 முக்கியமான நிதி மோசடி அறிகுறிகள் கண்டறியப்பட்டுள்ளன. இந்தியாவில் எந்தவொரு சட்டபூர்வமான நிதி நிறுவனமும் பங்குச் சந்தையில் 100% உறுதியான லாபத்தை உத்தரவாதம் செய்ய முடியாது. உடனடி யுபிஐ (UPI) மூலம் பணம் அனுப்புவது உங்கள் பணத்தை முழுமையாக இழக்கும் அபாயத்தை ஏற்படுத்தும்.",
            "actions": json.dumps([
                "🚨 STOP: Do NOT send money, do not click provided links, and do NOT share OTPs.",
                "Never transfer money through private UPI handles or personal bank accounts for investment purposes.",
                "Verify if the advisor or platform is registered on SEBI (sebi.gov.in).",
                "Dial 1930 immediately or lodge a complaint on cybercrime.gov.in if funds were transferred."
            ]),
            "disclaimer": "Statutory Disclaimer: Educational safety assessment only.",
            "is_advice_intercepted": False,
            "indicators": [
                {"name": "Guaranteed or Risk-Free Return Claim", "severity": "HIGH", "category": "Regulatory Violation", "weight": 35},
                {"name": "Abnormally High Return Promise", "severity": "HIGH", "category": "Ponzi Indicator", "weight": 30},
                {"name": "High-Pressure Urgency / FOMO", "severity": "MEDIUM", "category": "Social Engineering", "weight": 15},
                {"name": "Upfront Payment or Processing Fee", "severity": "HIGH", "category": "Advance Fee Fraud", "weight": 25}
            ]
        },
        {
            "input_type": "screenshot",
            "original_text": "Exclusive Pre-IPO allocation! Get 100% guaranteed allotment of upcoming mega IPO without Demat lottery. Pay registration fee ₹25,000 today to VIP account.",
            "masked_text": "Exclusive Pre-IPO allocation! Get 100% guaranteed allotment of upcoming mega IPO without Demat lottery. Pay registration fee ₹25,000 today to VIP account.",
            "language": "English",
            "risk_level": "HIGH",
            "risk_score": 85,
            "summary": "Identified 3 risk factor(s) with an overall risk score of 85/100.",
            "explanation": "🚨 DANGER WARNING: This message displays 3 critical warning signs of a financial scam. Guaranteed institutional quotas for retail investors outside regular ASBA blockage are completely fraudulent.",
            "actions": json.dumps([
                "🚨 STOP: Do NOT send money, do not click provided links, and do NOT share OTPs.",
                "Apply for IPOs strictly through ASBA bank blockage using your own registered Demat account."
            ]),
            "disclaimer": "Statutory Disclaimer: Educational safety assessment only.",
            "is_advice_intercepted": False,
            "indicators": [
                {"name": "Fake IPO / Institutional Quota Scheme", "severity": "HIGH", "category": "Securities Fraud", "weight": 35},
                {"name": "Guaranteed or Risk-Free Return Claim", "severity": "HIGH", "category": "Regulatory Violation", "weight": 35},
                {"name": "Upfront Payment or Processing Fee", "severity": "HIGH", "category": "Advance Fee Fraud", "weight": 25}
            ]
        },
        {
            "input_type": "text",
            "original_text": "HDFC Bank Alert: Dear customer, monthly savings interest of ₹1,420 has been credited to your account. Bank never calls to ask for OTP or NetBanking password.",
            "masked_text": "HDFC Bank Alert: Dear customer, monthly savings interest of ₹1,420 has been credited to your account. Bank never calls to ask for OTP or NetBanking password.",
            "language": "English",
            "risk_level": "LOW",
            "risk_score": 5,
            "summary": "Identified 0 risk factor(s) with an overall risk score of 5/100.",
            "explanation": "✅ LOW RISK / INFORMATIONAL: No severe predatory scam indicators detected in this content. The message follows standard regulatory banking safety guidelines.",
            "actions": json.dumps([
                "No action required.",
                "Always remember to never share your Banking OTP, PIN, or passwords with anyone."
            ]),
            "disclaimer": "Statutory Disclaimer: Educational safety assessment only.",
            "is_advice_intercepted": False,
            "indicators": []
        }
    ]

    for item in sample_analyses:
        indicators = item.pop("indicators")
        analysis_record = models.Analysis(
            user_id=demo_user.id,
            **item
        )
        db.add(analysis_record)
        db.commit()
        db.refresh(analysis_record)

        for ind in indicators:
            db_ind = models.RiskIndicator(
                analysis_id=analysis_record.id,
                **ind
            )
            db.add(db_ind)

        # Add official source link
        db_source = models.Source(
            analysis_id=analysis_record.id,
            source_name="Securities and Exchange Board of India (SEBI)",
            source_url="https://www.sebi.gov.in",
            verification_status="OFFICIAL_REGULATOR"
        )
        db.add(db_source)
        db.commit()

    db.close()
    print("Database seeding completed successfully.")

if __name__ == "__main__":
    seed_database()
