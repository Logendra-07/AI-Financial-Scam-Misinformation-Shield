import React, { useEffect, useState } from 'react';
import { 
  Clock, 
  Search, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  MessageSquare, 
  Image as ImageIcon, 
  Mic, 
  Link as LinkIcon,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import RiskMeter from '../components/RiskMeter';
import { getHistory } from '../services/localAiEngine';

export default function HistoryPage({ onSelectCheck }) {
  const [historyItems, setHistoryItems] = useState(getHistory('ALL'));
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = (riskFilter) => {
    setIsLoading(true);
    // Standalone local retrieval:
    const items = getHistory(riskFilter);
    setHistoryItems(items);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHistory(filter);
  }, [filter]);

  const viewDetail = (item) => {
    if (item.full_data) {
      setSelectedDetail(item.full_data);
    } else {
      setSelectedDetail({
        id: item.id,
        risk_level: item.risk_level,
        risk_score: item.risk_score,
        summary: `Identified ${item.indicator_count} risk indicator(s).`,
        indicators: [],
        explanation: "Archived safety check record from previous session.",
        actions: [
          "Verify the organization independently on SEBI portal",
          "Never transfer money through private personal accounts or UPI",
          "Dial 1930 if funds were sent to fraudulent accounts"
        ],
        language: item.language,
        masked_content: item.snippet,
        disclaimer: "Statutory Disclaimer: Educational safety assessment only.",
        is_advice_intercepted: item.risk_level === 'GUARDRAIL_INTERCEPTED'
      });
    }
  };

  const filteredList = historyItems.filter(item => 
    item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.input_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Audit Trail & Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Personal Safety History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review past message checks, risk verdicts, and verified indicator timelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shrink-0">
          {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === f 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f === 'ALL' ? 'All' : f === 'HIGH' ? 'High Risk' : f === 'MEDIUM' ? 'Moderate' : 'Low Risk'}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by keywords, language (Tamil/Hindi), or input type..."
          className="w-full bg-slate-900/60 border border-slate-800 focus:border-indigo-500 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner"
        />
      </div>

      {/* History Items List */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-500 text-xs">
          Loading history audit log...
        </div>
      ) : filteredList.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center">
          <Clock className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">No safety checks found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or run a new check from the Safety Shield.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredList.map((item) => (
            <div
              key={item.id}
              onClick={() => viewDetail(item)}
              className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-pointer group hover:bg-slate-900/90"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800">
                  {item.input_type === 'screenshot' ? (
                    <ImageIcon className="w-5 h-5 text-emerald-400" />
                  ) : item.input_type === 'voice' ? (
                    <Mic className="w-5 h-5 text-amber-400" />
                  ) : item.input_type === 'url' ? (
                    <LinkIcon className="w-5 h-5 text-sky-400" />
                  ) : (
                    <MessageSquare className="w-5 h-5 text-indigo-400" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-200 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                    "{item.snippet}"
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {formatDate(item.created_at)}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{item.input_type}</span>
                    <span>•</span>
                    <span className="text-indigo-400">{item.language}</span>
                    <span>•</span>
                    <span>{item.indicator_count} flag(s)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  item.risk_level === 'HIGH'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : item.risk_level === 'MEDIUM'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}>
                  {item.risk_level} ({item.risk_score})
                </span>

                <button
                  className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Slide-over / Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 relative">
            
            <button
              onClick={() => setSelectedDetail(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <RiskMeter 
                score={selectedDetail.risk_score} 
                level={selectedDetail.risk_level} 
                isAdviceIntercepted={selectedDetail.is_advice_intercepted} 
              />
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Historical Record #{selectedDetail.id}
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {selectedDetail.risk_level} Risk Assessment
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Language: {selectedDetail.language} • {selectedDetail.indicators?.length || 0} Indicator(s) Detected
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Original Checked Message
                </h4>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                  {selectedDetail.masked_content}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Safety Report ({selectedDetail.language})
                </h4>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-200">
                  {selectedDetail.explanation}
                </div>
              </div>

              {selectedDetail.indicators && selectedDetail.indicators.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Detected Red Flags
                  </h4>
                  <div className="space-y-2">
                    {selectedDetail.indicators.map((ind, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{ind.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          ind.severity === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {ind.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Recommended Actions
                </h4>
                <div className="space-y-1.5">
                  {selectedDetail.actions.map((act, i) => (
                    <div key={i} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
