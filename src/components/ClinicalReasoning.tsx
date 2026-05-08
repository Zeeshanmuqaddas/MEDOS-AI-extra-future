import { useState } from 'react';
import { Brain, User, Fingerprint, MessageSquareText, FileText, SendHorizontal, Microchip, FileHeart } from 'lucide-react';
import { motion } from 'motion/react';

const initialChat = [
  { sender: 'AI', text: 'MEDOS AI Clinical Co-Pilot initialized. Fetching context for PT-894 (John Doe). Ready for inquiry.', time: '14:05:00', type: 'system' }
];

export function ClinicalReasoning() {
  const [messages, setMessages] = useState(initialChat);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { sender: 'DR. SMITH', text: input, time: new Date().toISOString().substring(11, 19), type: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, { 
        sender: 'MEDOS AI', 
        text: 'Analyzing trajectory: Patient lactate rising from 2.1 to 4.2 in 4h. Hypotension progressing (MAP < 60). Blood culture pending. High probability of septic shock escalation (87%). Recommending aggressive fluid resuscitation and immediate initiation of Vasopressors.', 
        time: new Date().toISOString().substring(11, 19), 
        type: 'ai' 
      }]);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-mono text-white flex items-center"><Brain className="w-5 h-5 mr-3 text-neon-cyan" /> CLINICAL REASONING CORE</h2>
        <div className="flex space-x-2">
          <div className="font-mono text-xs text-amber-main px-3 py-1 border border-amber-main/30 bg-amber-main/10 rounded">MODEL: MEDOS-L-9</div>
          <div className="font-mono text-xs text-neon-cyan px-3 py-1 border border-neon-cyan/30 bg-neon-cyan/10 rounded">CONTEXT: 1.2M TOKENS</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Column: Context / Tools */}
        <div className="lg:col-span-1 flex flex-col space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="panel-container p-4">
             <h3 className="text-xs font-mono text-slate-text mb-3">RETRIEVAL AUGMENTED CONTEXT</h3>
             <div className="space-y-2">
               <div className="bg-white/5 border border-white/10 p-2 rounded text-xs font-mono text-white flex items-center">
                 <FileHeart className="w-4 h-4 mr-2 text-crimson-main" /> PT-894_EHR_RECORD.fhir
               </div>
               <div className="bg-white/5 border border-white/10 p-2 rounded text-xs font-mono text-white flex items-center">
                 <FileText className="w-4 h-4 mr-2 text-emerald-main" /> SURVIVING_SEPSIS_GUIDELINES_V4.pdf
               </div>
               <div className="bg-white/5 border border-white/10 p-2 rounded text-xs font-mono text-white flex items-center">
                 <MessageSquareText className="w-4 h-4 mr-2 text-neon-cyan" /> WARD_NURSING_NOTES_SHIFT_1.txt
               </div>
             </div>
          </div>

          <div className="panel-container p-4">
             <h3 className="text-xs font-mono text-slate-text mb-3">ACTIVE MCP TOOLS</h3>
             <div className="space-y-2">
                {['query_ehr_history()', 'run_predictive_model(sepsis)', 'fetch_latest_labs()'].map(tool => (
                  <div key={tool} className="flex items-center text-[10px] font-mono text-emerald-main">
                    <span className="w-1.5 h-1.5 bg-emerald-main rounded-full mr-2" />
                    {tool}
                  </div>
                ))}
             </div>
          </div>
          
          <div className="panel-container p-4 border-amber-main/30 border">
             <h3 className="text-xs font-mono text-amber-main mb-3">REASONING PROBABILITIES</h3>
             <div className="space-y-3">
               <div>
                 <div className="flex justify-between text-xs font-mono text-white mb-1">
                   <span>Septic Shock</span>
                   <span>87%</span>
                 </div>
                 <div className="h-1 bg-medos-bg rounded overflow-hidden">
                   <div className="h-full bg-crimson-main w-[87%]" />
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-mono text-white mb-1">
                   <span>Cardiogenic Shock</span>
                   <span>12%</span>
                 </div>
                 <div className="h-1 bg-medos-bg rounded overflow-hidden">
                   <div className="h-full bg-amber-main w-[12%]" />
                 </div>
               </div>
             </div>
          </div>

        </div>

        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-2 panel-container flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 subgrid opacity-10 pointer-events-none" />
          
          <div className="p-3 border-b border-medos-border/50 bg-medos-panel/80 backdrop-blur z-10 flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-medos-bg border border-medos-border flex items-center justify-center">
              <Microchip className="w-4 h-4 text-neon-cyan" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">MEDOS COPILOT</div>
              <div className="text-[10px] text-emerald-main font-mono">NEURAL SYNC ACTIVE</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10 custom-scrollbar">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {msg.type === 'ai' && <Brain className="w-3 h-3 text-neon-cyan" />}
                  {msg.type === 'user' && <User className="w-3 h-3 text-emerald-main" />}
                  {msg.type === 'system' && <Fingerprint className="w-3 h-3 text-slate-text" />}
                  <span className="text-[10px] font-mono text-slate-text">{msg.sender} // {msg.time}</span>
                </div>
                
                <div className={`p-3 rounded-lg max-w-[80%] text-sm font-sans leading-relaxed ${
                  msg.type === 'user' ? 'bg-emerald-main/10 border border-emerald-main/20 text-white' :
                  msg.type === 'ai' ? 'bg-neon-cyan/5 border border-neon-cyan/20 text-slate-light neon-glow-cyan' :
                  'bg-white/5 border border-white/10 text-slate-text font-mono text-xs'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {isThinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start">
                 <div className="flex items-center space-x-2 mb-1">
                  <Brain className="w-3 h-3 text-neon-cyan" />
                  <span className="text-[10px] font-mono text-slate-text">MEDOS AI // SYNTHESIZING</span>
                </div>
                <div className="p-3 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20 text-slate-light flex space-x-2 items-center h-10 w-16">
                  <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 border-t border-medos-border/50 bg-medos-panel/80 backdrop-blur z-10">
            <form onSubmit={handleSubmit} className="relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about vitals, request diagnosis, or authorize treatments..."
                className="w-full bg-medos-bg border border-medos-border rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-sans"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isThinking}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded text-neon-cyan hover:bg-neon-cyan/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
