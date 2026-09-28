import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Image as ImageIcon, 
  Mic, 
  Link as LinkIcon, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert,
  Flame,
  ExternalLink
} from 'lucide-react';
import StatsHeader from '../components/StatsHeader';
import { translations } from '../translations';
import { getHistory } from '../services/localAiEngine';

export default function Dashboard({ setActivePage, setAnalyzerInitialData, language, onOpenJudgeDemo }) {
  const t = translations[language] || translations.English;
  const [recentChecks, setRecentChecks] = useState(getHistory().slice(0, 5));

  useEffect(() => {
    // Try backend if running, otherwise use local history
    fetch('/api/history?limit=5')
      .then(res => res.json())
      .then(data => setRecentChecks(data))
      .catch(() => {
        setRecentChecks(getHistory().slice(0, 5));
      });
  }, []);

  const openAnalyzerWithTab = (type, sampleText = "") => {
    setAnalyzerInitialData({ type, text: sampleText });
    setActivePage('analyzer');
  };

  const trendingScams = [
    { title: "Digital Arrest Cyber Extortion", victims: "5,200+ cases", tag: "Critical", color: "text-rose-400 bg-rose-500/10 border-rose-500/30" },
    { title: "Fake Pre-IPO Institutional Quota", victims: "3,800+ cases", tag: "High Alert", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    { title: "Telegram VIP 500% Return Groups", victims: "12,000+ cases", tag: "Widespread", color: "text-rose-400 bg-rose-500/10 border-rose-500/30" },
    { title: "YouTube Video Like & Rating Tasks", victims: "8,500+ cases", tag: "Employment Scam", color: "text-sky-400 bg-sky-500/10 border-sky-500/30" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/50 p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sangyan 2026 Innovation — AI Financial Safety</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.heroTitle}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openAnalyzerWithTab('text')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.checkMessage}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenJudgeDemo}
              className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>{t.demoScenarios}</span>
            </button>
          </div>
        </div>

        {/* Decorative Grid Accent */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* KPI Stats Bar */}
      <StatsHeader />

      {/* 4 Multi-Modal Input Channels */}
      <div className="my-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>What would you like to verify today?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Channel 1: Message / SMS */}
          <div 
            onClick={() => openAnalyzerWithTab('text')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {t.checkMessage}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                WhatsApp, SMS, Telegram group tips, and advisory forwards.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-indigo-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Scan text</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Channel 2: Screenshot OCR */}
          <div 
            onClick={() => openAnalyzerWithTab('image')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {t.uploadScreenshot}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Extracts text from trading profit screenshots, posters, and ads via OCR.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Upload image</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Channel 3: Voice Query */}
          <div 
            onClick={() => openAnalyzerWithTab('voice')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {t.voiceCheck}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Speak directly in Tamil, Hindi, or Telugu. Perfect for Tier-2/3 investors.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Record voice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Channel 4: URL Scanner */}
          <div 
            onClick={() => openAnalyzerWithTab('url')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-3 group-hover:scale-110 transition-transform">
                <LinkIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                {t.urlCheck}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Verify trading websites, APK download links, and crypto platforms.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-sky-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Scan link</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </div>

      {/* Two Column Section: Trending Red Flags in Bharat + Recent Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        
        {/* Left 1 Col: Trending Bharat Scams Radar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h3 className="text-base font-bold text-white">Active Scams Radar</h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
              India 2026
            </span>
          </div>

          <div className="space-y-3">
            {trendingScams.map((sc, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">{sc.title}</h4>
                  <p className="text-[11px] text-slate-400">{sc.victims}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sc.color}`}>
                  {sc.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Source: Indian Cyber Crime Coordination (I4C)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Right 2 Col: Recent Checks Stream */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Recent Community Safety Checks</h3>
            <button
              onClick={() => setActivePage('history')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentChecks.map((item) => (
              <div 
                key={item.id}
                onClick={() => openAnalyzerWithTab(item.input_type, item.snippet)}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5">
                    {item.risk_level === 'HIGH' ? (
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                    ) : item.risk_level === 'MEDIUM' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate group-hover:text-indigo-300 transition-colors">
                      "{item.snippet}"
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span className="capitalize">{item.input_type}</span>
                      <span>•</span>
                      <span>{item.language}</span>
                      <span>•</span>
                      <span>{item.indicator_count} flag(s)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    item.risk_level === 'HIGH' 
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                      : item.risk_level === 'MEDIUM'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {item.risk_level} ({item.risk_score})
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
