import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function Installments() {
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [installments, setInstallments] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/schemes').then((r) => setSchemes(r.data));
  }, []);

  const loadInstallments = async () => {
    if (!selectedScheme) return;
    const scheme = schemes.find(s => s._id === selectedScheme);
    if (scheme?.status !== 'active') {
      setMsg('This scheme is not active. Please activate it first.');
      setInstallments([]);
      return;
    }
    setMsg('');
    const res = await api.get(`/installments/scheme/${selectedScheme}?month=${selectedMonth}`);
    setInstallments(res.data);
  };

  const pay = async (schemememberId, month) => {
    try {
      await api.post('/installments/pay', { schemememberId, monthNumber: month, amount: 16000, paymentMode: 'cash' });
      setMsg('Paid successfully');
      loadInstallments();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Installments</h2>
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={selectedScheme}
          onChange={(e) => setSelectedScheme(e.target.value)}
          className="rounded border-gray-300"
        >
          <option value="">Select Scheme</option>
          {schemes.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.status})
            </option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          max={25}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-20 rounded border-gray-300"
        />
        <button
          onClick={loadInstallments}
          className="bg-black text-yellow-400 px-4 py-1 rounded font-medium"
        >
          Load
        </button>
      </div>

      {msg && (
        <div className={`p-2 mb-3 rounded ${msg.includes('not active') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {msg}
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead className="text-left">
            <tr>
              <th className="p-2">Member</th>
              <th className="p-2">Month</th>
              <th className="p-2">Due</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {installments.map((inv) => (
              <tr key={inv._id} className="border-t">
                <td className="p-2">{inv.schememember?.user?.name}</td>
                <td className="p-2">{inv.monthNumber}</td>
                <td className="p-2">{new Date(inv.dueDate).toLocaleDateString()}</td>
                <td className="p-2">{inv.status}</td>
                <td className="p-2">
                  {inv.status === 'pending' && (
                    <button
                      onClick={() => pay(inv.schememember._id, inv.monthNumber)}
                      className="bg-green-500 text-white px-2 py-0.5 rounded"
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {installments.length === 0 && !msg && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No installments to display. Load a scheme and month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}