import { Activity, BrainCircuit, Dna, FileBarChart, Network, RadioTower, ShieldAlert, Stethoscope, Scan } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'command-center', label: 'Command Center', icon: Activity },
  { id: 'patient-twins', label: 'Patient Digital Twins', icon: Dna },
  { id: 'icu-telemetry', label: 'ICU Telemetry', icon: HeartPulse },
  { id: 'radiology-engine', label: 'AI Radiology', icon: Scan },
  { id: 'agent-swarm', label: 'Agent Swarm Intel', icon: Network },
  { id: 'clinical-reasoning', label: 'Clinical Reasoning', icon: BrainCircuit },
  { id: 'outbreak-ops', label: 'Outbreak Ops', icon: RadioTower },
];

function HeartPulse(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  );
}


export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-medos-border bg-medos-panel flex flex-col h-full z-10 shrink-0">
      <div className="p-6 border-b border-medos-border/50 flex items-center space-x-3">
        <div className="relative">
          <Stethoscope className="w-8 h-8 text-neon-cyan" />
          <div className="absolute inset-0 bg-neon-cyan blur-md opacity-30 mt-1" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wider font-mono">MEDOS<span className="text-neon-cyan">AI</span></h1>
          <div className="text-[10px] text-neon-cyan uppercase tracking-widest font-mono mt-0.5 opacity-80">
            Node: ATHENA-9 // OK
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        <div className="text-xs font-mono text-slate-text/50 uppercase tracking-widest mb-4 px-3">Network Subsystems</div>
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-all duration-200 text-left group",
              activeTab === item.id 
                ? "bg-neon-cyan/10 text-neon-cyan border-l-2 border-neon-cyan" 
                : "text-slate-text hover:bg-white/5 hover:text-slate-light border-l-2 border-transparent"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-neon-cyan" : "text-slate-text group-hover:text-slate-light")} />
            <span className="font-medium text-sm font-mono tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-medos-border/50">
        <div className="bg-crimson-main/10 border border-crimson-main/30 rounded p-3 flex items-start space-x-3">
          <ShieldAlert className="w-5 h-5 text-crimson-main shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono font-bold text-crimson-main">SYSTEM ALERTS: 2</div>
            <div className="text-[10px] font-mono text-slate-text mt-1 space-y-1">
              <div>[P1] ICU-A Bed 04: Sepsis Risk 89%</div>
              <div>[P2] ED Demand Exceeds Capacity</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
