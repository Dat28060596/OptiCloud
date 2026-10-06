import React, { useState, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import { MOCK_ANOMALIES, MOCK_OPPORTUNITIES, MOCK_COST_DATA } from './constants';
import { Bell, Search, Menu } from 'lucide-react';
import { CostMetric, Anomaly } from './types';

// ⚡ Bolt Performance Optimization:
// Lazily load route components to reduce the initial JavaScript bundle size.
// Heavy dependencies like Recharts (used in Dashboard/CostExplorer) are deferred
// until the specific view is active, speeding up the initial page load.
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const CostExplorer = React.lazy(() => import('./components/CostExplorer'));
const OptimizationHub = React.lazy(() => import('./components/OptimizationHub'));
const Anomalies = React.lazy(() => import('./components/Anomalies'));
const Settings = React.lazy(() => import('./components/Settings'));


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fixedOpportunityIds, setFixedOpportunityIds] = useState<Set<string>>(new Set());
  
  // Lifted state for Cost Data to ensure persistence across views
  const [costData, setCostData] = useState<CostMetric[]>(MOCK_COST_DATA);

  // Lifted state for Anomalies
  const [anomalies, setAnomalies] = useState<Anomaly[]>(MOCK_ANOMALIES);

  const handleFixOpportunity = (id: string) => {
    setFixedOpportunityIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleDeleteService = (key: string) => {
    // Key format is expected to be `${provider}-${service}`
    setCostData(prev => prev.filter(item => `${item.provider}-${item.service}` !== key));
  };

  const handleAddService = (newMetric: CostMetric) => {
    setCostData(prev => [newMetric, ...prev]);
  };

  const handleDismissAnomaly = (id: string) => {
    setAnomalies(prev => prev.filter(a => a.id !== id));
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
          onNavigate={setCurrentView} 
          anomalies={anomalies} 
          opportunities={MOCK_OPPORTUNITIES}
          fixedOpportunityIds={fixedOpportunityIds}
        />;
      case 'explorer':
        return <CostExplorer 
          data={costData}
          onDeleteService={handleDeleteService}
          onAddService={handleAddService}
        />;
      case 'optimization':
        return <OptimizationHub 
          opportunities={MOCK_OPPORTUNITIES} 
          fixedOpportunityIds={fixedOpportunityIds}
          onFixOpportunity={handleFixOpportunity}
        />;
      case 'anomalies':
        return <Anomalies 
          anomalies={anomalies} 
          onDismissAnomaly={handleDismissAnomaly}
        />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard 
          onNavigate={setCurrentView} 
          anomalies={anomalies} 
          opportunities={MOCK_OPPORTUNITIES} 
          fixedOpportunityIds={fixedOpportunityIds}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center md:hidden">
            <button 
              className="p-2 -ml-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <span className="ml-2 font-bold text-lg text-slate-800">CostOptima</span>
          </div>

          <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 w-96 border border-transparent focus-within:border-indigo-300 focus-within:bg-white transition-all">
            <Search size={18} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search resources, tags, or costs..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-slate-700"
            />
          </div>

          <div className="flex items-center space-x-4">
             <div className="relative cursor-pointer">
               <Bell size={20} className="text-slate-500 hover:text-slate-700 transition-colors" />
               <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
             </div>
             <div className="h-8 w-px bg-slate-200 mx-2"></div>
             <div className="text-right hidden sm:block">
               <div className="text-xs font-medium text-slate-500">Organization</div>
               <div className="text-sm font-bold text-slate-800">Acme Corp</div>
             </div>
             <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
               AC
             </div>
          </div>
        </header>

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="flex items-center justify-center h-full p-12 text-slate-500">Loading view...</div>}>
              {renderView()}
            </Suspense>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay (Simplified for demo) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
           <div className="w-64 h-full bg-slate-900 p-4" onClick={e => e.stopPropagation()}>
             {/* Reusing Nav Items logic for mobile would ideally use the Sidebar component prop for responsive, but keeping simple here */}
             <div className="text-white font-bold mb-6">CostOptima</div>
             <button onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }} className="block text-slate-300 py-3">Overview</button>
             <button onClick={() => { setCurrentView('explorer'); setMobileMenuOpen(false); }} className="block text-slate-300 py-3">Cost Explorer</button>
             <button onClick={() => { setCurrentView('anomalies'); setMobileMenuOpen(false); }} className="block text-slate-300 py-3">Anomalies</button>
             <button onClick={() => { setCurrentView('settings'); setMobileMenuOpen(false); }} className="block text-slate-300 py-3">Settings</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;