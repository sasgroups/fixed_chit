import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ schemes: 0, users: 0 });

  useEffect(() => {
    api.get('/schemes').then(r => setStats(prev => ({ ...prev, schemes: r.data.length })));
    api.get('/users').then(r => setStats(prev => ({ ...prev, users: r.data.length })));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-dark mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold">Total Schemes</h3>
          <p className="text-4xl font-bold text-yellow-600">{stats.schemes}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold">Total Members</h3>
          <p className="text-4xl font-bold text-yellow-600">{stats.users}</p>
        </div>
      </div>
    </div>
  );
}