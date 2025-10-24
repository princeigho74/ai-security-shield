import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, Lock, Eye, TrendingUp, Database, Zap, CheckCircle, XCircle, AlertCircle, Bell, Mail, Phone, Download, Users, BarChart3, Settings, Clock, FileText } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AISecurityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [threats, setThreats] = useState([]);
  const [systemStatus, setSystemStatus] = useState('secure');
  const [apiCalls, setApiCalls] = useState(0);
  const [blockedAttacks, setBlockedAttacks] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    email: 'Smartxpress74@gmail.com',
    phone: '+2349020779297',
    emailEnabled: true,
    smsEnabled: true,
    highSeverityOnly: false
  });
  const [historicalData, setHistoricalData] = useState([
    { time: '00:00', threats: 12, blocked: 12 },
    { time: '04:00', threats: 8, blocked: 8 },
    { time: '08:00', threats: 15, blocked: 15 },
    { time: '12:00', threats: 23, blocked: 22 },
    { time: '16:00', threats: 18, blocked: 18 },
    { time: '20:00', threats: 14, blocked: 14 }
  ]);
  const [modelPerformance] = useState([
    { name: 'Fraud Detection', accuracy: 98.5, latency: 45 },
    { name: 'Credit Scoring', accuracy: 96.8, latency: 52 },
    { name: 'Transaction Classifier', accuracy: 99.2, latency: 38 },
    { name: 'Risk Assessment', accuracy: 97.3, latency: 48 }
  ]);

  const threatDistribution = [
    { name: 'Adversarial Input', value: 35, color: '#ef4444' },
    { name: 'Model Extraction', value: 28, color: '#f97316' },
    { name: 'Data Poisoning', value: 22, color: '#eab308' },
    { name: 'API Abuse', value: 15, color: '#3b82f6' }
  ];

  const sendAlert = (threat) => {
    if (!alertSettings.highSeverityOnly || threat.severity === 'high') {
      if (alertSettings.emailEnabled) {
        console.log(`📧 Email sent to ${alertSettings.email}: ${threat.type} detected`);
      }
      if (alertSettings.smsEnabled) {
        console.log(`📱 SMS sent to ${alertSettings.phone}: ${threat.type} detected`);
      }
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setApiCalls(prev => prev + Math.floor(Math.random() * 5));
      
      if (Math.random() > 0.7) {
        const newThreat = {
          id: Date.now(),
          type: ['Adversarial Input', 'Model Extraction', 'Data Poisoning', 'API Abuse'][Math.floor(Math.random() * 4)],
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          timestamp: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
          status: 'blocked',
          source: `IP: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          target: ['Fraud Model', 'Credit Engine', 'Transaction AI'][Math.floor(Math.random() * 3)]
        };
        setThreats(prev => [newThreat, ...prev].slice(0, 50));
        setBlockedAttacks(prev => prev + 1);
        sendAlert(newThreat);
        
        setHistoricalData(prev => {
          const newData = [...prev];
          newData[newData.length - 1] = {
            ...newData[newData.length - 1],
            threats: newData[newData.length - 1].threats + 1,
            blocked: newData[newData.length - 1].blocked + 1
          };
          return newData;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [alertSettings]);

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalThreats: threats.length,
        blockedAttacks,
        apiCalls,
        systemStatus
      },
      threats: threats,
      modelPerformance,
      historicalData
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-report-${Date.now()}.json`;
    a.click();
  };

  const SecurityMetric = ({ icon: Icon, label, value, status, trend }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 transform hover:scale-105 transition-transform" style={{ borderColor: status === 'good' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#ef4444' }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <Icon size={18} />
            <span className="font-medium">{label}</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          {trend && (
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp size={16} />
              <span>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ThreatItem = ({ threat }) => {
    const severityColors = {
      low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      medium: 'bg-orange-100 text-orange-800 border-orange-300',
      high: 'bg-red-100 text-red-800 border-red-300'
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" />
            <div>
              <span className="font-semibold text-gray-900 block">{threat.type}</span>
              <span className="text-xs text-gray-500">Target: {threat.target}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityColors[threat.severity]}`}>
            {threat.severity.toUpperCase()}
          </span>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Source: {threat.source}</span>
            <span className="text-green-600 font-medium flex items-center gap-1">
              <CheckCircle size={14} /> {threat.status}
            </span>
          </div>
          <div className="text-xs text-gray-500 flex justify-between">
            <span>{threat.date}</span>
            <span>{threat.timestamp}</span>
          </div>
        </div>
      </div>
    );
  };

  const ModelProtectionCard = ({ name, status, confidence, requests }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        {status === 'protected' ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <AlertCircle className="text-yellow-500" size={20} />
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Protection Level</span>
          <span className="font-semibold text-green-600">{confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${confidence}%` }}></div>
        </div>
        <div className="text-xs text-gray-500 pt-2">{requests.toLocaleString()} requests/day</div>
      </div>
    </div>
  );

  const RoleCard = ({ role, permissions, users }) => (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{role}</h3>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
          {users} users
        </span>
      </div>
      <div className="space-y-2">
        {permissions.map((perm, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle size={14} className="text-green-500" />
            <span>{perm}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {showNotification && (
        <div className="fixed top-20 right-6 z-50 bg-white rounded-lg shadow-2xl p-4 border-l-4 border-blue-500 animate-slide-in max-w-md">
          <div className="flex items-start gap-3">
            <Bell className="text-blue-500 mt-1" size={20} />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Security Alert Sent</h4>
              <p className="text-sm text-gray-600 mt-1">
                Notifications sent to {alertSettings.email} and {alertSettings.phone}
              </p>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Alert Settings</h2>
                <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700">
                  <XCircle size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={alertSettings.email}
                  onChange={(e) => setAlertSettings({...alertSettings, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={alertSettings.phone}
                  onChange={(e) => setAlertSettings({...alertSettings, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={alertSettings.emailEnabled}
                    onChange={(e) => setAlertSettings({...alertSettings, emailEnabled: e.target.checked})}
                    className="w-5 h-5 text-blue-500 rounded"
                  />
                  <span className="text-gray-700">Enable Email Notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={alertSettings.smsEnabled}
                    onChange={(e) => setAlertSettings({...alertSettings, smsEnabled: e.target.checked})}
                    className="w-5 h-5 text-blue-500 rounded"
                  />
                  <span className="text-gray-700">Enable SMS Notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={alertSettings.highSeverityOnly}
                    onChange={(e) => setAlertSettings({...alertSettings, highSeverityOnly: e.target.checked})}
                    className="w-5 h-5 text-blue-500 rounded"
                  />
                  <span className="text-gray-700">Alert only for High Severity threats</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-blue-500/30 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Shield className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Security Shield</h1>
                <p className="text-blue-300 text-sm">Financial Model Protection Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={exportReport}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download size={18} />
                <span className="font-semibold text-sm">Export Report</span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <Settings size={18} />
              </button>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${systemStatus === 'secure' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                <div className={`w-2 h-2 rounded-full ${systemStatus === 'secure' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className="font-semibold text-sm">System {systemStatus === 'secure' ? 'Secure' : 'Alert'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'threats', label: 'Threats', icon: AlertTriangle },
            { id: 'models', label: 'Models', icon: Database },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'users', label: 'User Roles', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <SecurityMetric icon={Activity} label="API Requests" value={apiCalls.toLocaleString()} status="good" trend="+12% from yesterday" />
              <SecurityMetric icon={Shield} label="Threats Blocked" value={blockedAttacks} status="good" trend="99.8% success rate" />
              <SecurityMetric icon={Lock} label="Models Protected" value="8" status="good" />
              <SecurityMetric icon={Eye} label="Active Monitoring" value="24/7" status="good" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Threat Activity (24h)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} name="Threats Detected" />
                    <Line type="monotone" dataKey="blocked" stroke="#10b981" strokeWidth={2} name="Threats Blocked" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Attack Types Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={threatDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {threatDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={24} />
                Recent Security Events
              </h2>
              <div className="space-y-3">
                {threats.slice(0, 5).length > 0 ? (
                  threats.slice(0, 5).map(threat => <ThreatItem key={threat.id} threat={threat} />)
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Shield size={48} className="mx-auto mb-3 opacity-50" />
                    <p>No threats detected. System is secure.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Threat Intelligence</h2>
                <div className="flex items-center gap-3 text-white">
                  <Mail size={18} />
                  <span className="text-sm">{alertSettings.email}</span>
                  <Phone size={18} className="ml-3" />
                  <span className="text-sm">{alertSettings.phone}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                  <div className="text-red-300 text-sm font-semibold mb-1">High Severity</div>
                  <div className="text-3xl font-bold text-white">
                    {threats.filter(t => t.severity === 'high').length}
                  </div>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-4">
                  <div className="text-orange-300 text-sm font-semibold mb-1">Medium Severity</div>
                  <div className="text-3xl font-bold text-white">
                    {threats.filter(t => t.severity === 'medium').length}
                  </div>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
                  <div className="text-yellow-300 text-sm font-semibold mb-1">Low Severity</div>
                  <div className="text-3xl font-bold text-white">
                    {threats.filter(t => t.severity === 'low').length}
                  </div>
                </div>
              </div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {threats.map(threat => <ThreatItem key={threat.id} threat={threat} />)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Protected AI Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ModelProtectionCard name="Fraud Detection Model" status="protected" confidence={98} requests={45000} />
              <ModelProtectionCard name="Credit Scoring Engine" status="protected" confidence={96} requests={32000} />
              <ModelProtectionCard name="Transaction Classifier" status="protected" confidence={99} requests={78000} />
              <ModelProtectionCard name="Risk Assessment AI" status="protected" confidence={97} requests={21000} />
              <ModelProtectionCard name="AML Detection System" status="protected" confidence={95} requests={56000} />
              <ModelProtectionCard name="Anomaly Detection" status="protected" confidence={98} requests={67000} />
              <ModelProtectionCard name="Customer Behavior AI" status="protected" confidence={94} requests={41000} />
              <ModelProtectionCard name="Market Prediction Model" status="protected" confidence={96} requests={29000} />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">Security Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Attack Types Distribution</h3>
                  <div className="space-y-3">
                    {['Adversarial Input', 'Model Extraction', 'Data Poisoning', 'API Abuse'].map((type, idx) => (
                      <div key={type}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{type}</span>
                          <span className="font-semibold">{[35, 28, 22, 15][idx]}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all" style={{ width: `${[35, 28, 22, 15][idx]}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Defense Mechanisms</h3>
                  <div className="space-y-4">
                    {[
                      'Input Validation',
                      'Anomaly Detection',
                      'Rate Limiting',
                      'Encryption',
                      'Access Control',
                      'Model Monitoring'
                    ].map(mechanism => (
                      <div key={mechanism} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-500" size={20} />
                          <span className="text-gray-700">{mechanism}</span>
                        </div>
                        <span className="text-green-600 font-semibold">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">Model Performance Metrics</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={modelPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#fff" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#10b981" name="Accuracy (%)" />
                  <Bar dataKey="latency" fill="#3b82f6" name="Latency (ms)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-4">System Health</h3>
                <div className="space-y-4">
                  {[
                    { name: 'CPU Usage', value: 45, color: 'bg-green-500' },
                    { name: 'Memory Usage', value: 62, color: 'bg-blue-500' },
                    { name: 'Network Load', value: 38, color: 'bg-cyan-500' },
                    { name: 'Storage Usage', value: 71, color: 'bg-purple-500' }
                  ].map(metric => (
                    <div key={metric.name}>
                      <div className="flex justify-between text-sm mb-2 text-white">
                        <span>{metric.name}</span>
                        <span className="font-semibold">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div className={`${metric.color} h-3 rounded-full transition-all`} style={{ width: `${metric.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Uptime & Reliability</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm text-gray-300 mb-1">System Uptime</div>
                    <div className="text-3xl font-bold text-white">99.97%</div>
                    <div className="text-xs text-gray-400 mt-1">Last 30 days</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm text-gray-300 mb-1">Mean Time to Detect</div>
                    <div className="text-3xl font-bold text-white">2.3s</div>
                    <div className="text-xs text-gray-400 mt-1">Average response time</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm text-gray-300 mb-1">False Positive Rate</div>
                    <div className="text-3xl font-bold text-white">0.2%</div>
                    <div className="text-xs text-gray-400 mt-1">Industry leading accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">User Role Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RoleCard
                role="Administrator"
                users={3}
                permissions={[
                  'Full system access',
                  'Configure security policies',
                  'Manage user roles',
                  'Export reports',
                  'System configuration'
                ]}
              />
              <RoleCard
                role="Security Analyst"
                users={8}
                permissions={[
                  'View all threats',
                  'Investigate incidents',
                  'Create reports',
                  'Monitor dashboards',
                  'Configure alerts'
                ]}
              />
              <RoleCard
                role="Model Engineer"
                users={12}
                permissions={[
                  'Deploy AI models',
                  'View model metrics',
                  'Update configurations',
                  'Access performance data'
                ]}
              />
              <RoleCard
                role="Compliance Officer"
                users={5}
                permissions={[
                  'View audit logs',
                  'Generate compliance reports',
                  'Review security policies',
                  'Access historical data'
                ]}
              />
              <RoleCard
                role="Operations Manager"
                users={6}
                permissions={[
                  'View system status',
                  'Monitor uptime',
                  'Receive critical alerts',
                  'Basic reporting'
                ]}
              />
              <RoleCard
                role="Read-Only Viewer"
                users={15}
                permissions={[
                  'View dashboards',
                  'Access basic metrics',
                  'View public reports'
                ]}
              />
            </div>
            <div className="mt-6 bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recent Access Log</h3>
              <div className="space-y-3">
                {[
                  { user: 'admin@company.com', action: 'Updated security policy', time: '2 minutes ago', role: 'Administrator' },
                  { user: 'analyst1@company.com', action: 'Investigated threat #1247', time: '15 minutes ago', role: 'Security Analyst' },
                  { user: 'engineer@company.com', action: 'Deployed model update', time: '1 hour ago', role: 'Model Engineer' },
                  { user: 'compliance@company.com', action: 'Generated audit report', time: '2 hours ago', role: 'Compliance Officer' }
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{log.user}</div>
                      <div className="text-sm text-gray-600">{log.action}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mb-1">{log.role}</div>
                      <div className="text-xs text-gray-500">{log.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AISecurityDashboard;
