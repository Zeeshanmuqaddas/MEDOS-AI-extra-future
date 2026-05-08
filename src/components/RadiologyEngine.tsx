import { useState, useEffect } from 'react';
import { Scan, AlertTriangle, Crosshair, Image as ImageIcon, Zap, Activity, ShieldAlert, Thermometer, BrainCircuit, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock scans to flip through
const scans = [
  { id: 'SC-001', type: 'CT Brain (Non-Contrast)', patient: 'PT-894', time: '14:22:00', status: 'CRITICAL', findings: ['Subarachnoid Hemorrhage', 'Midline Shift 4mm'], aiConfidence: 98.4 },
  { id: 'SC-002', type: 'Chest X-Ray', patient: 'PT-102', time: '14:15:00', status: 'WARNING', findings: ['Bilateral Infiltrates', 'Pleural Effusion'], aiConfidence: 92.1 },
  { id: 'SC-003', type: 'MRI Spinal Cord', patient: 'PT-551', time: '13:50:00', status: 'STABLE', findings: ['L4-L5 Disc Herniation', 'No cord compression'], aiConfidence: 99.9 },
  { id: 'SC-004', type: 'CT Pulmonary Angiogram', patient: 'PT-991', time: '13:10:00', status: 'WARNING', findings: ['Segmental Pulmonary Embolism'], aiConfidence: 96.5 },
];

export function RadiologyEngine() {
  const [activeScan, setActiveScan] = useState(scans[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [annotationsVisible, setAnnotationsVisible] = useState(false);

  useEffect(() => {
    // Reset scan state when switching scans
    setIsScanning(true);
    setAnnotationsVisible(false);
    
    const scanTimer = setTimeout(() => {
      setIsScanning(false);
      setAnnotationsVisible(true);
    }, 2000);

    return () => clearTimeout(scanTimer);
  }, [activeScan]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-mono text-white flex items-center"><Scan className="w-5 h-5 mr-3 text-neon-cyan" /> RADIOLOGY VISION CORE</h2>
        <div className="flex space-x-2">
          <div className="font-mono text-xs text-neon-cyan px-3 py-1 border border-neon-cyan/30 bg-neon-cyan/10 rounded flex items-center">
            <Zap className="w-3 h-3 mr-2" />
            AI MODEL: MEDOS-VISION-X
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left Column: Modality Queue */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <div className="panel-container p-4 flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-mono text-slate-text mb-4">INCOMING SCAN QUEUE</h3>
            <div className="space-y-3">
              {scans.map((scan) => (
                <button
                  key={scan.id}
                  onClick={() => setActiveScan(scan)}
                  className={`w-full text-left p-3 rounded border transition-all ${
                    activeScan.id === scan.id
                      ? 'bg-neon-cyan/10 border-neon-cyan text-white'
                      : 'bg-medos-bg border-medos-border text-slate-text hover:border-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-mono text-xs font-bold">{scan.id}</div>
                    <div className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      scan.status === 'CRITICAL' ? 'bg-crimson-main/20 text-crimson-main' :
                      scan.status === 'WARNING' ? 'bg-amber-main/20 text-amber-main' :
                      'bg-emerald-main/20 text-emerald-main'
                    }`}>
                      {scan.status}
                    </div>
                  </div>
                  <div className="text-xs font-sans mb-1">{scan.type}</div>
                  <div className="text-[10px] font-mono opacity-70">PT: {scan.patient} // {scan.time}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="panel-container p-4">
             <div className="flex items-center space-x-3 text-xs font-mono">
                <SpinnerIcon className="w-5 h-5 text-emerald-main animate-spin" />
                <div>
                  <div className="text-white">VISION SWARM ACTIVE</div>
                  <div className="text-emerald-main text-[10px] mt-0.5">PROCESSING 4.2M VOXELS/SEC</div>
                </div>
             </div>
          </div>
        </div>

        {/* Center/Right: Viewer & Analysis */}
        <div className="lg:col-span-9 grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Diagnostic Viewer */}
          <div className="xl:col-span-2 panel-container relative overflow-hidden flex flex-col bg-black">
            <div className="p-3 border-b border-medos-border bg-medos-panel/80 flex justify-between items-center z-20 absolute top-0 w-full">
              <div className="flex items-center space-x-3">
                <Crosshair className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs font-mono text-white tracking-widest uppercase">{activeScan.type}</span>
              </div>
              <div className="flex space-x-4 text-[10px] font-mono">
                <div className="text-slate-text">H: 1048 W: 1048</div>
                <div className="text-emerald-main">LOSSY-COMPRESSION: OFF</div>
              </div>
            </div>

            <div className="flex-1 w-full bg-black relative flex items-center justify-center overflow-hidden mt-12">
               {/* Abstract Grid background */}
               <div className="absolute inset-0" style={{
                 backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                 backgroundSize: '40px 40px',
                 backgroundPosition: 'center center'
               }} />

               {/* Mock Scanner Visual */}
               <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/10 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black select-none pointer-events-none">
                 {/* Internal organic/tech shape representation */}
                 <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                   <path d="M 20 50 Q 50 10 80 50 T 80 80 Q 50 100 20 80 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                   <path d="M 30 50 Q 50 20 70 50 T 70 70 Q 50 90 30 70 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                   <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
                 </svg>

                 {/* Scanning Bar Animation */}
                 <AnimatePresence>
                   {isScanning && (
                     <motion.div 
                       initial={{ top: 0, opacity: 0 }}
                       animate={{ top: ['0%', '100%', '0%'], opacity: 0.5 }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                       className="absolute w-full h-[2px] bg-neon-cyan neon-glow-cyan z-10"
                     />
                   )}
                 </AnimatePresence>

                 {/* Simulated Annotations */}
                 <AnimatePresence>
                   {!isScanning && annotationsVisible && activeScan.status !== 'STABLE' && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className={`absolute top-1/4 right-1/3 w-16 h-16 border-2 ${activeScan.status === 'CRITICAL' ? 'border-crimson-main neon-glow-crimson' : 'border-amber-main bg-amber-main/10'} bg-crimson-main/10 z-20 border-dashed`}
                     >
                       <div className={`absolute -right-24 top-0 text-[10px] font-mono px-2 py-1 bg-medos-panel border ${activeScan.status === 'CRITICAL' ? 'border-crimson-main text-crimson-main' : 'border-amber-main text-amber-main'}`}>
                         ANOMALY DETECTED
                         <div className="w-8 h-[1px] bg-current absolute top-1/2 -left-8" />
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
                 
               </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between z-20">
               <div className="bg-medos-panel/80 px-2 py-1 rounded text-[10px] font-mono text-slate-text border border-medos-border backdrop-blur">SLICE: 84/320</div>
               <div className="bg-medos-panel/80 px-2 py-1 rounded text-[10px] font-mono text-slate-text border border-medos-border backdrop-blur">THICKNESS: 1.25mm</div>
            </div>
          </div>

          {/* AI Analysis Panel */}
          <div className="flex flex-col space-y-4">
            
            <div className={`panel-container p-5 border-t-2 ${activeScan.status === 'CRITICAL' ? 'border-t-crimson-main bg-crimson-main/5' : activeScan.status === 'WARNING' ? 'border-t-amber-main bg-amber-main/5' : 'border-t-emerald-main'}`}>
              <div className="flex items-center space-x-2 mb-4">
                <BrainCircuit className={`w-5 h-5 ${activeScan.status === 'CRITICAL' ? 'text-crimson-main' : activeScan.status === 'WARNING' ? 'text-amber-main' : 'text-emerald-main'}`} />
                <h3 className="text-sm font-mono text-white">AI DIAGNOSTIC REPORT</h3>
              </div>
              
              {!annotationsVisible ? (
                <div className="flex flex-col items-center justify-center p-6 space-y-4 text-slate-text">
                  <div className="animate-pulse flex space-x-2">
                    <div className="w-2 h-2 bg-slate-text rounded-full" />
                    <div className="w-2 h-2 bg-slate-text rounded-full" style={{ animationDelay: '200ms' }} />
                    <div className="w-2 h-2 bg-slate-text rounded-full" style={{ animationDelay: '400ms' }} />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-center">Neural weights mapping...<br/>Segmenting 3D volume</div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-slate-text uppercase">Primary Findings</div>
                    {activeScan.findings.map((f, i) => (
                      <div key={i} className={`text-sm font-bold ${activeScan.status === 'CRITICAL' ? 'text-crimson-main' : activeScan.status === 'WARNING' ? 'text-amber-main' : 'text-white'}`}>
                        &gt; {f}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-slate-text uppercase mb-1">AI Confidence</div>
                      <div className="text-xl font-mono text-emerald-main">{activeScan.aiConfidence}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-text uppercase mb-1">Volumetric Size</div>
                      <div className="text-xl font-mono text-white">{activeScan.status === 'STABLE' ? 'N/A' : '14.2cc'}</div>
                    </div>
                  </div>

                  {activeScan.status === 'CRITICAL' && (
                     <div className="mt-4 p-3 bg-crimson-main/20 border border-crimson-main/40 rounded">
                        <div className="flex items-start space-x-2">
                          <ShieldAlert className="w-4 h-4 text-crimson-main shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-mono font-bold text-crimson-main mb-1">CRITICAL ESCALATION</div>
                            <div className="text-[10px] text-white/80 font-mono">
                              Radiology Agent autonomously alerted neurosurgery on-call. 
                              STAT intervention pathway initialized.
                            </div>
                          </div>
                        </div>
                     </div>
                  )}
                </motion.div>
              )}
            </div>

            <div className="panel-container p-5 flex-1 relative overflow-hidden">
               <h3 className="text-xs font-mono text-slate-text mb-4">SEGMENTATION MAP</h3>
               
               <div className="space-y-3 relative z-10">
                 <SegmentationBar label="Gray Matter" value={78} />
                 <SegmentationBar label="White Matter" value={82} />
                 <SegmentationBar label="CSF Ventricles" value={activeScan.status === 'CRITICAL' ? 30 : 65} alert={activeScan.status === 'CRITICAL'} />
                 <SegmentationBar label="Vascular Flow" value={activeScan.status === 'CRITICAL' ? 42 : 95} alert={activeScan.status === 'CRITICAL'} />
               </div>

               <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                 <BrainCircuit className="w-48 h-48" />
               </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

function SegmentationBar({ label, value, alert }: { label: string, value: number, alert?: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-[10px] font-mono mb-1">
        <span className="text-white">{label}</span>
        <span className={alert ? 'text-crimson-main' : 'text-slate-text'}>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-medos-bg rounded overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: Math.random() * 0.5 }}
          className={`h-full ${alert ? 'bg-crimson-main' : 'bg-neon-cyan'}`}
        />
      </div>
    </div>
  )
}

function SpinnerIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
}
