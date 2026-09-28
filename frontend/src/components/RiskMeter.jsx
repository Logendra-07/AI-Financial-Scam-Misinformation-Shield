import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function RiskMeter({ score = 0, level = 'LOW', isAdviceIntercepted = false }) {
  // SVG circular progress calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = "text-emerald-500 stroke-emerald-500";
  let bgGlow = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
  let label = "LOW RISK";
  let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;

  if (isAdviceIntercepted) {
    colorClass = "text-indigo-400 stroke-indigo-400";
    bgGlow = "bg-indigo-500/10 border-indigo-500/30 text-indigo-300";
    label = "SEBI GUARDRAIL";
    icon = <ShieldCheck className="w-5 h-5 text-indigo-400" />;
  } else if (level === 'HIGH' || score >= 50) {
    colorClass = "text-rose-500 stroke-rose-500";
    bgGlow = "bg-rose-500/10 border-rose-500/30 text-rose-400";
    label = "HIGH RISK";
    icon = <ShieldAlert className="w-5 h-5 text-rose-400" />;
  } else if (level === 'MEDIUM' || score >= 20) {
    colorClass = "text-amber-500 stroke-amber-500";
    bgGlow = "bg-amber-500/10 border-amber-500/30 text-amber-400";
    label = "MEDIUM RISK";
    icon = <AlertTriangle className="w-5 h-5 text-amber-400" />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-800"
          />
          {/* Animated Value Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>

        {/* Center Metrics Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {isAdviceIntercepted ? (
            <>
              <ShieldCheck className="w-8 h-8 text-indigo-400 mb-1" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Protected
              </span>
            </>
          ) : (
            <>
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {score}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                / 100 Risk
              </span>
            </>
          )}
        </div>
      </div>

      {/* Risk Badge */}
      <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase ${bgGlow}`}>
        {icon}
        <span>{label}</span>
      </div>
    </div>
  );
}
