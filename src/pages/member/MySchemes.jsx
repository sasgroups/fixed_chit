import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { CurrencyRupeeIcon, CalendarDaysIcon, ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function MySchemes() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/member/schemes').then(r => setMemberships(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <ShieldCheckIcon className="w-8 h-8 mr-3 text-indigo-600" />
            My Schemes
          </h2>
          <p className="text-gray-500 mt-1">Manage and track all your enrolled chit schemes.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {memberships.map(m => (
          <div key={m._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full overflow-hidden">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{m.scheme?.name}</h3>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <CalendarDaysIcon className="w-6 h-6 mr-3 text-indigo-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Duration</p>
                    <p className="font-semibold text-gray-900">{m.scheme?.durationMonths} Months</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <CurrencyRupeeIcon className="w-6 h-6 mr-3 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Monthly Installment</p>
                    <p className="font-semibold text-gray-900">₹{m.scheme?.monthlyAmount}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border-t border-gray-100 p-4">
              <Link 
                to={`/member/schemes/${m._id}/installments`} 
                className="w-full flex items-center justify-center space-x-2 bg-black text-white hover:bg-indigo-600 py-3 px-4 rounded-xl font-medium transition-colors"
              >
                <span>View Installments</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
        {memberships.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">You are not enrolled in any schemes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}