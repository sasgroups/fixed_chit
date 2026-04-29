import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Loading from "../../components/Loading";

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/schemes')
      .then((res) => setSchemes(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-dark">Schemes</h2>
        <Link to="/admin/schemes/create" className="bg-black text-yellow-400 px-4 py-2 rounded-lg hover:bg-gray-800">+ Add Scheme</Link>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black text-yellow-400">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schemes.map((s) => (
              <tr key={s._id} className="hover:bg-yellow-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark">{s.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{s.durationMonths} Months</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">₹{s.monthlyAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-800' : s.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link to={`/admin/schemes/${s._id}`} className="text-indigo-600 hover:text-indigo-900 font-medium">View / Edit</Link>
                </td>
              </tr>
            ))}
            {schemes.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No schemes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
