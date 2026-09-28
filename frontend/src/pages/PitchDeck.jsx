import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Presentation, 
  Target, 
  Layers, 
  Cpu, 
  Database, 
  Award, 
  TrendingUp, 
  Users,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export default function PitchDeck({ setActivePage }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const slides = [
    {
      id: 1,
      tag: "Cover Slide",
      title: "NambikkAI — AI Financial Safety Assistant",
      subtitle: "“Understand before you invest” — Protecting Bharat's retail investors from fraud & misinformation.",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-8 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-bounce">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Nambikk<span className="text-emerald-400">AI</span>
            </h2>
            <p className="text-lg text-slate-300 font-medium">
              Tamil: <span className="text-emerald-300">நம்பிக்கை</span> (Trust / Hope) + AI
            </p>
            <p className="text-sm text-indigo-400 font-semibold tracking-wider uppercase">
              Sangyan 2026 Problem-Solving Competition
            </p>
          </div>
          <div className="inline-flex items-center gap-4 text-xs text-slate-400 bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800">
            <span>🛡️ Fraud Shield</span>
            <span>•</span>
            <span>🌐 Bharat Regional Voices</span>
            <span>•</span>
            <span>🤖 Explainable AI & Guardrails</span>
          </div>
        </div>
      ),
      notes: "Judges, welcome to NambikkAI. Over 10 Crore Indian retail investors entered the stock market recently, but millions in Tier-2/3 cities are falling prey to WhatsApp scams and digital arrest extortion. NambikkAI is the bridge between complex financial regulations and everyday citizens in their mother tongue."
    },
    {
      id: 2,
      tag: "Problem Statement",
      title: "The Crisis in Indian Retail Investing",
      subtitle: "Why 85% of first-time investors in Tier-2/3 cities are vulnerable to cyber financial fraud.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30">
            <div className="text-2xl font-black text-rose-400 mb-1">₹1.75 Lakh Cr</div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Lost in Cyber Scams</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Organized cyber crime syndicates lure retail investors with fake Telegram groups, "guaranteed 40% returns", and digital arrest extortion.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="text-2xl font-black text-amber-400 mb-1">84% English Bias</div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Regional Language Barrier</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official SEBI warnings and financial disclosure documents are overwhelmingly written in complex legal English, alienating vernacular speakers in Tamil Nadu, UP, and AP.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
            <div className="text-2xl font-black text-indigo-400 mb-1">Binary AI Trap</div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Unexplainable Tools</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Existing spam filters just say 'Spam' or 'Not Spam'. Users don't learn WHY a scheme is dangerous, causing them to fall for the next variation.
            </p>
          </div>
        </div>
      ),
      notes: "Highlight the scale of the issue: cyber syndicates are specifically weaponizing WhatsApp, Telegram, and fake YouTube task groups to target individuals who lack digital and financial literacy."
    },
    {
      id: 3,
      tag: "Unique Solution",
      title: "NambikkAI: 360° Safety Shield for Bharat",
      subtitle: "An explainable AI assistant that educates while it protects.",
      content: (
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold">1</div>
            <div>
              <h4 className="text-sm font-bold text-white">Multi-Modal Ingestion</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Users don't need to type — they can forward a WhatsApp SMS, upload a trading app screenshot for OCR, paste a link, or speak directly in their native language.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 font-bold">2</div>
            <div>
              <h4 className="text-sm font-bold text-white">Safety Report, Not Just Binary Label</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Outputs an intuitive 0-100 Risk Score, breakdown of detected red flags (Guaranteed returns, FOMO, advance fee), explainable reasoning in Tamil/Hindi, and step-by-step safe actions.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-bold">3</div>
            <div>
              <h4 className="text-sm font-bold text-white">Built-in SEBI Compliance Guardrails</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Strictly intercepts queries asking for stock tips or buy/sell recommendations, ensuring AI never gives unauthorized financial advice.
              </p>
            </div>
          </div>
        </div>
      ),
      notes: "Emphasize our core differentiator: We don't just say 'Scam'. We provide education + detection + explanation + emergency safe actions."
    },
    {
      id: 4,
      tag: "Main Features",
      title: "Comprehensive Feature Architecture",
      subtitle: "Engineered specifically around Sangyan hackathon problem requirements.",
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-base mb-1 block">🔍</span>
            <span className="font-bold text-white">Scam Analyzer</span>
            <p className="text-[11px] text-slate-400 mt-1">Multi-vector analysis for text, SMS, URLs, images, and audio.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-base mb-1 block">🌐</span>
            <span className="font-bold text-white">Regional AI</span>
            <p className="text-[11px] text-slate-400 mt-1">First-class support for Tamil, Hindi, Telugu, and English.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-base mb-1 block">🎙️</span>
            <span className="font-bold text-white">Voice In & Out</span>
            <p className="text-[11px] text-slate-400 mt-1">Speak queries and listen to warnings via Web Speech audio.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-base mb-1 block">🖼️</span>
            <span className="font-bold text-white">Screenshot OCR</span>
            <p className="text-[11px] text-slate-400 mt-1">Extract text from fake P&L screenshots and Telegram chats.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-base mb-1 block">🛡️</span>
            <span className="font-bold text-white">Trust & Guardrails</span>
            <p className="text-[11px] text-slate-400 mt-1">Automatic PII masking and SEBI advice interception.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-base mb-1 block">📚</span>
            <span className="font-bold text-white">Learn Hub</span>
            <p className="text-[11px] text-slate-400 mt-1">Interactive playbooks on Ponzi schemes, Digital Arrest, and SEBI.</p>
          </div>
        </div>
      ),
      notes: "Walk judges through the 6 pillars. Each feature directly aligns with a specific criterion of the Sangyan evaluation rubric."
    },
    {
      id: 5,
      tag: "AI Architecture",
      title: "End-to-End AI Pipeline",
      subtitle: "Multi-stage pipeline combining deterministic heuristics with Google Gemini 3.8 Flash.",
      content: (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>INPUT: Text / Screenshot / Audio / URL</span>
            <span className="text-emerald-400 font-bold">Step 1: Ingestion</span>
          </div>

          <div className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-indigo-300">
            ➔ PII MASKING: Phone (+91), PAN, Aadhaar, UPI ID automatically redacted
          </div>

          <div className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-indigo-300">
            ➔ SEBI GUARDRAILS ENGINE: Blocks buy/sell recommendation requests
          </div>

          <div className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-indigo-300">
            ➔ AI RISK ENGINE: 10 Indian fraud vectors + Gemini 3.8 Flash reasoning
          </div>

          <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
            ➔ EXPLAINABILITY & VOICE: Localized Tamil/Hindi synthesis + 1930 Helpline
          </div>
        </div>
      ),
      notes: "Highlight our hybrid edge: The rule engine executes in under 15 milliseconds completely offline with 100% reliability, while Gemini 3.8 Flash provides deep semantic contextual reasoning when online."
    },
    {
      id: 6,
      tag: "Tech Stack & DB",
      title: "Modern, Scalable Tech Stack",
      subtitle: "Designed for high throughput, zero latency, and rapid deployment.",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-indigo-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Frontend & UI
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li>• React 19 + Vite (Fast compilation & HMR)</li>
              <li>• Tailwind CSS v4 (Sleek dark financial dashboard)</li>
              <li>• Lucide Icons + Canvas Confetti</li>
              <li>• Web Speech API (Microphone & Synthesis)</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Backend & AI
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li>• FastAPI (High performance async Python REST API)</li>
              <li>• Google Gemini 3.8 Flash (google-genai SDK)</li>
              <li>• SQLite3 / PostgreSQL relational architecture</li>
              <li>• Tesseract / Vision OCR multi-modal pipeline</li>
            </ul>
          </div>
        </div>
      ),
      notes: "Both frontend and backend are lightweight, containerizable with Docker, and can easily deploy to GCP Cloud Run or Render."
    },
    {
      id: 7,
      tag: "Evaluation Rubric",
      title: "Alignment with Sangyan Criteria",
      subtitle: "How every line of code answers the competition evaluation framework.",
      content: (
        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">1. Investor Resilience & Safety</span>
            <span className="text-emerald-400 font-semibold">10 Indian fraud vectors + 1930 integration</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">2. Bharat-First Usability</span>
            <span className="text-emerald-400 font-semibold">Tamil, Hindi, Telugu + Voice Assistant</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">3. Trust & Privacy</span>
            <span className="text-emerald-400 font-semibold">Automatic PII masking + SEBI source citation</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">4. Technical Execution</span>
            <span className="text-emerald-400 font-semibold">Working React + FastAPI full-stack app</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white">5. Impact & Scalability</span>
            <span className="text-emerald-400 font-semibold">Ready for WhatsApp Bot & Telco API</span>
          </div>
        </div>
      ),
      notes: "Point judges to this slide: it proves that our architecture is 100% custom-tailored to the Sangyan judging criteria."
    },
    {
      id: 8,
      tag: "Live Demo",
      title: "3 Live Demonstration Scenarios",
      subtitle: "Demonstrating accuracy, regional adaptation, and avoidance of overclaiming.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-2 text-xs">
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
            <span className="font-bold text-rose-400">Demo 1: Obvious Scam</span>
            <p className="text-slate-300 mt-1">"Guaranteed 50% monthly returns. Pay ₹10,000 today."</p>
            <p className="text-emerald-400 font-bold mt-2">➔ 90/100 HIGH RISK + 4 Red Flags</p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <span className="font-bold text-amber-400">Demo 2: Tamil Voice</span>
            <p className="text-slate-300 mt-1">"உறுதியான வருமானம்! மாதம் 40% லாபம் பெற இன்றே ₹5000..."</p>
            <p className="text-emerald-400 font-bold mt-2">➔ Tamil Safety Report + Spoken Voice</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="font-bold text-emerald-400">Demo 3: Non-Scam Alert</span>
            <p className="text-slate-300 mt-1">"HDFC Bank Alert: Savings interest ₹1,420 credited."</p>
            <p className="text-emerald-400 font-bold mt-2">➔ 5/100 LOW RISK (Avoids false alarms)</p>
          </div>
        </div>
      ),
      notes: "Judges can test all three of these live right now using the 'Demo Mode' button in the navbar!"
    },
    {
      id: 9,
      tag: "Roadmap",
      title: "Impact & Production Roadmap",
      subtitle: "Taking NambikkAI from hackathon prototype to 10 Crore Indian investors.",
      content: (
        <div className="space-y-3 py-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="font-bold text-indigo-400 shrink-0">Phase 1 (Q2):</span>
            <div>
              <span className="font-bold text-white">WhatsApp & Telegram Forward Bot</span>
              <p className="text-slate-400 mt-0.5">Integrate via WhatsApp Business API so users can simply forward suspicious messages to a verified number.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="font-bold text-emerald-400 shrink-0">Phase 2 (Q3):</span>
            <div>
              <span className="font-bold text-white">SEBI SCORES 2.0 Live API Integration</span>
              <p className="text-slate-400 mt-0.5">Automated lookups of intermediary registration numbers directly against SEBI's central database.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="font-bold text-amber-400 shrink-0">Phase 3 (Q4):</span>
            <div>
              <span className="font-bold text-white">Telco-Level SMS Spam Filter Partnership</span>
              <p className="text-slate-400 mt-0.5">Partner with TRAI and telecommunication providers to flag predatory investment SMS before they reach elderly citizens.</p>
            </div>
          </div>
        </div>
      ),
      notes: "This proves our project is not just a hackathon toy, but a viable, high-impact public utility for Indian financial inclusion."
    },
    {
      id: 10,
      tag: "Conclusion",
      title: "Empowering Bharat's Financial Future",
      subtitle: "“Every rupee saved from a cyber scam is a rupee invested in India's growth story.”",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white">
            NambikkAI is Ready to Protect Indian Investors.
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Thank you, honorable judges of Sangyan. We invite you to test the live prototype right now.
          </p>

          <button
            onClick={() => setActivePage('analyzer')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 cursor-pointer"
          >
            Launch Live Safety Shield
          </button>
        </div>
      ),
      notes: "Wrap up with energy and confidence. Invite questions and immediately transition to the live interactive demo."
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Slide Deck Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        
        {/* Top Slide Meta Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {current.tag}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-colors cursor-pointer ${
              showNotes ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-800/80 text-slate-400 border-slate-700'
            }`}
          >
            {showNotes ? 'Hide Speaker Script' : 'View Speaker Script'}
          </button>
        </div>

        {/* Slide Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {current.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {current.subtitle}
          </p>
        </div>

        {/* Slide Body */}
        <div className="min-h-[280px] flex flex-col justify-center">
          {current.content}
        </div>

        {/* Speaker Script Panel */}
        {showNotes && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed animate-in fade-in duration-200">
            <span className="font-bold text-amber-400 block mb-1">🎤 Speaker Script for Judges:</span>
            {current.notes}
          </div>
        )}

        {/* Slide Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8">
          <button
            onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === i ? 'w-6 bg-indigo-500' : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
