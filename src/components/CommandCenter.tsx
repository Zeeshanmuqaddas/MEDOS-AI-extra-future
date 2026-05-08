import { useState, useEffect } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Brain, ArrowUpRight, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// --- Mock Data ---
const performanceData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  load: Math.floor(Math.random() * 30) + 40,
  confidence: Math.floor(Math.random() * 10) + 90,
}));

const recentActivity = [
  { id: 1, agent: 'ICU-AGENT', action: 'Ventilator settings optimized', patient: 'PT-894', time: 'Just now', type: 'info' },
  { id: 2, agent: 'CARDIOLOGY-AGENT', action: 'Arrhythmia detected', patient: 'PT-102', time: '2m ago', type: 'alert' },
  { id: 3, agent: 'SUPERVISOR', action: 'Transfer approved ICU -> Ward', patient: 'PT-442', time: '4m ago', type: 'success' },
  { id: 4, agent: 'GENOMICS-AGENT', action: 'Pharmacogenomic alert: Plavix resistance', patient: 'PT-991', time: '12m ago', type: 'alert' },
];

const patientStream = [
  { id: 'PT-894', name: 'John Doe', age: 65, status: 'CRITICAL', riskScore: 89, location: 'ICU-A Bed 04', primary: 'Sepsis' },
  { id: 'PT-102', name: 'Jane Smith', age: 42, status: 'STABLE', riskScore: 24, location: 'Cardio Ward', primary: 'Post-MI' },
  { id: 'PT-551', name: 'M. Johnson', age: 78, status: 'WARNING', riskScore: 65, location: 'ED Bay 3', primary: 'Stroke Protocol' },
  { id: 'PT-991', name: 'A. Davis', age: 31, status: 'STABLE', riskScore: 12, location: 'Oncology', primary: 'Chemo Regimen' },
];

