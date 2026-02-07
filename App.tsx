import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CostExplorer from './components/CostExplorer';
import OptimizationHub from './components/OptimizationHub';
import Anomalies from './components/Anomalies';
import { MOCK_ANOMALIES, MOCK_OPPORTUNITIES } from './constants';
import { Bell, Search, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
          onNavigate={setCurrentView} 
          anomalies={MOCK_ANOMALIES} 
          opportunities={MOCK_OPPORTUNITIES} 
        />;
      case 'explorer':
        return <CostExplorer />;
      case 'optimization':
        return <OptimizationHub opportunities={MOCK_OPPORTUNITIES} />;
      case 'anomalies':
        return <Anomalies anomalies={MOCK_ANOMALIES} />;
      default:
        return <Dashboard 
          onNavigate={setCurrentView} 
          anomalies={MOCK_ANOMALIES} 
          opportunities={MOCK_OPPORTUNITIES} 
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
             {renderView()}
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
           </div>
        </div>
      )}
    </div>
  );
};

export default App;