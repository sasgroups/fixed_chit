import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function PrizeAllotment() {
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [month, setMonth] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/schemes').then((r) => setSchemes(r.data));
  }, []);

  useEffect(() => {
    if (selectedScheme) {
      api.get(`/schememembers/${selectedScheme}/members`) // note: fixed parameter naming
        .then((r) => setMembers(r.data.filter((m) => !m.prizedMonth)))
        .catch(() => setMembers([]));
    }
  }, [selectedScheme]);

  const allot = async () => {
    const scheme = schemes.find(s => s._id === selectedScheme);
    if (scheme?.status !== 'active') {
      setMsg('Scheme is not active. Please activate it first.');
      return;
    }
    try {
      await api.post(`/schememembers/${selectedScheme}/prize-allot`, {
        userId: selectedMember,
        monthNumber: month || undefined,
      });
      setMsg('Prize allotted successfully!');
      setMembers(members.filter(m => m.user._id !== selectedMember)); // refresh list
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Prize Allotment</h2>

      <div className="space-y-4">
        <select
          value={selectedScheme}
          onChange={(e) => setSelectedScheme(e.target.value)}
          className="w-full rounded border-gray-300"
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
          placeholder="Month (optional)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full rounded border-gray-300"
        />

        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="w-full rounded border-gray-300"
        >
          <option value="">Select Member</option>
          {members.map((m) => (
            <option key={m._id} value={m.user._id}>
              {m.user.name} ({m.user.mobile})
            </option>
          ))}
        </select>

        <button
          onClick={allot}
          className="w-full bg-black text-yellow-400 px-6 py-2 rounded font-bold"
        >
          Allot Prize
        </button>
      </div>

      {msg && (
        <div className={`mt-4 p-2 rounded text-center ${
          msg.includes('not active') ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {msg}
        </div>
      )}
    </div>
  );
}