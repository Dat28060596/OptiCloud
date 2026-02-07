import React from 'react';
import { 
  LayoutDashboard, PieChart, AlertTriangle, Zap, Settings, 
  Cloud, LogOut, Command
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'explorer', label: 'Cost Explorer', icon: PieChart },
    { id: 'anomalies', label: 'Anomalies', icon: AlertTriangle },
    { id: 'optimization', label: 'Optimization', icon: Zap },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col text-slate-300 hidden md:flex">
      {/* Brand */}
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
          <Cloud size={20} fill="currentColor" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">CostOptima</span>
      </div>

      {/* Nav */}
      <div className="flex-1 px-4 py-4 space-y-1">
        <div className="mb-4 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Platform
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={18} className="mr-3" />
            {item.label}
          </button>
        ))}
        
        <div className="mt-8 mb-4 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Settings
        </div>
        <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors">
           <Settings size={18} className="mr-3" />
           Configuration
        </button>
      </div>

      {/* User */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-medium border border-slate-600">
            JD
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
             <p className="text-sm font-medium text-white truncate">John Doe</p>
             <p className="text-xs text-slate-500 truncate">DevOps Lead</p>
          </div>
          <LogOut size={16} className="text-slate-500 hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;