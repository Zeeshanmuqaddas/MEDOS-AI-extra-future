import { useState, useEffect } from 'react';
import { Network, Server, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

const agents = [
  { id: 'SUPERVISOR', role: 'Global Arbitrator', status: 'ACTIVE', load: 84 },
  { id: 'ICU-1', role: 'Intensive Care Ops', status: 'ACTIVE', load: 92 },
  { id: 'ER-TRIAGE', role: 'Emergency Routing', status: 'ACTIVE', load: 76 },
  { id: 'CARDIO-PRI', role: 'Cardiology Diagnostics', status: 'STANDBY', load: 12 },
  { id: 'PHARMA-BOT', role: 'Drug Interactions', status: 'ACTIVE', load: 45 },
  { id: 'EPIDEM', role: 'Outbreak Intelligence', status: 'ACTIVE', load: 64 },
];

const trafficLogs = [
  "[SUPERVISOR] -> [ICU-1]: AUTHORIZE BED TRANSFER C-14",
  "[ER-TRIAGE] -> [SUPERVISOR]: ED CAPACITY WARNING (95%)",
  "[PHARMA-BOT] -> [ICU-1]: ALERT: HEPARIN DOSAGE CONFLICT PT-221",
  "[EPIDEM] -> [SUPERVISOR]: LOCALIZED INFLUENZA A ANOMALY DETECTED",
  "[CARDIO-PRI] -> [ER-TRIAGE]: ECG ANALYSIS COMPLETE - STEMI CONFIRMED",
];

export function AgentSwarm() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [trafficLogs[i % trafficLogs.length], ...prev].slice(0, 8));
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-mono text-white flex items-center"><Network className="w-5 h-5 mr-3 text-neon-cyan" /> AGENT SWARM TOPOLOGY</h2>
        <div className="font-mono text-xs text-neon-cyan px-3 py-1 border border-neon-cyan/30 bg-neon-cyan/10 rounded">A2A PROTOCOL: FHIR-MCP SYNCED</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Network Graph Placeholder */}
        <div className="panel-container p-5 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 subgrid opacity-10" />
          
          <div className="relative w-full h-[400px] flex items-center justify-center">
             {/* Center Node (Supervisor) */}
             <motion.div 
               animate={{ boxShadow: ['0 0 10px rgba(0,255,136,0.3)', '0 0 30px rgba(0,255,136,0.6)', '0 0 10px rgba(0,255,136,0.3)'] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="w-24 h-24 rounded-full bg-medos-panel border-2 border-emerald-main absolute z-20 flex flex-col items-center justify-center"
             >
               <Network className="w-8 h-8 text-emerald-main" />
               <div className="text-[9px] font-mono mt-1 text-emerald-main font-bold">SUPERVISOR</div>
             </motion.div>

             {/* Orbiting Nodes */}
             {agents.slice(1).map((agent, index) => {
               const angle = (index / (agents.length - 1)) * Math.PI * 2;
               const radius = 140;
               const x = Math.cos(angle) * radius;
               const y = Math.sin(angle) * radius;
               
               return (
                 <motion.div
                   key={agent.id}
                   initial={{ x: 0, y: 0, opacity: 0 }}
                   animate={{ x, y, opacity: 1 }}
                   transition={{ duration: 1, delay: index * 0.1 }}
                   className={`w-20 h-20 rounded-full border-2 absolute z-10 flex flex-col items-center justify-center bg-medos-panel/80 backdrop-blur ${agent.status === 'ACTIVE' ? 'border-neon-cyan text-neon-cyan' : 'border-slate-text text-slate-text'}`}
                 >
                   <Server className="w-5 h-5 mb-1" />
                   <div className="text-[8px] font-mono font-bold">{agent.id}</div>
                   <div className="text-[7px] font-mono opacity-80 mt-1">{agent.load}% CPU</div>
                   
                   {/* Draw line to center */}
                   <svg className="absolute inset-0 w-0 h-0 pointer-events-none" style={{ overflow: 'visible' }}>
                     <line x1="10" y1="10" x2={-x + 10} y2={-y + 10} stroke={agent.status === 'ACTIVE' ? 'rgba(0, 240, 255, 0.3)' : 'rgba(148, 163, 184, 0.2)'} strokeWidth="2" strokeDasharray="4 4" />
                   </svg>
                 </motion.div>
               )
             })}
          </div>
          
          <div className="absolute bottom-4 right-4 text-xs font-mono text-emerald-main flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-main animate-pulse mr-2" />
            SWARM CONCENSUS REACHED
          </div>
        </div>

        {/* Console / Status */}
        <div className="flex flex-col space-y-6">
          <div className="panel-container p-5 border-t-2 border-t-neon-cyan">
             <h3 className="text-sm font-mono text-white mb-4">A2A COMMUNICATION FIREHOSE</h3>
             <div className="h-48 overflow-hidden relative">
               <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-medos-panel to-transparent z-10" />
               <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-medos-panel to-transparent z-10" />
               
               <div className="space-y-2 font-mono text-xs">
                 {logs.map((log, i) => (
                   <motion.div 
                     key={i + log}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1 - (i * 0.15), x: 0 }}
                     className={`py-1 ${log.includes('WARNING') || log.includes('ALERT') ? 'text-amber-main' : log.includes('CONFIRMED') ? 'text-emerald-main' : 'text-neon-cyan'}`}
                   >
                     <span className="text-slate-text mr-2">{new Date().toISOString().substring(11, 19)}</span>
                     {log}
                   </motion.div>
                 ))}
               </div>
             </div>
          </div>

          <div className="panel-container p-5 flex-1">
             <h3 className="text-sm font-mono text-white mb-4">AGENT DIAGNOSTICS</h3>
             <div className="space-y-3">
               {agents.map(agent => (
                 <div key={agent.id} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
                   <div>
                     <div className="font-mono text-xs text-white font-bold">{agent.id}</div>
                     <div className="text-[10px] text-slate-text">{agent.role}</div>
                   </div>
                   <div className="flex items-center space-x-4">
                     <div className="w-24 h-1.5 bg-medos-bg rounded-full overflow-hidden">
                       <div 
                         className={`h-full ${agent.load > 85 ? 'bg-crimson-main' : agent.load > 60 ? 'bg-amber-main' : 'bg-emerald-main'}`} 
                         style={{ width: `${agent.load}%` }}
                       />
                     </div>
                     <div className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${agent.status === 'ACTIVE' ? 'bg-emerald-main/20 text-emerald-main border-emerald-main/30' : 'bg-slate-800 text-slate-text border-slate-700'}`}>
                       {agent.status}
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
