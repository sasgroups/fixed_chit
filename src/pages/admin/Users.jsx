import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Loading from "../../components/Loading";
import { UserPlusIcon, UsersIcon, CheckBadgeIcon, ExclamationTriangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users')
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <UsersIcon className="h-8 w-8 mr-3 text-indigo-600" />
            Members Directory
          </h2>
          <p className="text-gray-500 mt-1">Manage and view all registered members.</p>
        </div>
        <Link 
          to="/admin/users/create" 
          className="flex items-center bg-black text-yellow-400 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Add Member
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Member Info</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-gray-500">Contact</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-gray-500">KYC Status</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-tr from-yellow-400 to-yellow-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-900 shadow-sm">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{u.name}</div>
                        <div className="text-xs text-gray-500">ID: {u._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                    {u.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {u.kycStatus === 'approved' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                        <CheckBadgeIcon className="w-3.5 h-3.5 mr-1" /> Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                        <ExclamationTriangleIcon className="w-3.5 h-3.5 mr-1" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/admin/users/${u._id}`} 
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <PencilSquareIcon className="w-4 h-4 mr-1.5" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <UsersIcon className="w-12 h-12 text-gray-300 mb-3" />
                      <p>No members found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}