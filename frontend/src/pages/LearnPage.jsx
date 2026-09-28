import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ShieldAlert, 
  Award, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { LEARN_MODULES } from '../services/learnData';

export default function LearnPage() {
  const [modules] = useState(LEARN_MODULES);
  const [selectedModule, setSelectedModule] = useState(LEARN_MODULES[0]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "Someone on WhatsApp offers '30% guaranteed monthly returns on your capital'. What is the regulatory reality?",
      options: [
        "It is legitimate if they show an authorized certificate screenshot.",
        "SEBI regulations strictly forbid anyone from guaranteeing stock market returns.",
        "It is safe as long as the initial investment is less than ₹10,000.",
        "Only foreign brokers are allowed to give guaranteed returns."
      ],
      correctIndex: 1,
      explanation: "Under SEBI guidelines, all equity investments are subject to market risks. Legitimate advisors and mutual funds never guarantee fixed percentage returns."
    },
    {
      id: 2,
      question: "You receive a Skype video call claiming you are under 'Digital Arrest' by the CBI for an illegal parcel. What should you do?",
      options: [
        "Transfer money immediately to the temporary RBI clearance account.",
        "Stay on the video call until they verify your Aadhaar card.",
        "Hang up immediately, dial 1930, or report on cybercrime.gov.in. 'Digital Arrest' is a complete extortion scam.",
        "Ask them to reduce the security penalty deposit."
      ],
      correctIndex: 2,
      explanation: "There is NO concept of 'Digital Arrest' in Indian law. Police and CBI never conduct arrests, trials, or demand money transfers over video calls."
    },
    {
      id: 3,
      question: "How are genuine retail IPO allocations handled for Indian stock exchanges?",
      options: [
        "By transferring money directly to Telegram group admins.",
        "Through third-party APK investment apps.",
        "Strictly via ASBA (Application Supported by Blocked Amount) through your own bank or registered broker.",
        "Via special WhatsApp pre-IPO lottery forms."
      ],
      correctIndex: 2,
      explanation: "In India, retail IPO applications can only be submitted via ASBA through your bank or registered Demat broker. The money remains blocked in your own account until allotment."
    }
  ];

  const handleSelectOption = (qId, optionIdx) => {
    if (showQuizResults) return;
    setQuizAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) score += 1;
    });
    return score;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Investor Education & Safety Academy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Financial Self-Defense Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Master the mechanics of Indian financial scams, decode manipulative psychological tactics, and learn how to independently verify regulatory registrations.
        </p>
      </div>

      {/* Main Learning Hub Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Left Column: Module Navigation List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Safety Playbooks ({modules.length})
          </h3>
          {modules.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedModule(m)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedModule?.id === m.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="font-semibold text-indigo-400">{m.category}</span>
                <span>{m.read_time}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold leading-snug">
                {m.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Right 2 Cols: Selected Module Reader */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {selectedModule ? (
            <div className="space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                  <span>{selectedModule.category}</span>
                  <span>•</span>
                  <span>{selectedModule.read_time} read</span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {selectedModule.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 italic border-l-2 border-indigo-500 pl-3">
                  "{selectedModule.summary}"
                </p>
              </div>

              {/* Module Content */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-800 pt-4">
                {selectedModule.content}
              </div>

              {/* Red Flags to Watch */}
              {selectedModule.red_flags?.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2">
                    <ShieldAlert className="w-4 h-4" />
                    Key Red Flags to Watch
                  </h4>
                  <ul className="space-y-1.5 text-xs text-rose-200">
                    {selectedModule.red_flags.map((rf, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{rf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a safety module to start reading.
            </div>
          )}
        </div>

      </div>

      {/* Interactive 3-Question Scam Awareness Quiz */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Investor Safety Quiz: Test Your Scam Radar
              </h3>
              <p className="text-xs text-slate-400">
                Answer these 3 real-world scenarios faced by retail investors.
              </p>
            </div>
          </div>

          {showQuizResults && (
            <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Score: {calculateScore()} / {quizQuestions.length} Correct!</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, idx) => (
            <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <p className="text-xs sm:text-sm font-semibold text-white mb-3">
                {idx + 1}. {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, oIdx) => {
                  const isSelected = quizAnswers[q.id] === oIdx;
                  const isCorrect = q.correctIndex === oIdx;
                  let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-indigo-500/40";

                  if (showQuizResults) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-950/40 border-rose-500 text-rose-200 font-semibold";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-indigo-600/30 border-indigo-500 text-white font-semibold";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] shrink-0 font-bold">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showQuizResults && (
                <div className="mt-3 p-3 rounded-xl bg-slate-900 text-[11px] text-slate-300 border border-slate-800 flex items-start gap-2">
                  <span className="font-bold text-emerald-400">Explanation:</span>
                  <span>{q.explanation}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
          {showQuizResults ? (
            <button
              onClick={() => {
                setQuizAnswers({});
                setShowQuizResults(false);
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Retake Quiz
            </button>
          ) : (
            <button
              onClick={() => setShowQuizResults(true)}
              disabled={Object.keys(quizAnswers).length < quizQuestions.length}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <span>Submit Answers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
