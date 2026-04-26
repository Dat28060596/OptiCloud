import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertTriangle, DollarSign, 
  ArrowRight, Sparkles, Activity 
} from 'lucide-react';
import { KPIS, MOCK_COST_DATA, MOCK_ANOMALIES } from '../constants';
import { generateExecutiveSummary } from '../services/geminiService';
import { Anomaly, OptimizationOpportunity } from '../types';

interface DashboardProps {
  onNavigate: (view: string) => void;
  anomalies: Anomaly[];
  opportunities: OptimizationOpportunity[];
  fixedOpportunityIds: Set<string>;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, anomalies, opportunities, fixedOpportunityIds }) => {
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  // Filter out fixed opportunities to show accurate potential savings
  const activeOpportunities = useMemo(() => {
    return opportunities.filter(op => !fixedOpportunityIds.has(op.id));
  }, [opportunities, fixedOpportunityIds]);

  const savingsPotential = useMemo(() => {
    return activeOpportunities.reduce((sum, op) => sum + op.estimatedSavings, 0);
  }, [activeOpportunities]);

  // Calculate realized savings from fixed opportunities
  const realizedSavings = useMemo(() => {
    return opportunities
      .filter(op => fixedOpportunityIds.has(op.id))
      .reduce((sum, op) => sum + op.estimatedSavings, 0);
  }, [opportunities, fixedOpportunityIds]);

  // Dynamic forecast based on base forecast minus realized savings
  const currentForecast = KPIS.forecast - realizedSavings;

  // Aggregating data for the chart
  const chartData = useMemo(() => {
    const dailyMap = new Map<string, number>();
    MOCK_COST_DATA.forEach(item => {
      const current = dailyMap.get(item.date) || 0;
      dailyMap.set(item.date, current + item.amount);
    });
    return Array.from(dailyMap.entries())
      .map(([date, amount]) => ({ date, amount }))
      // ⚡ Bolt: Use direct string comparison for ISO dates to avoid expensive Date parsing
      .sort((a, b) => a.date < b.date ? -1 : (a.date > b.date ? 1 : 0));
  }, []);

  const handleGenerateInsight = async () => {
    setLoadingAi(true);
    // Use currentForecast and activeOpportunities for AI summary to reflect current state
    const summary = await generateExecutiveSummary(KPIS.totalSpend, currentForecast, anomalies, activeOpportunities);
    setAiSummary(summary);
    setLoadingAi(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Spend (MTD)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                ${KPIS.totalSpend.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-600 font-medium flex items-center">
              <TrendingDown size={14} className="mr-1" /> 2.4%
            </span>
            <span className="text-slate-400 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Forecast</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                ${currentForecast.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </h3>
            </div>
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className={`font-medium flex items-center ${currentForecast > KPIS.budget ? 'text-amber-600' : 'text-emerald-600'}`}>
              {Math.abs(((currentForecast - KPIS.budget) / KPIS.budget) * 100).toFixed(1)}%
            </span>
            <span className="text-slate-400 ml-2">{currentForecast > KPIS.budget ? 'over budget' : 'under budget'}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => onNavigate('optimization')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Potential Savings</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-2">
                ${savingsPotential.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </h3>
            </div>
            <div className={`p-2 rounded-lg ${activeOpportunities.length > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
              <Sparkles size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-indigo-600 font-medium">
            View {activeOpportunities.length} opportunities <ArrowRight size={14} className="ml-1" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-red-300 transition-colors" onClick={() => onNavigate('anomalies')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Anomalies</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                {anomalies.length}
              </h3>
            </div>
            <div className={`p-2 rounded-lg ${anomalies.length > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
             {anomalies.length > 0 ? (
               <span className="text-red-600 font-medium">Critical attention needed</span>
             ) : (
               <span className="text-emerald-600 font-medium">All systems normal</span>
             )}
          </div>
        </div>
      </div>

      {/* AI Insight Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full transform translate-x-10 -translate-y-10"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="text-yellow-400" size={20} />
            <h3 className="text-lg font-semibold">Gemini Financial Advisor</h3>
          </div>
          
          {aiSummary ? (
            <div className="prose prose-invert max-w-none">
              <p className="text-indigo-100 leading-relaxed">{aiSummary}</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-indigo-200 text-sm max-w-xl">
                Generate an AI-powered executive summary of your current cloud spend, forecasts, and critical anomalies to share with stakeholders.
              </p>
              <button 
                onClick={handleGenerateInsight}
                disabled={loadingAi}
                className="px-4 py-2 bg-white text-indigo-900 rounded-lg font-medium text-sm hover:bg-indigo-50 transition-colors disabled:opacity-70 flex items-center"
              >
                {loadingAi ? (
                  <>
                    <Activity className="animate-spin mr-2" size={16} />
                    Analyzing...
                  </>
                ) : (
                  'Generate Insights'
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-800">Spend Trend (Last 30 Days)</h3>
            <select className="text-sm border-slate-200 rounded-md text-slate-600 focus:ring-indigo-500">
              <option>All Clouds</option>
              <option>AWS</option>
              <option>Azure</option>
              <option>GCP</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(val) => val.slice(5)} 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`$${value}`, 'Spend']}
                />
                <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Cost by Provider</h3>
          <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'AWS', value: 24500 },
                  { name: 'Azure', value: 12000 },
                  { name: 'GCP', value: 6030 },
                ]} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0"/>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={50} tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={30} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;