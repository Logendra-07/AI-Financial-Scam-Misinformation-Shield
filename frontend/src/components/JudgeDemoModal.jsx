import React from 'react';
import { X, Play, ShieldAlert, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export default function JudgeDemoModal({ isOpen, onClose, onSelectDemo }) {
  if (!isOpen) return null;

  const scenarios = [
    {
      id: 1,
      title: "Demo 1: Obvious Scam (Guaranteed Returns & FOMO)",
      tag: "🚨 High Risk",
      tagColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      language: "English",
      message: "Guaranteed 50% monthly returns! Pay ₹10,000 today and double your money in 21 days. Only 5 slots remaining for special VIP trading group.",
      focus: "Demonstrates detection of 4 red flags: guaranteed returns, abnormal yield, artificial urgency, and upfront fee."
    },
    {
      id: 2,
      title: "Demo 2: Regional Language (Tamil Bharat-First)",
      tag: "🌐 Tamil High Risk",
      tagColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      language: "Tamil",
      message: "உறுதியான வருமானம்! மாதம் 40% லாபம் பெற இன்றே ₹5,000 செலுத்துங்கள். இடர் இல்லாத சிறந்த பங்குச் சந்தை திட்டம்! கடைசி 3 இடங்கள் மட்டுமே.",
      focus: "Demonstrates regional language AI reasoning with culturally grounded Tamil explanation and voice synthesis."
    },
    {
      id: 3,
      title: "Demo 3: Fake IPO & Institutional Quota Fraud",
      tag: "💼 Securities Fraud",
      tagColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      language: "English",
      message: "Exclusive Pre-IPO allocation! Get 100% guaranteed allotment of upcoming mega IPO without Demat lottery. Pay registration fee ₹25,000 today to VIP account.",
      focus: "Shows deep regulatory awareness: flags unauthorized institutional quotas and explains the mandatory ASBA process."
    },
    {
      id: 4,
      title: "Demo 4: Legitimate Informational Message",
      tag: "✅ Low Risk",
      tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      language: "English",
      message: "HDFC Bank Alert: Dear customer, monthly savings interest of ₹1,420 has been credited to your account. Bank never calls to ask for OTP or NetBanking password.",
      focus: "Demonstrates that NambikkAI does NOT falsely flag legitimate banking communications as scams."
    },
    {
      id: 5,
      title: "Demo 5: SEBI Guardrail (Advice Request Blocked)",
      tag: "🛡️ Guardrail Intercept",
      tagColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      language: "English",
      message: "Which stock should I buy tomorrow for ₹50,000 to get quick profit? Should I buy Tata Motors or Suzlon?",
      focus: "Demonstrates strict SEBI compliance guardrails: refuses to dispense personalized buy/sell calls and redirects to registered RIAs."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Sangyan Hackathon — Judge Demo Scenarios
            </h2>
            <p className="text-xs text-slate-400">
              Select any evaluation case below to test the full NambikkAI AI reasoning pipeline in 1 click.
            </p>
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="space-y-3">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 transition-all group cursor-pointer"
              onClick={() => {
                onSelectDemo(sc.message, sc.language);
                onClose();
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${sc.tagColor}`}>
                    {sc.tag}
                  </span>
                  <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {sc.title}
                  </h3>
                </div>
                <button
                  className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all group-hover:scale-105"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Test
                </button>
              </div>

              <p className="text-xs font-mono bg-slate-900/80 p-2.5 rounded-xl text-slate-300 border border-slate-800/80 mb-2">
                "{sc.message}"
              </p>

              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="font-semibold text-slate-300">Criteria Target:</span> {sc.focus}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
