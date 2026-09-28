export const LEARN_MODULES = [
  {
    id: 1,
    title: "The Truth About 'Guaranteed Returns' in Stock Markets",
    slug: "guaranteed-returns-scam",
    category: "Regulatory Defense",
    read_time: "3 min",
    summary: "Why no legal entity in India can promise fixed percentage returns on equities, and how to spot fraudulent claims.",
    content: `Under SEBI (Securities and Exchange Board of India) regulations, all equity investments are subject to market risks. No registered broker, mutual fund, or investment advisor is legally permitted to promise or guarantee fixed returns.

### The Mathematics of Fraud
Scammers often promise '30% per month' or 'doubling money in 21 days'. Consider this: If someone could genuinely generate 30% per month, an initial capital of ₹10,000 would turn into over ₹2.3 Crores in just 3 years! If they had such a formula, they would never need to solicit ₹5,000 deposits from stranger groups on WhatsApp.

### What Regulators Say
- SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/15 explicitly bans intermediaries from associating with any person offering guaranteed returns.
- Always check the SEBI website for registered entities.`,
    red_flags: [
      "Phrases like '100% risk free', 'guaranteed monthly profit', 'capital protection'",
      "High returns exceeding 20% annualized for non-debt products",
      "Requests for money transfers to private savings accounts or UPI handles"
    ]
  },
  {
    id: 2,
    title: "Fake Telegram VIP Trading Groups & Pump-and-Dump",
    slug: "telegram-trading-scams",
    category: "Social Media Fraud",
    read_time: "4 min",
    summary: "How scammers fabricate trading profit screenshots and trap retail investors in illiquid penny stocks.",
    content: `Telegram and WhatsApp have become the ground zero for organized investment fraud targeting Tier-2 and Tier-3 Indian cities.

### The Typical Playbook
1. **The Hook**: You are added without consent to a group named 'VIP Bull Traders' or 'HNI Institutional Calls'.
2. **Social Proof Illusion**: The group is filled with bots posting fake Zerodha/Groww P&L screenshots showing lakhs in daily profits.
3. **The Pump**: The admin announces a 'secret jackpot penny stock' and urges everyone to buy at market price.
4. **The Dump**: The scammers sell their own massive holdings to the unsuspecting buyers, crashing the stock price by 90% and leaving retail investors trapped with worthless shares.

### Key Defense Rule
Never buy stocks based on unsolicited messaging app tips. Genuine SEBI Registered Research Analysts (RA) will always provide their registration number and publish compliant research reports.`,
    red_flags: [
      "Unsolicited addition to Telegram/WhatsApp trading groups",
      "Admins claiming 'exclusive insider news' or 'operator tie-ups'",
      "Calls to buy little-known penny stocks with upper circuit locks"
    ]
  },
  {
    id: 3,
    title: "'Digital Arrest' & Fake Law Enforcement Extortion Exposed",
    slug: "digital-arrest-scam",
    category: "Extortion Scams",
    read_time: "4 min",
    summary: "Understanding why police and government agencies never arrest citizens over video calls or demand security deposits.",
    content: `The Indian Ministry of Home Affairs (MHA) and Prime Minister's Office have issued multiple public warnings regarding the dangerous 'Digital Arrest' cyber crime.

### How the Extortion Operates
- Victims receive an IVR call claiming an urgent parcel sent in their name containing narcotics or fake passports has been intercepted at customs.
- The call is transferred to a fake 'CBI Officer' or 'Cyber Cell' sitting against a backdrop featuring police insignia.
- The scammer creates psychological terror, claiming the victim is under 'Digital Arrest' and must stay on video call for hours.
- Victims are coerced into transferring their entire life savings into a 'Reserve Bank verification account' which is actually a mule account.

### The Absolute Truth
1. There is NO concept of 'Digital Arrest' in Indian law.
2. No police officer, CBI official, ED agent, or judge conducts judicial proceedings or arrests via Skype/WhatsApp.
3. Government agencies NEVER ask citizens to transfer money to prove their innocence.`,
    red_flags: [
      "Caller claiming to be police/CBI demanding you stay on a video call",
      "Allegations of illegal narcotics parcels seized in your Aadhaar/name",
      "Demands to transfer money to 'RBI security clearance' or 'court escrow' accounts"
    ]
  },
  {
    id: 4,
    title: "Fake Pre-IPO and 'Institutional Quota' Allotment Scams",
    slug: "fake-ipo-allotment-scam",
    category: "Securities Fraud",
    read_time: "3 min",
    summary: "How scammers exploit IPO frenzy by promising guaranteed allotment outside regular stock exchange channels.",
    content: `Whenever high-profile companies announce IPOs in India, scammers invent fake 'Institutional Allotment Quotas'.

### The Legitimate Process
In India, retail investor IPO applications can ONLY be made through ASBA (Application Supported by Blocked Amount) via your registered bank account or UPI through a recognized Demat broker. The money remains blocked in your own bank account until allotment is finalized.

### The Scam Mechanics
- Scammers ask you to download a custom trading app (.APK file) or transfer funds directly to their entity.
- They claim to have 'Foreign Portfolio Investor (FPI)' or 'HNI Institutional' quotas with 100% allocation.
- In reality, your funds are diverted to cyber syndicate wallets, and the dashboard displays fictitious holdings.`,
    red_flags: [
      "Promises of guaranteed 100% allotment for oversubscribed IPOs",
      "Requirement to transfer money instead of standard ASBA bank blockage",
      "Instructions to install third-party trading APKs outside Google Play Store"
    ]
  },
  {
    id: 5,
    title: "How to Verify Any Advisor on the Official SEBI Portal in 2 Minutes",
    slug: "how-to-verify-sebi-advisor",
    category: "Investor Toolkit",
    read_time: "2 min",
    summary: "A step-by-step guide to checking SEBI registration before trusting anyone with investment advice.",
    content: `Before taking advice or paying for advisory services, follow these 3 simple verification steps:

1. **Ask for Registration Number**: Every genuine advisor has an INA (Investment Advisor) or INH (Research Analyst) number issued by SEBI.
2. **Check the Official Directory**: Visit https://www.sebi.gov.in → 'Recognised Intermediaries' → Check the name and registration validity.
3. **Match Bank Account**: Ensure that fees are paid only into the officially registered entity bank account, never to an individual's personal UPI ID.
4. **File Complaints on SCORES**: If you suspect fraud, file a complaint on SEBI's official SCORES 2.0 portal (scores.sebi.gov.in) or call the SEBI Toll-Free Investor Helpline: 1800 22 7575.`,
    red_flags: [
      "Advisor refuses to provide their official SEBI registration certificate",
      "Registration number provided does not match the name on the SEBI portal",
      "Advisor asks for trading account passwords or demat credentials"
    ]
  }
];
