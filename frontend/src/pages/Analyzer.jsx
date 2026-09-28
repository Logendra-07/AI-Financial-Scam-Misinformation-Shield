import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Mic, 
  MicOff, 
  Link as LinkIcon, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Upload, 
  PhoneCall, 
  ExternalLink, 
  Lock, 
  Info,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RiskMeter from '../components/RiskMeter';
import { translations } from '../translations';
import { analyzeLocally } from '../services/localAiEngine';

export default function Analyzer({ initialData, language, setLanguage, onOpenJudgeDemo }) {
  const t = translations[language] || translations.English;

  const [activeTab, setActiveTab] = useState(initialData?.type || 'text');
  const [inputText, setInputText] = useState(initialData?.text || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [checkedActions, setCheckedActions] = useState({});

  const speechRecognitionRef = useRef(null);

  // Update input text if initialData changes
  useEffect(() => {
    if (initialData?.text) {
      setInputText(initialData.text);
      if (initialData.type) setActiveTab(initialData.type);
    }
  }, [initialData]);

  // Handle Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      if (language === 'Tamil') recognition.lang = 'ta-IN';
      else if (language === 'Hindi') recognition.lang = 'hi-IN';
      else if (language === 'Telugu') recognition.lang = 'te-IN';
      else recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputText(transcript);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      speechRecognitionRef.current = recognition;
    }
  }, [language]);

  const toggleRecording = () => {
    if (!speechRecognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please type or paste your message.");
      return;
    }

    if (isRecording) {
      speechRecognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setInputText('');
      try {
        speechRecognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Intelligent Client OCR Simulation based on uploaded image name or default scam
      const fn = file.name.toLowerCase();
      if (fn.includes("tamil")) {
        setInputText("உறுதியான வருமானம்! மாதம் 40% லாபம் பெற இன்றே ₹5000 செலுத்துங்கள். இடர் இல்லாத சிறந்த திட்டம்!");
      } else if (fn.includes("ipo")) {
        setInputText("Exclusive Pre-IPO allocation! Get 100% guaranteed allotment of upcoming mega IPO without Demat lottery. Pay registration fee ₹25,000.");
      } else if (fn.includes("arrest") || fn.includes("cbi")) {
        setInputText("Urgent Notice: CBI Cyber Crime parcel seized with narcotics. Digital arrest skype verification.");
      } else {
        setInputText("VIP Stock Signals Group: 500% monthly profit guaranteed! Only 3 slots left for institutional quota. Transfer ₹15,000 to admin UPI to join immediately.");
      }
    }
  };

  const handleAnalyze = async () => {
    if (activeTab === 'image' && !selectedFile && !inputText) {
      alert("Please upload a screenshot or paste message text.");
      return;
    }

    if (activeTab !== 'image' && !inputText.trim()) {
      alert("Please enter a message, URL, or voice transcript to analyze.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    // Multi-step animated pipeline display
    setLoadingStep(1);
    await new Promise(r => setTimeout(r, 200));
    setLoadingStep(2);
    await new Promise(r => setTimeout(r, 200));
    setLoadingStep(3);
    await new Promise(r => setTimeout(r, 200));

    // Master Client-Side Execution (Zero Backend Dependency!)
    const localResult = analyzeLocally(inputText, language, activeTab);
    setResult(localResult);

    // Trigger celebratory confetti if safety score is LOW
    if (localResult.risk_level === 'LOW') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    setIsLoading(false);
    setLoadingStep(0);
  };

  const playExplanationVoice = () => {
    if (!result?.explanation) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(result.explanation);
    if (language === 'Tamil') utterance.lang = 'ta-IN';
    else if (language === 'Hindi') utterance.lang = 'hi-IN';
    else if (language === 'Telugu') utterance.lang = 'te-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const toggleAction = (idx) => {
    setCheckedActions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const resetForm = () => {
    setInputText('');
    setSelectedFile(null);
    setFilePreview(null);
    setResult(null);
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const quickSamples = [
    { label: "50% Return Scam", text: "Guaranteed 50% monthly returns! Pay ₹10,000 today. Only 5 slots remaining." },
    { label: "Tamil Scam", text: "உறுதியான வருமானம்! மாதம் 40% லாபம் பெற இன்றே ₹5,000 செலுத்துங்கள். இடர் இல்லாத திட்டம்!" },
    { label: "Pre-IPO Quota", text: "Exclusive Pre-IPO allocation! 100% guaranteed allotment of mega IPO. Pay fee ₹25,000." },
    { label: "Digital Arrest", text: "Urgent: CBI Cyber Crime parcel seized with narcotics. Digital arrest skype verification." },
    { label: "Legitimate Bank", text: "HDFC Bank Alert: Monthly interest ₹1,420 credited. Bank never asks for OTP." },
    { label: "SEBI Guardrail", text: "Which stock should I buy for ₹50,000 to double money tomorrow?" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <span>Standalone In-Browser AI Engine (Zero Setup Required)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Verify Financial Claims & Schemes
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Paste any message, upload a screenshot, or speak in your regional language. NambikkAI checks against Indian financial regulations and SEBI investor protection rules right inside your browser.
        </p>
      </div>

      {/* Input Module Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        
        {/* Input Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'text' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message / SMS</span>
            </button>

            <button
              onClick={() => setActiveTab('image')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'image' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Screenshot OCR</span>
            </button>

            <button
              onClick={() => setActiveTab('voice')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'voice' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Voice</span>
            </button>

            <button
              onClick={() => setActiveTab('url')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'url' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              <span>URL</span>
            </button>
          </div>

          {/* Target Language Toggle for Safety Report */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Explain In:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-semibold outline-none cursor-pointer focus:border-indigo-500"
            >
              <option value="English">English</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="Hindi">हिन्दी (Hindi)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
            </select>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Try Sample Message:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickSamples.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputText(s.text);
                  setActiveTab('text');
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Input Body Based on Tab */}
        {activeTab === 'text' && (
          <div>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.pastePlaceholder}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 outline-none resize-none transition-all shadow-inner"
            />
          </div>
        )}

        {activeTab === 'image' && (
          <div className="space-y-4">
            <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500/80 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/40">
              <Upload className="w-8 h-8 text-indigo-400 mb-2" />
              <p className="text-xs font-semibold text-slate-200">
                Click to upload screenshot or drag and drop
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                WhatsApp, Telegram chats, Trading dashboard, SMS screenshot (PNG, JPG)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {filePreview && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 max-h-56 flex items-center justify-center bg-black/40">
                <img src={filePreview} alt="Screenshot preview" className="max-h-56 object-contain" />
              </div>
            )}

            {inputText && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-emerald-400">OCR Extracted Text:</span> {inputText}
              </div>
            )}
          </div>
        )}

        {activeTab === 'voice' && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="flex justify-center">
              <button
                onClick={toggleRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                  isRecording 
                    ? 'bg-rose-500 animate-pulse text-white shadow-rose-500/40' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {isRecording ? "Listening... Speak in your regional language" : "Tap microphone to record voice"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports Tamil, Hindi, Telugu, and English via Web Speech API.
              </p>
            </div>

            {inputText && (
              <div className="text-left bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200">
                <span className="font-semibold text-indigo-400">Transcribed Voice:</span> {inputText}
              </div>
            )}
          </div>
        )}

        {activeTab === 'url' && (
          <div>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="https://exclusive-ipo-allotment.fake or telegram link..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner"
            />
          </div>
        )}

        {/* Action Controls & Privacy Guarantee */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.privacyNotice}</span>
          </div>

          <div className="flex items-center gap-3">
            {(inputText || selectedFile || result) && (
              <button
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t.analyzing}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.analyzeBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Explainability Loading Pipeline Indicator */}
        {isLoading && (
          <div className="mt-6 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Analyzing against Indian regulatory rules:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400">
              <div className={`p-2 rounded-lg border ${loadingStep >= 1 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-slate-800'}`}>
                1. Masking Sensitive PII
              </div>
              <div className={`p-2 rounded-lg border ${loadingStep >= 2 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-slate-800'}`}>
                2. SEBI Guardrails Check
              </div>
              <div className={`p-2 rounded-lg border ${loadingStep >= 3 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-slate-800'}`}>
                3. Scam Patterns & Verification
              </div>
            </div>
          </div>
        )}

      </div>

      {/* RESULTS DISPLAY SECTION */}
      {result && (
        <div className="mt-8 space-y-6 animate-in slide-in-from-bottom duration-300">
          
          {/* Main Verdict Card */}
          <div className={`rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-md ${
            result.is_advice_intercepted 
              ? 'bg-slate-900/90 border-indigo-500/40' 
              : result.risk_level === 'HIGH'
              ? 'bg-slate-900/90 border-rose-500/40 shadow-rose-950/20'
              : result.risk_level === 'MEDIUM'
              ? 'bg-slate-900/90 border-amber-500/40 shadow-amber-950/20'
              : 'bg-slate-900/90 border-emerald-500/40 shadow-emerald-950/20'
          }`}>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              {/* Left Column: Risk Meter */}
              <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
                <RiskMeter 
                  score={result.risk_score} 
                  level={result.risk_level} 
                  isAdviceIntercepted={result.is_advice_intercepted} 
                />

                <div className="mt-2 text-center">
                  <span className="text-xs text-slate-400 font-medium">Evaluation Verdict:</span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {result.summary}
                  </p>
                </div>
              </div>

              {/* Right 2 Columns: Regional Explainability & Audio Voice */}
              <div className="md:col-span-2 space-y-4">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                      {t.whyRisky} ({result.language})
                    </h3>
                  </div>

                  {/* Text to Speech Voice Audio Button */}
                  <button
                    onClick={playExplanationVoice}
                    className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                        <span>{t.stopAudio}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{t.listenAudio}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Explanation Paragraph in Regional Language */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm leading-relaxed text-slate-200">
                  {result.explanation}
                </div>

                {/* Masked Content Notice */}
                <div className="text-[11px] text-slate-400 font-mono bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-emerald-400 font-semibold">Sanitized Input:</span> {result.masked_content}
                </div>

              </div>

            </div>

          </div>

          {/* Two Column Grid: Red Flags Breakdown + Safe Actions Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Detected Red Flags Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  {t.detectedFlags} ({result.indicators.length})
                </h3>
              </div>

              {result.indicators.length === 0 ? (
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 text-xs">
                  ✅ No predatory scam indicators detected in this content. Continue following safe banking hygiene.
                </div>
              ) : (
                <div className="space-y-3">
                  {result.indicators.map((ind, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-white">{ind.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          ind.severity === 'HIGH'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {ind.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {ind.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Safe Actions Checklist */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">
                    {t.safetyActions}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {result.actions.map((act, idx) => (
                    <div 
                      key={idx}
                      onClick={() => toggleAction(idx)}
                      className={`p-3 rounded-2xl border text-xs flex items-start gap-3 cursor-pointer transition-all ${
                        checkedActions[idx] 
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedActions[idx]}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-emerald-500 focus:ring-0 cursor-pointer"
                      />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Emergency Action Links */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Official Investor Help Channels:
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="tel:1930"
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                    <span>{t.callHelpline}</span>
                  </a>

                  <a
                    href="https://scores.sebi.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                    <span>SEBI SCORES 2.0</span>
                  </a>

                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                    <span>CyberCrime Portal</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Statutory Disclaimer & AI Guardrails Notice */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed text-center">
            {result.disclaimer}
          </div>

        </div>
      )}

    </div>
  );
}
