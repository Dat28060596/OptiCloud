import React from 'react';
import { MOCK_COST_DATA } from '../constants';
import { Filter, Download, Calendar } from 'lucide-react';
import { CostMetric } from '../types';

const CostExplorer: React.FC = () => {
  // Simple grouping logic for the table
  const groupedData = React.useMemo(() => {
    const map = new Map<string, { service: string; provider: string; cost: number; usage: string }>();
    MOCK_COST_DATA.forEach((item: CostMetric) => {
      const key = `${item.provider}-${item.service}`;
      const existing = map.get(key) || { service: item.service, provider: item.provider, cost: 0, usage: '100%' };
      existing.cost += item.amount;
      map.set(key, existing);
    });
    return Array.from(map.values()).sort((a, b) => b.cost - a.cost);
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Cost Explorer</h2>
          <p className="text-slate-500">Analyze spend across services, regions, and tags.</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Calendar size={16} className="mr-2" /> Last 30 Days
          </button>
          <button className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download size={16} className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center">
        <div className="flex items-center text-slate-500 mr-2">
          <Filter size={18} />
          <span className="ml-2 font-medium text-sm">Filters:</span>
        </div>
        
        {['Service', 'Region', 'Account', 'Tag'].map(filter => (
          <div key={filter} className="relative group">
            <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-700 flex items-center">
              {filter}
              <span className="ml-2 opacity-50">▼</span>
            </button>
          </div>
        ))}
        
        <button className="ml-auto text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          Clear all
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Service Name</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Provider</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Cost Category</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Total Cost</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {groupedData.map((row, idx) => {
                const total = groupedData.reduce((acc, r) => acc + r.cost, 0);
                const percent = ((row.cost / total) * 100).toFixed(1);
                
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.service}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                        ${row.provider === 'AWS' ? 'bg-orange-50 text-orange-700' : 
                          row.provider === 'Azure' ? 'bg-blue-50 text-blue-700' : 
                          'bg-red-50 text-red-700'}`}>
                        {row.provider}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">Compute / Database</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-700">${row.cost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end">
                        <span className="text-slate-600 mr-2">{percent}%</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${percent}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
          <span>Showing {groupedData.length} results</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostExplorer;