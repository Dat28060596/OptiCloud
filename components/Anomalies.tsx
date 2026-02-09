import React, { useState } from 'react';
import { Anomaly } from '../types';
import { AlertTriangle, Check, MessageSquare, Search, ChevronDown, Activity, ExternalLink } from 'lucide-react';
import { analyzeAnomaly } from '../services/geminiService';

interface AnomaliesProps {
  anomalies: Anomaly[];
  onDismissAnomaly: (id: string) => void;
}

const Anomalies: React.FC<AnomaliesProps> = ({ anomalies, onDismissAnomaly }) => {
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [ticketStatus, setTicketStatus] = useState<'idle' | 'creating' | 'created'>('idle');

  const handleAnalyze = async (anomaly: Anomaly) => {
    if (selectedAnomaly === anomaly.id && analysis) return; 
    
    setSelectedAnomaly(anomaly.id);
    setTicketStatus('idle'); // Reset ticket status for new selection
    setAnalyzing(true);
    setAnalysis('');
    
    const result = await analyzeAnomaly(anomaly);
    setAnalysis(result);
    setAnalyzing(false);
  };

  const handleCreateTicket = () => {
    setTicketStatus('creating');
    // Simulate API call to Jira
    setTimeout(() => {
      setTicketStatus('created');
    }, 1500);
  };

  const handleDismiss = () => {
    if (selectedAnomaly) {
      onDismissAnomaly(selectedAnomaly);
      setSelectedAnomaly(null);
      setAnalysis('');
      setTicketStatus('idle');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Cost Anomalies</h2>
          <p className="text-slate-500">Unusual spending patterns detected by AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h3 className="font-semibold text-slate-700">Detected Spikes</h3>
             <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{anomalies.length} Critical</span>
          </div>
          <div className="divide-y divide-slate-100">
            {anomalies.map((anomaly) => (
              <div 
                key={anomaly.id} 
                className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors border-l-4 ${selectedAnomaly === anomaly.id ? 'bg-indigo-50 border-indigo-500' : 'border-transparent'}`}
                onClick={() => handleAnalyze(anomaly)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-mono text-slate-400">{anomaly.date}</span>
                    <h4 className="font-medium text-slate-900">{anomaly.service}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-bold">+${anomaly.costSpike}</div>
                    <div className="text-xs text-red-500 bg-red-50 px-1.5 rounded">+{anomaly.percentageChange}%</div>
                  </div>
                </div>
                <div className="flex items-center text-xs text-slate-500 space-x-3">
                  <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{anomaly.provider}</span>
                  <span className={`flex items-center ${anomaly.status === 'Detected' ? 'text-amber-600' : 'text-slate-500'}`}>
                    <AlertTriangle size={12} className="mr-1" /> {anomaly.status}
                  </span>
                </div>
              </div>
            ))}
            {anomalies.length === 0 && (
               <div className="p-8 text-center text-slate-500">
                 No active anomalies detected.
               </div>
            )}
          </div>
        </div>

        {/* Detail / Analysis Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
          {selectedAnomaly ? (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <SparklesIcon className="text-indigo-500 mr-2" />
                  AI Root Cause Analysis
                </h3>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                 {analyzing ? (
                   <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                     <Activity className="animate-spin text-indigo-500" size={32} />
                     <p>Analyzing billing logs & usage metrics...</p>
                   </div>
                 ) : (
                   <div className="prose prose-sm prose-slate max-w-none">
                     <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                        <p className="text-slate-700 leading-relaxed whitespace-pre-line">{analysis}</p>
                     </div>
                     
                     <h4 className="font-semibold text-slate-800 mt-6 mb-3">Suggested Actions</h4>
                     <ul className="space-y-2">
                       <li className="flex items-start">
                         <div className="mt-0.5 mr-2 text-emerald-500"><Check size={16} /></div>
                         <span className="text-slate-600">Check recent deployments to <span className="font-mono bg-slate-100 px-1">us-east-1</span> region.</span>
                       </li>
                       <li className="flex items-start">
                         <div className="mt-0.5 mr-2 text-emerald-500"><Check size={16} /></div>
                         <span className="text-slate-600">Review Lambda concurrency limits configuration.</span>
                       </li>
                     </ul>
                   </div>
                 )}
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
                 <button 
                   onClick={handleDismiss}
                   className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                 >
                   Dismiss
                 </button>
                 <button 
                   onClick={handleCreateTicket}
                   disabled={ticketStatus !== 'idle'}
                   className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-all flex items-center min-w-[150px] justify-center
                     ${ticketStatus === 'created' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}
                     ${ticketStatus === 'creating' ? 'opacity-75 cursor-wait' : ''}
                   `}
                 >
                    {ticketStatus === 'creating' && <Activity className="animate-spin mr-2" size={16} />}
                    {ticketStatus === 'created' && <Check className="mr-2" size={16} />}
                    {ticketStatus === 'idle' && 'Create Jira Ticket'}
                    {ticketStatus === 'creating' && 'Creating...'}
                    {ticketStatus === 'created' && 'Ticket Created'}
                 </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p>Select an anomaly to view AI analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper icon component locally to avoid cluttering imports
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export default Anomalies;