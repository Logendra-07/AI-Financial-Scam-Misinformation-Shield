import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';
import HistoryPage from './pages/HistoryPage';
import LearnPage from './pages/LearnPage';
import PitchDeck from './pages/PitchDeck';
import JudgeDemoModal from './components/JudgeDemoModal';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [language, setLanguage] = useState('English');
  const [analyzerInitialData, setAnalyzerInitialData] = useState(null);
  const [isJudgeDemoOpen, setIsJudgeDemoOpen] = useState(false);

  const handleSelectDemo = (message, lang) => {
    setLanguage(lang);
    setAnalyzerInitialData({ type: 'text', text: message });
    setActivePage('analyzer');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        language={language}
        setLanguage={setLanguage}
        onOpenJudgeDemo={() => setIsJudgeDemoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activePage === 'dashboard' && (
          <Dashboard
            setActivePage={setActivePage}
            setAnalyzerInitialData={setAnalyzerInitialData}
            language={language}
            onOpenJudgeDemo={() => setIsJudgeDemoOpen(true)}
          />
        )}

        {activePage === 'analyzer' && (
          <Analyzer
            initialData={analyzerInitialData}
            language={language}
            setLanguage={setLanguage}
            onOpenJudgeDemo={() => setIsJudgeDemoOpen(true)}
          />
        )}

        {activePage === 'history' && (
          <HistoryPage
            onSelectCheck={(item) => {
              setAnalyzerInitialData({ type: item.input_type, text: item.snippet });
              setActivePage('analyzer');
            }}
          />
        )}

        {activePage === 'learn' && (
          <LearnPage />
        )}

        {activePage === 'pitch' && (
          <PitchDeck setActivePage={setActivePage} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 NambikkAI — Built for Sangyan Financial Safety & Accessibility Hackathon.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>🛡️ SEBI Compliant Guardrails</span>
            <span>•</span>
            <span>Cyber Helpline: 1930</span>
            <span>•</span>
            <button 
              onClick={() => setActivePage('pitch')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
            >
              Pitch Presentation
            </button>
          </div>
        </div>
      </footer>

      {/* Judge 1-Click Evaluation Demo Modal */}
      <JudgeDemoModal
        isOpen={isJudgeDemoOpen}
        onClose={() => setIsJudgeDemoOpen(false)}
        onSelectDemo={handleSelectDemo}
      />

    </div>
  );
}
