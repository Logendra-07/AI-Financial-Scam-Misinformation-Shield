import React from 'react';
import { ShieldCheck, Globe, PlayCircle, PhoneCall, BookOpen, Clock, Activity, Presentation } from 'lucide-react';
import { translations } from '../translations';

export default function Navbar({ activePage, setActivePage, language, setLanguage, onOpenJudgeDemo }) {
  const t = translations[language] || translations.English;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                Nambikk<span className="text-emerald-400">AI</span>
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Sangyan 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActivePage('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activePage === 'dashboard' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            {t.navDashboard}
          </button>

          <button
            onClick={() => setActivePage('analyzer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activePage === 'analyzer' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.navAnalyze}
          </button>

          <button
            onClick={() => setActivePage('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activePage === 'history' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {t.navHistory}
          </button>

          <button
            onClick={() => setActivePage('learn')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activePage === 'learn' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t.navLearn}
          </button>

          <button
            onClick={() => setActivePage('pitch')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activePage === 'pitch' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            {t.navPitch}
          </button>
        </nav>

        {/* Right Action Cluster: Language Switcher + Judge Demo + 1930 Helpline */}
        <div className="flex items-center gap-3">
          
          {/* Quick Judge Demo Trigger */}
          <button
            onClick={onOpenJudgeDemo}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-amber-500/10 cursor-pointer"
            title="Launch 1-Click Demo Scenarios for Judges"
          >
            <PlayCircle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Demo Mode</span>
          </button>

          {/* Regional Language Dropdown */}
          <div className="relative flex items-center bg-slate-800/80 border border-slate-700 rounded-lg px-2 py-1">
            <Globe className="w-3.5 h-3.5 text-indigo-400 mr-1.5" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs text-slate-200 font-medium outline-none cursor-pointer pr-1"
            >
              <option value="English" className="bg-slate-900 text-white">English</option>
              <option value="Tamil" className="bg-slate-900 text-white">தமிழ் (Tamil)</option>
              <option value="Hindi" className="bg-slate-900 text-white">हिन्दी (Hindi)</option>
              <option value="Telugu" className="bg-slate-900 text-white">తెలుగు (Telugu)</option>
            </select>
          </div>

          {/* National Cyber Helpline 1930 */}
          <a
            href="tel:1930"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/20 transition-colors"
            title="National Cyber Crime Reporting Helpline"
          >
            <PhoneCall className="w-3 h-3 text-rose-400" />
            <span>1930</span>
          </a>

        </div>

      </div>
    </header>
  );
}
