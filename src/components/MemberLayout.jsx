import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MemberLayout() {
  const { logout } = useAuth();

  const navItems = [
    { to: '/member', label: 'Dashboard', exact: true },
    { to: '/member/schemes', label: 'My Schemes' },
    { to: '/member/prize', label: 'Prize Details' },
    { to: '/member/profile', label: 'Profile' },
  ];

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-black text-yellow-400 font-semibold' : 'text-black hover:bg-black hover:text-yellow-400'
    }`;

  return (
    <div className="min-h-screen bg-yellow-400">
      <nav className="bg-black text-yellow-400 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold tracking-wider">CHIT FUND MEMBER</h1>
        <button onClick={logout} className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 font-medium">Logout</button>
      </nav>
      <div className="flex">
        <aside className="w-64 bg-yellow-300 p-6 space-y-2 shadow-xl min-h-screen">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.exact} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}