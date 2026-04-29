import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [role, setRole] = useState('member');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(mobile, password, role);
      navigate(`/${user.role}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-400">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-dark mb-2">CHIT FUND</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>
        
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setRole('member')}
            className={`px-4 py-2 rounded-full font-semibold ${role === 'member' ? 'bg-black text-yellow-400' : 'bg-gray-200 text-dark'}`}
          >Member</button>
          <button
            onClick={() => setRole('admin')}
            className={`px-4 py-2 rounded-full font-semibold ${role === 'admin' ? 'bg-black text-yellow-400' : 'bg-gray-200 text-dark'}`}
          >Admin</button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark">Mobile</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-black" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-black" required />
          </div>
          <button type="submit" className="w-full bg-black text-yellow-400 py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}