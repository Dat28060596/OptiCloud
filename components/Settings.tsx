import React, { useState } from 'react';
import { 
  Cloud, Check, Copy, ExternalLink, Plus, Trash2, 
  Shield, Key, Database, RefreshCw 
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'integrations' | 'general' | 'notifications'>('integrations');
  const [showAddModal, setShowAddModal] = useState<string | null>(null);

  // Mock state for connected accounts
  const [accounts, setAccounts] = useState([
    { id: 1, provider: 'AWS', name: 'Production Account', accountId: '123456789012', status: 'Connected', lastSync: '10 mins ago' },
    { id: 2, provider: 'GCP', name: 'Data Analytics', accountId: 'gcp-project-id-x92', status: 'Connected', lastSync: '1 hour ago' },
  ]);

  const Providers = [
    { id: 'AWS', name: 'Amazon Web Services', icon: Cloud, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'Azure', name: 'Microsoft Azure', icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'GCP', name: 'Google Cloud Platform', icon: Cloud, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Configuration</h2>
        <p className="text-slate-500">Manage your cloud integrations and application settings.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          {['integrations', 'general', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize
                ${activeTab === tab 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-900">Connected Accounts</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                  <RefreshCw size={14} className="mr-1.5" /> Sync All
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {accounts.map((account) => (
                  <div key={account.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center 
                        ${account.provider === 'AWS' ? 'bg-orange-100 text-orange-600' : 
                          account.provider === 'Azure' ? 'bg-blue-100 text-blue-600' : 
                          'bg-red-100 text-red-600'}`}>
                        {account.provider === 'AWS' && <Cloud size={20} />}
                        {account.provider === 'Azure' && <Database size={20} />}
                        {account.provider === 'GCP' && <Cloud size={20} />}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{account.name}</h4>
                        <div className="text-xs text-slate-500 flex items-center mt-1">
                          ID: {account.accountId}
                          <span className="mx-2">•</span>
                          Last synced: {account.lastSync}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        <Check size={12} className="mr-1" /> {account.status}
                      </span>
                      <button className="p-2 text-slate-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mt-1">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900">Security First</h4>
                  <p className="text-sm text-indigo-700 mt-1">
                    CostOptima uses secure, read-only delegation methods. 
                    We never ask for your root credentials. All data is encrypted at rest and in transit.
                  </p>
                  <a href="#" className="inline-flex items-center text-sm font-medium text-indigo-800 mt-3 hover:underline">
                    Read our security whitepaper <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Section */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Add Integration</h3>
            <div className="space-y-3">
              {Providers.map((provider) => (
                <button 
                  key={provider.id}
                  onClick={() => setShowAddModal(provider.id)}
                  className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${provider.bg} ${provider.color}`}>
                      <provider.icon size={20} />
                    </div>
                    <span className="font-medium text-slate-700 group-hover:text-slate-900">{provider.name}</span>
                  </div>
                  <Plus size={18} className="text-slate-400 group-hover:text-indigo-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Integration Modal (Mock) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Connect {showAddModal}</h3>
                <p className="text-sm text-slate-500 mt-1">Enter your credentials to enable cost monitoring.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(null); }}>
              {showAddModal === 'AWS' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Account Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Staging Env" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">IAM Role ARN</label>
                    <div className="relative">
                       <Key size={16} className="absolute left-3 top-3 text-slate-400" />
                       <input type="text" className="w-full pl-9 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm" placeholder="arn:aws:iam::123456789:role/CostOptimaRole" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Create a role with <code>AWSCEReadOnlyAccess</code> policy.
                    </p>
                  </div>
                </>
              )}

              {showAddModal === 'Azure' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tenant ID</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Client ID</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Client Secret</label>
                    <input type="password" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm" />
                  </div>
                </>
              )}

              {showAddModal === 'GCP' && (
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Service Account Key (JSON)</label>
                   <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                      <Cloud className="mx-auto h-8 w-8 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-600">Click to upload JSON file</p>
                   </div>
                </div>
              )}

              <div className="pt-4 flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                >
                  Connect Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;