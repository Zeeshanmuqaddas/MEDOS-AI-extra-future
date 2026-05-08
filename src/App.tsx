/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { CommandCenter } from '@/components/CommandCenter';
import { PatientDigitalTwins } from '@/components/PatientDigitalTwins';
import { AgentSwarm } from '@/components/AgentSwarm';
import { ClinicalReasoning } from '@/components/ClinicalReasoning';
import { RadiologyEngine } from '@/components/RadiologyEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('command-center');

  return (
    <div className="flex h-screen w-full bg-medos-bg font-sans overflow-hidden">
      <div className="absolute inset-0 subgrid opacity-30 pointer-events-none" />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col h-full relative z-0">
        <Topbar />
        
        <main className="flex-1 overflow-auto p-6 relative">
          {activeTab === 'command-center' && <CommandCenter />}
          {activeTab === 'patient-twins' && <PatientDigitalTwins />}
          {activeTab === 'agent-swarm' && <AgentSwarm />}
          {activeTab === 'radiology-engine' && <RadiologyEngine />}
          {activeTab === 'clinical-reasoning' && <ClinicalReasoning />}
          {activeTab !== 'command-center' && activeTab !== 'patient-twins' && activeTab !== 'agent-swarm' && activeTab !== 'clinical-reasoning' && activeTab !== 'radiology-engine' && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-text font-mono text-sm border border-dashed border-medos-border rounded-lg h-[80vh]">
              <div className="w-12 h-12 border-2 border-neon-cyan/50 border-t-neon-cyan rounded-full animate-spin mb-4" />
              <div>INITIALIZING SUBSYSTEM: {activeTab.toUpperCase()}...</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
