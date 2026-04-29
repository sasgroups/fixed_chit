import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { ChartPieIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function MemberDashboard() {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    api.get('/member/schemes').then(r => setSchemes(r.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold tracking-tight mb-2">
            Welcome back, <span className="text-yellow-400">{user?.name}</span> 👋
          </h2>
          <p className="text-gray-400 text-lg">Here's an overview of your active chits and progress.</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <ChartPieIcon className="w-6 h-6 mr-2 text-indigo-600" />
          Your Active Schemes
        </h3>
        {schemes.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">You are not enrolled in any schemes yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schemes.map(sm => (
              <div key={sm._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{sm.scheme?.name}</h4>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${sm.scheme?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {sm.scheme?.status?.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-24">Prize Status:</span>
                    {sm.prizedMonth ? (
                      <span className="flex items-center text-green-600 font-medium">
                        <CheckCircleIcon className="w-5 h-5 mr-1" /> Won (₹{sm.prizedAmount})
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-600 font-medium">
                        <ClockIcon className="w-5 h-5 mr-1" /> Pending
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}