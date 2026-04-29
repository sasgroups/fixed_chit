import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { PhoneIcon, IdentificationIcon, BuildingLibraryIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/member/profile').then(r => setUser(r.data));
  }, []);

  if (!user) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-gray-900 to-black"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-8">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-yellow-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-900">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Active Member
            </span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{user.name}</h2>
          <p className="text-gray-500 mb-8 flex items-center">
            <PhoneIcon className="w-4 h-4 mr-1" /> {user.mobile}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <IdentificationIcon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Identity Details</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Aadhaar Number</p>
                  <p className="font-medium text-gray-900">{user.aadhaarNo || 'Not Provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">PAN Number</p>
                  <p className="font-medium text-gray-900 uppercase">{user.panNo || 'Not Provided'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <BuildingLibraryIcon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Bank Details</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Account Number</p>
                  <p className="font-medium text-gray-900 flex items-center">
                    <CreditCardIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {user.bankAccount || 'Not Provided'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">IFSC Code</p>
                  <p className="font-medium text-gray-900 uppercase">{user.bankIfsc || 'Not Provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}