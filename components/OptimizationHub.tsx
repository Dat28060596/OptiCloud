import React, { useState } from 'react';
import { MOCK_OPPORTUNITIES } from '../constants';
import { CheckCircle, AlertCircle, ArrowRight, Zap, Loader2, Check } from 'lucide-react';
import { OptimizationOpportunity } from '../types';

interface OptimizationHubProps {
  opportunities: OptimizationOpportunity[];
}

const OptimizationHub: React.FC<OptimizationHubProps> = ({ opportunities }) => {
  const [fixingId, setFixingId] = useState<string | null>(null);
  const [fixedIds, setFixedIds] = useState<Set<string>>(new Set());

  const handleFix = (id: string) => {
    setFixingId(id);
    // Simulate API call delay
    setTimeout(() => {
      setFixingId(null);
      setFixedIds(prev => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }, 1500);
  };

  // Calculate dynamic stats
  const totalPotential = opportunities.reduce((a, b) => a + b.estimatedSavings, 0);
  const realizedNow = opportunities
    .filter(o => fixedIds.has(o.id))
    .reduce((a, b) => a + b.estimatedSavings, 0);
  const pending = totalPotential - realizedNow;
  
  // Base realized from mock (hardcoded) + new realized
  const baseRealized = 4520;
  const totalRealized = baseRealized + realizedNow;
  const progressPercent = Math.min(100, (totalRealized / (totalRealized + pending)) * 100);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Optimization Hub</h2>
          <p className="text-slate-500 mt-1">
            We identified <span className="font-semibold text-slate-900">{opportunities.length - fixedIds.size}</span> opportunities 
            to save <span className="font-semibold text-emerald-600">${pending.toLocaleString()}</span> monthly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          {opportunities.map((opp) => {
            const isFixed = fixedIds.has(opp.id);
            const isFixing = fixingId === opp.id;

            return (
              <div key={opp.id} className={`bg-white p-5 rounded-xl border transition-all duration-300 group
                ${isFixed ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 shadow-sm hover:shadow-md'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full mt-1 transition-colors
                      ${isFixed ? 'bg-emerald-100 text-emerald-600' : 
                        opp.type === 'Idle' ? 'bg-red-50 text-red-600' : 
                        opp.type === 'Right-sizing' ? 'bg-amber-50 text-amber-600' : 
                        'bg-indigo-50 text-indigo-600'}`}>
                      {isFixed ? <Check size={20} /> : <Zap size={20} />}
                    </div>
                    <div>
                      <h3 className={`font-semibold flex items-center ${isFixed ? 'text-emerald-900' : 'text-slate-900'}`}>
                        {opp.title}
                        <span className="ml-3 text-xs px-2 py-0.5 rounded border border-slate-200 text-slate-500 font-normal">
                          {opp.provider}
                        </span>
                      </h3>
                      <p className={`text-sm mt-1 ${isFixed ? 'text-emerald-700' : 'text-slate-500'}`}>{opp.description}</p>
                      
                      <div className="flex items-center space-x-4 mt-3 text-xs text-slate-500">
                        <span className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-1.5 ${opp.effort === 'Low' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          {opp.effort} Effort
                        </span>
                        <span className="flex items-center">
                          <AlertCircle size={12} className="mr-1.5" />
                          {opp.risk} Risk
                        </span>
                        <span className="font-mono text-slate-400">ID: {opp.resourceId}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${isFixed ? 'text-emerald-500 line-through opacity-70' : 'text-emerald-600'}`}>
                      ${opp.estimatedSavings.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400 mb-3">monthly savings</div>
                    
                    {isFixed ? (
                      <button disabled className="px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg flex items-center ml-auto cursor-default transition-all">
                        <CheckCircle size={16} className="mr-2" /> Resolved
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleFix(opp.id)}
                        disabled={isFixing || fixingId !== null} 
                        className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-all shadow-sm flex items-center ml-auto min-w-[100px] justify-center
                          ${isFixing ? 'bg-indigo-500 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}
                          ${fixingId !== null && !isFixing ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        {isFixing ? (
                          <>
                            <Loader2 size={16} className="mr-2 animate-spin" /> Applying
                          </>
                        ) : (
                          'Fix Now'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg transition-all duration-500">
            <h3 className="font-semibold text-lg mb-2">Savings Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-indigo-800">
                <span className="text-indigo-200">Realized (MTD)</span>
                <span className="font-mono font-medium animate-in fade-in">${totalRealized.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-indigo-800">
                <span className="text-indigo-200">Pending Actions</span>
                <span className="font-mono font-medium text-emerald-400">
                  ${pending.toLocaleString()}
                </span>
              </div>
              <div className="pt-2">
                <div className="w-full bg-indigo-800 rounded-full h-2 mb-2 overflow-hidden">
                  <div 
                    className="bg-emerald-400 h-2 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-indigo-300 text-center">
                  {Math.round(progressPercent)}% of goal reached
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Automation Rules</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-600">
                  <CheckCircle size={16} className="text-emerald-500 mr-2" />
                  Delete unattached EBS {'>'} 7 days
                </div>
                <div className="w-8 h-4 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-600">
                  <CheckCircle size={16} className="text-emerald-500 mr-2" />
                  Stop Dev VMs at 8 PM
                </div>
                <div className="w-8 h-4 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm opacity-50">
                <div className="flex items-center text-slate-600">
                  <div className="w-4 h-4 border border-slate-300 rounded-full mr-2"></div>
                  Auto-purchase Spot Instances
                </div>
                <div className="w-8 h-4 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors">
              + Create New Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationHub;