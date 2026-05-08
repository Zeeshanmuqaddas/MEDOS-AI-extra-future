import { Bell, Search, Server, Wifi } from 'lucide-react';

export function Topbar() {
  const time = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return (
    <header className="h-14 border-b border-medos-border bg-medos-panel/80 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0 sticky top-0">
      <div className="flex items-center space-x-6 text-xs font-mono">
        <div className="flex items-center space-x-2 text-emerald-main">
          <Wifi className="w-4 h-4" />
          <span>GLOBAL MESH: ONLINE</span>
        </div>
        <div className="flex items-center space-x-2 text-neon-cyan">
          <Server className="w-4 h-4" />
          <span>MCP SERVERS: 14/14</span>
        </div>
        <div className="text-slate-text hidden sm:block">
          FHIR FEDERATION LOG: SYNCED
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="text-xs font-mono text-neon-cyan/70 border border-neon-cyan/20 px-3 py-1 rounded bg-neon-cyan/5 hidden md:block">
          {time}
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-slate-text hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-crimson-main rounded-full neon-glow-crimson" />
          </button>
          
          <div className="w-8 h-8 rounded-full bg-medos-bg border border-medos-border flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-neon-cyan/20 to-emerald-main/20" />
          </div>
        </div>
      </div>
    </header>
  );
}
