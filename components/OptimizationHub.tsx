import React from 'react';
import { MOCK_OPPORTUNITIES } from '../constants';
import { CheckCircle, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { OptimizationOpportunity } from '../types';

interface OptimizationHubProps {
  opportunities: OptimizationOpportunity[];
}

const OptimizationHub: React.FC<OptimizationHubProps> = ({ opportunities }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Optimization Hub</h2>
          <p className="text-slate-500 mt-1">
            We identified <span className="font-semibold text-slate-900">{opportunities.length}</span> opportunities 
            to save <span className="font-semibold text-emerald-600">${opportunities.reduce((a,b) => a + b.estimatedSavings, 0).toLocaleString()}</span> monthly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full mt-1 
                    ${opp.type === 'Idle' ? 'bg-red-50 text-red-600' : 
                      opp.type === 'Right-sizing' ? 'bg-amber-50 text-amber-600' : 
                      'bg-indigo-50 text-indigo-600'}`}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 flex items-center">
                      {opp.title}
                      <span className="ml-3 text-xs px-2 py-0.5 rounded border border-slate-200 text-slate-500 font-normal">
                        {opp.provider}
                      </span>
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{opp.description}</p>
                    
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
                  <div className="text-lg font-bold text-emerald-600">
                    ${opp.estimatedSavings.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mb-3">monthly savings</div>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                    Fix Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-lg mb-2">Savings Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-indigo-800">
                <span className="text-indigo-200">Realized (MTD)</span>
                <span className="font-mono font-medium">$4,520</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-indigo-800">
                <span className="text-indigo-200">Pending Actions</span>
                <span className="font-mono font-medium text-emerald-400">
                  ${opportunities.reduce((a,b) => a + b.estimatedSavings, 0).toLocaleString()}
                </span>
              </div>
              <div className="pt-2">
                <div className="w-full bg-indigo-800 rounded-full h-2 mb-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <p className="text-xs text-indigo-300 text-center">35% of goal reached</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Automation Rules</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-600">
                  <CheckCircle size={16} className="text-emerald-500 mr-2" />
                  Delete unattached EBS > 7 days
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