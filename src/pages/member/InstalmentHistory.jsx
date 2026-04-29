import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import { ArrowLeftIcon, DocumentTextIcon, CheckBadgeIcon, ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function InstalmentHistory() {
  const { id } = useParams();
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    api.get(`/member/schemes/${id}/installments`).then(r => setInstallments(r.data));
  }, [id]);

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckBadgeIcon className="w-3 h-3 mr-1"/> Paid</span>;
      case 'overdue':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><ExclamationCircleIcon className="w-3 h-3 mr-1"/> Overdue</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><ClockIcon className="w-3 h-3 mr-1"/> Pending</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-center space-x-4">
        <Link to="/member/schemes" className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 flex items-center">
            <DocumentTextIcon className="w-6 h-6 mr-2 text-indigo-600" />
            Installment History
          </h2>
          <p className="text-gray-500 text-sm">Detailed view of your past and upcoming payments.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Month</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Due Date</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Paid Date</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Late Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {installments.map(i => (
                <tr key={i._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Month {i.monthNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(i.dueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(i.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {i.paidDate ? new Date(i.paidDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-red-500">
                    {i.lateFeeAdded > 0 ? `₹${i.lateFeeAdded}` : '-'}
                  </td>
                </tr>
              ))}
              {installments.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No installments found for this scheme.
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