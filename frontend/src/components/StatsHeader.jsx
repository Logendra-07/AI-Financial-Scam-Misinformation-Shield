import React, { useEffect, useState } from 'react';
import { ShieldAlert, CheckCircle, IndianRupee, ShieldCheck } from 'lucide-react';
import { getStats } from '../services/localAiEngine';

export default function StatsHeader() {
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    // Try fetching from backend if available, otherwise use local data
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {
        // Standalone mode: seamlessly use client stats
        setStats(getStats());
      });
  }, []);

  const formatINR = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      
      {/* Total Scanned */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Checks Processed</p>
          <p className="text-xl font-bold text-white">{stats.total_analyzed.toLocaleString()}</p>
        </div>
      </div>

      {/* High Risk Flagged */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Scams Flagged</p>
          <p className="text-xl font-bold text-rose-400">{stats.high_risk_count.toLocaleString()}</p>
        </div>
      </div>

      {/* Funds Protected */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <IndianRupee className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Estimated Capital Saved</p>
          <p className="text-xl font-bold text-emerald-400">{formatINR(stats.estimated_funds_protected_inr)}</p>
        </div>
      </div>

      {/* Guardrails Intercepted */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">SEBI Guardrail Blocks</p>
          <p className="text-xl font-bold text-sky-400">{stats.advice_blocked_count.toLocaleString()}</p>
        </div>
      </div>

    </div>
  );
}
