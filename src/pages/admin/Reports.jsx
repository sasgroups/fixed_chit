import { useState } from 'react';
import api from '../../utils/api';
import Modal from '../../components/Modal';
import { CurrencyRupeeIcon, UsersIcon, TrophyIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

export default function Reports() {
  const [reportData, setReportData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportTitle, setReportTitle] = useState('');

  const fetchReport = async (endpoint, title) => {
    setLoading(true);
    setReportTitle(title);
    try {
      const res = await api.get(endpoint);
      setReportData(res.data);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reports = [
    { title: 'Collection Report', endpoint: '/reports/collection', icon: CurrencyRupeeIcon, color: 'from-green-500 to-emerald-600' },
    { title: 'Defaulters List', endpoint: '/reports/defaulters', icon: UsersIcon, color: 'from-red-500 to-rose-600' },
    { title: 'Prizes Paid', endpoint: '/reports/prize-payouts', icon: TrophyIcon, color: 'from-yellow-500 to-amber-600' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-8">
        <DocumentChartBarIcon className="h-8 w-8 text-indigo-600" />
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Reports & Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, idx) => {
          const Icon = report.icon;
          return (
            <button
              key={idx}
              onClick={() => fetchReport(report.endpoint, report.title)}
              disabled={loading}
              className={`relative overflow-hidden bg-gradient-to-br ${report.color} p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-left group disabled:opacity-70`}
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{report.title}</h3>
                  <p className="text-white/80 text-sm font-medium">Click to view data</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={reportTitle || "Report"}>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-inner">
          <pre className="max-h-[60vh] overflow-auto text-sm text-gray-800 font-mono">
            {JSON.stringify(reportData, null, 2)}
          </pre>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={() => setModalOpen(false)} className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}