export function CommandCenter() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="SYSTEM INTELLIGENCE" value="99.4%" sub="Diagnostic Confidence" icon={<Brain className="w-5 h-5 text-neon-cyan" />} glow="cyan" />
        <StatCard title="ACTIVE AGENTS" value="142" sub="Across 12 Hospitals" icon={<NetworkIcon className="w-5 h-5 text-emerald-main" />} glow="emerald" />
        <StatCard title="CRITICAL PREDICTIONS" value="28" sub="Deterioration Risks < 4h" icon={<Activity className="w-5 h-5 text-amber-main" />} glow="none" />
        <StatCard title="CODE BLUE ALERTS" value="2" sub="Automatic Escalations" icon={<AlertTriangle className="w-5 h-5 text-crimson-main" />} glow="crimson" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Patient Stream & Swarm Log */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="panel-container p-5 border-t-2 border-t-neon-cyan">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono text-white flex items-center"><Activity className="w-4 h-4 mr-2 text-neon-cyan" /> LIVE PATIENT STREAM</h3>
              <span className="text-[10px] bg-neon-cyan/20 text-neon-cyan px-2 py-0.5 rounded font-mono">LIVE</span>
            </div>
            
            <div className="space-y-3">
              {patientStream.map(pt => (
                <div key={pt.id} className="bg-white/5 border border-white/10 rounded p-3 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-mono text-sm text-white group-hover:text-neon-cyan transition-colors">{pt.id} // {pt.name}</div>
                    <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                      pt.status === 'CRITICAL' ? 'bg-crimson-main/20 text-crimson-main border border-crimson-main/30' : 
                      pt.status === 'WARNING' ? 'bg-amber-main/20 text-amber-main border border-amber-main/30' : 
                      'bg-emerald-main/20 text-emerald-main border border-emerald-main/30'
                    }`}>
                      {pt.status}
                    </div>
                  </div>
                  <div className="flex justify-between items-end text-xs text-slate-text">
                    <div>
                      <div>{pt.location}</div>
                      <div className="text-white/70 mt-0.5">{pt.primary}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] opacity-70">AI RISK SCORE</div>
                      <div className={`font-mono font-bold text-lg leading-none mt-1 ${pt.riskScore > 80 ? 'text-crimson-main' : pt.riskScore > 50 ? 'text-amber-main' : 'text-emerald-main'}`}>
                        {pt.riskScore}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-container p-5">
             <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono text-white flex items-center"><TerminalIcon className="w-4 h-4 mr-2 text-slate-light" /> A2A SWARM LOG</h3>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map(act => (
                <div key={act.id} className="flex gap-3 text-sm">
                  <div className="mt-1">
                    {act.type === 'alert' && <div className="w-2 h-2 rounded-full bg-crimson-main neon-glow-crimson" />}
                    {act.type === 'info' && <div className="w-2 h-2 rounded-full bg-neon-cyan neon-glow-cyan" />}
                    {act.type === 'success' && <div className="w-2 h-2 rounded-full bg-emerald-main neon-glow-emerald" />}
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-2">
                       <span className={`font-mono text-xs font-bold ${
                        act.type === 'alert' ? 'text-crimson-main' : 
                        act.type === 'info' ? 'text-neon-cyan' : 'text-emerald-main'
                       }`}>[{act.agent}]</span>
                       <span className="text-[10px] text-slate-text">{act.time}</span>
                    </div>
                    <div className="text-white/80 mt-0.5 text-xs">
                      {act.action}
                    </div>
                    <div className="text-[10px] text-slate-text font-mono mt-1">TARGET: {act.patient}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Analytics & Reasoning */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="panel-container p-5 border-t-2 border-t-emerald-main/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-mono text-white mb-1">SYSTEM PREDICTIVE CONFIDENCE</h3>
                <p className="text-xs text-slate-text">Aggregated AI diagnostic certainty vs computational load</p>
              </div>
              <div className="flex gap-4 font-mono text-[10px]">
                <div className="flex items-center"><div className="w-2 h-2 bg-neon-cyan mr-2"></div> Confidence</div>
                <div className="flex items-center"><div className="w-2 h-2 bg-emerald-main/30 border border-emerald-main mr-2"></div> Load</div>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-neon-cyan)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-neon-cyan)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-emerald-main)" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="var(--color-emerald-main)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0c', borderColor: '#1f2937', color: '#fff', fontFamily: 'monospace', fontSize: '12px' }}
                    itemStyle={{ color: '#00f0ff' }}
                  />
                  <Area type="monotone" dataKey="confidence" stroke="var(--color-neon-cyan)" strokeWidth={2} fillOpacity={1} fill="url(#colorConfidence)" />
                  <Area type="monotone" dataKey="load" stroke="var(--color-emerald-main)" strokeWidth={1} fillOpacity={1} fill="url(#colorLoad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="panel-container p-5 border border-amber-main/20">
               <h3 className="text-sm font-mono text-amber-main flex items-center mb-4"><ShieldAlert className="w-4 h-4 mr-2" /> OUTBREAK DETECTOR</h3>
               <div className="space-y-4">
                 <div className="bg-amber-main/5 border border-amber-main/10 p-3 rounded">
                   <div className="text-xs text-white font-mono">SECTOR 4: Resp. Anomaly</div>
                   <div className="mt-2 flex items-end justify-between">
                     <span className="text-2xl font-bold text-amber-main">+42%</span>
                     <span className="text-[10px] text-slate-text uppercase">admissions in 24h</span>
                   </div>
                 </div>
                 <div className="text-xs text-slate-text leading-relaxed">
                   AI detected statistically significant deviation in lower respiratory complaints across 3 facilities. <span className="text-amber-main">Epidemiology Agent deployed.</span>
                 </div>
               </div>
             </div>
             
             <div className="panel-container p-5 border border-neon-cyan/20">
               <h3 className="text-sm font-mono text-neon-cyan flex items-center mb-4"><Dna className="w-4 h-4 mr-2" /> GENOMIC PIPELINE</h3>
                <div className="space-y-3">
                  {['Sequence PT-894 Analyzing... 88%', 'PT-102 Pharmacogenomic Match: OK', 'Population Variance Scan: Active'].map((task, i) => (
                    <div key={i} className="flex items-center text-xs text-slate-text font-mono">
                      <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full mr-3 animate-pulse"></div>
                      {task}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-medos-border/50 text-[10px] text-emerald-main font-mono text-right">
                  ALL CLUSTERS OPERATIONAL
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon, glow }: { title: string, value: string, sub: string, icon: React.ReactNode, glow: string }) {
  return (
    <div className={`panel-container p-4 relative overflow-hidden group`}>
      {glow === 'cyan' && <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />}
      {glow === 'emerald' && <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-main/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />}
      {glow === 'crimson' && <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-main/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />}
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <div className="text-[10px] font-mono text-slate-text mb-1 uppercase opacity-80">{title}</div>
          <div className="text-3xl font-bold text-white font-mono tracking-tight">{value}</div>
          <div className="text-[10px] text-slate-text mt-1">{sub}</div>
        </div>
        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
      </div>
    </div>
  )
}

function NetworkIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
}

function TerminalIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
}

function ShieldAlert(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
}

function Dna(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/><path d="m14 8-1.5-1.5"/><path d="m7 18 2.5 2.5"/><path d="m3.5 14.5.5.5"/><path d="m20 9 .5.5"/><path d="m6.5 12.5 1 1"/><path d="m16.5 10.5 1 1"/><path d="m10 16 1.5 1.5"/></svg>
}
