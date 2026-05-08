import { useState } from 'react';
import { Activity, Brain, HeartPulse, Lungs, User, Syringe, ActivitySquare } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const sepsisSimData = Array.from({ length: 12 }).map((_, i) => ({
  time: `T+${i}h`,
  current: Math.min(100, Math.max(0, 40 + (i * 8) + Math.random() * 10 - 5)),
  pathwayA: Math.min(100, Math.max(0, 40 + (i * 2) - Math.random() * 5)), // Vasopressor pathway
  pathwayB: Math.min(100, Math.max(0, 40 + (i * 12))), // No intervention
}));

export function PatientDigitalTwins() {
  const [activeSim, setActiveSim] = useState('sepsis');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-mono text-white flex items-center"><User className="w-5 h-5 mr-3 text-neon-cyan" /> DIGITAL TWIN SIMULATOR</h2>
        <div className="font-mono text-xs text-emerald-main px-3 py-1 border border-emerald-main/30 bg-emerald-main/10 rounded">SUBJECT: PT-894 // JOHN DOE</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Col: Twin Vitals & Body */}
        <div className="lg:col-span-4 panel-container p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-mono text-white">REAL-TIME TELEMETRY</h3>
            <span className="w-2 h-2 rounded-full bg-crimson-main animate-pulse neon-glow-crimson" />
          </div>

          {/* Abstract Body Rep */}
          <div className="flex-1 border border-medos-border/50 rounded flex items-center justify-center relative bg-medos-bg/50 mb-6 overflow-hidden">
            <div className="absolute inset-0 subgrid opacity-10 pointer-events-none" />
            
            {/* Very abstract techy visual instead of real body */}
            <div className="relative w-48 h-64 flex flex-col items-center justify-between py-4">
               {/* Head/Brain */}
               <div className="w-16 h-16 border-2 border-emerald-main rounded-full flex items-center justify-center relative z-10 bg-medos-panel">
                 <Brain className="w-6 h-6 text-emerald-main" />
               </div>
               
               {/* Heart/Chest */}
               <div className="w-24 h-24 border-2 border-crimson-main relative z-10 flex items-center justify-center bg-medos-panel neon-glow-crimson mt-4 transform rotate-45">
                 <div className="transform -rotate-45">
                   <Activity className="w-8 h-8 text-crimson-main" />
                 </div>
                 {/* Connections */}
                 <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-neon-cyan/50 transform -translate-x-1/2 -rotate-45" />
                 <div className="absolute -bottom-16 left-1/2 w-0.5 h-16 bg-neon-cyan/50 transform -translate-x-1/2 -rotate-45" />
               </div>

               {/* Add labels */}
               <div className="absolute top-8 -right-8 text-[10px] font-mono text-emerald-main border-b border-emerald-main/30 pb-0.5">NEURO: STABLE</div>
               <div className="absolute top-1/2 -left-12 text-[10px] font-mono text-crimson-main border-b border-crimson-main/30 pb-0.5">CARDIO: STRESS</div>
               <div className="absolute bottom-10 -right-4 text-[10px] font-mono text-amber-main border-b border-amber-main/30 pb-0.5">RENAL: COMP.</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <VitalBox label="HR" value="128" unit="bpm" state="alert" />
            <VitalBox label="BP" value="88/54" unit="mmHg" state="alert" />
            <VitalBox label="SPO2" value="94" unit="%" state="warning" />
            <VitalBox label="LACTATE" value="4.2" unit="mmol/L" state="alert" />
          </div>
        </div>

        {/* Right Col: Simulations & AI Reasoning */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          
          <div className="panel-container p-5 border-t-2 border-t-amber-main">
            <h3 className="text-sm font-mono text-white mb-4">PREDICTIVE DETERIORATION CURVE</h3>
            
            <div className="flex space-x-2 mb-6">
              <button 
                onClick={() => setActiveSim('sepsis')}
                className={`px-3 py-1.5 text-xs font-mono rounded ${activeSim === 'sepsis' ? 'bg-amber-main/20 text-amber-main border border-amber-main/30' : 'bg-medos-bg text-slate-text border border-medos-border'}`}
              >
                Sepsis Escalation
              </button>
              <button 
                onClick={() => setActiveSim('cardiac')}
                className={`px-3 py-1.5 text-xs font-mono rounded ${activeSim === 'cardiac' ? 'bg-amber-main/20 text-amber-main border border-amber-main/30' : 'bg-medos-bg text-slate-text border border-medos-border'}`}
              >
                Cardiac Arrest Risk
              </button>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sepsisSimData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0c', borderColor: '#1f2937', color: '#fff', fontFamily: 'monospace', fontSize: '12px' }}
                  />
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-crimson-main)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-crimson-main)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  
                  {/* Current Trajectory */}
                  <Area type="monotone" dataKey="pathwayB" stroke="var(--color-slate-text)" strokeDasharray="5 5" strokeWidth={1} fillOpacity={0} name="No Intervention" />
                  
                  {/* AI Recommended */}
                  <Area type="monotone" dataKey="pathwayA" stroke="var(--color-emerald-main)" strokeWidth={2} fillOpacity={0} name="AI: Vasopressor Pathway" />
                  
                  <Area type="monotone" dataKey="current" stroke="var(--color-crimson-main)" strokeWidth={2} fillOpacity={1} fill="url(#colorCurrent)" name="Current Projected" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
             <div className="mt-4 flex items-start space-x-3 bg-neon-cyan/5 border border-neon-cyan/20 p-3 rounded">
               <Brain className="w-5 h-5 text-neon-cyan shrink-0" />
               <div>
                 <div className="text-xs font-mono font-bold text-neon-cyan mb-1">AI CLINICAL INFERENCE</div>
                 <div className="text-xs font-mono text-slate-light leading-relaxed">
                   Current state trajectory indicates 89% probability of septic shock within 4 hours. 
                   <br/><span className="text-emerald-main">Recommendation: Initiate Vasopressor Pathway (Norepinephrine target MAP &gt; 65mmHg). Simulated survival outcome: +68%</span>
                 </div>
               </div>
             </div>
          </div>

          <div className="panel-container p-0 flex-1 overflow-hidden flex flex-col border border-medos-border">
            <div className="bg-medos-border/30 p-3 border-b border-medos-border flex items-center justify-between">
              <h3 className="text-sm font-mono text-white">AUTONOMOUS MULTI-AGENT REASONING</h3>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto font-mono text-xs max-h-48">
              <ReasoningLog agent="ICU Agent" action="Detected rising lactate (4.2 mmol/L) & hypotension." time="14:02:11" />
              <ReasoningLog agent="Nephrology Agent" action="Noted oliguria. Urine output < 0.5 mL/kg/h for 2h." time="14:02:45" />
              <ReasoningLog agent="Pharmacy Agent" action="Current Abx (Piperacillin/Tazobactam) initiated 3h ago. Pending culture." time="14:03:10" />
              <ReasoningLog agent="Supervisor AI" action="Cross-referencing agents. Synthesizing probability: Sepsis progression confirmed. Alerting intensivist." time="14:03:55" highlight />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function VitalBox({ label, value, unit, state }: { label: string, value: string, unit: string, state: 'normal' | 'warning' | 'alert' }) {
  const isAlert = state === 'alert';
  const isWarn = state === 'warning';
  
  return (
    <div className={`p-3 rounded border ${isAlert ? 'border-crimson-main/30 bg-crimson-main/10' : isWarn ? 'border-amber-main/30 bg-amber-main/10' : 'border-medos-border bg-medos-bg'}`}>
      <div className={`text-[10px] font-mono mb-1 ${isAlert ? 'text-crimson-main' : isWarn ? 'text-amber-main' : 'text-slate-text'}`}>{label}</div>
      <div className="flex items-baseline space-x-1">
        <span className={`text-2xl font-bold font-mono tracking-tight ${isAlert ? 'text-crimson-main' : isWarn ? 'text-amber-main' : 'text-white'}`}>{value}</span>
        <span className="text-[10px] text-slate-text">{unit}</span>
      </div>
    </div>
  )
}

function ReasoningLog({ agent, action, time, highlight }: { agent: string, action: string, time: string, highlight?: boolean }) {
  return (
    <div className={`flex space-x-3 pb-3 border-b border-white/5 last:border-0 last:pb-0 ${highlight ? 'text-neon-cyan' : 'text-slate-light'}`}>
      <div className="text-slate-text w-16 shrink-0">{time}</div>
      <div>
        <span className={highlight ? 'font-bold' : 'text-white font-bold'}>[{agent}]</span> {action}
      </div>
    </div>
  )
}
