import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { GiftIcon, CurrencyRupeeIcon, CalendarIcon, BanknotesIcon } from '@heroicons/react/24/outline';

export default function PrizeDetails() {
  const [prizeInfo, setPrizeInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/member/prizes').then(r => setPrizeInfo(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (prizeInfo?.message) return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
        <GiftIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No Prize Data Yet</h3>
        <p className="text-gray-500">{prizeInfo.message}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center mb-8">
        <GiftIcon className="w-8 h-8 mr-3 text-indigo-600" />
        Prize Details
      </h2>
      
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-xl">
        <div className="bg-white rounded-[23px] overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 mb-1">Total Prize Won</p>
                <h3 className="text-5xl font-black text-gray-900">₹{prizeInfo.membership?.prizedAmount?.toLocaleString()}</h3>
              </div>
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                <CurrencyRupeeIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Prize Month</p>
                <p className="text-lg font-semibold text-gray-900">Month {prizeInfo.membership?.prizedMonth}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {prizeInfo.membership?.prizeDate ? new Date(prizeInfo.membership.prizeDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-50 p-3 rounded-xl text-green-600">
                <BanknotesIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Payout Status</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">{prizeInfo.payout?.payoutMethod || 'Pending'}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                  {prizeInfo.payout?.status || 'Processing'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}