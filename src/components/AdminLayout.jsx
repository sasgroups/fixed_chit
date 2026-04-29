import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  UsersIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function AdminLayout() {
  const { logout } = useAuth();

  const navItems = [
    { to: '/admin', label: 'Dashboard', exact: true, icon: HomeIcon },
    { to: '/admin/users', label: 'Users', icon: UsersIcon },
    { to: '/admin/schemes', label: 'Schemes', icon: BanknotesIcon },
    { to: '/admin/installments', label: 'Installments', icon: CurrencyDollarIcon },
    { to: '/admin/prize', label: 'Prize Allot', icon: TrophyIcon },
    { to: '/admin/reports', label: 'Reports', icon: ChartBarIcon },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
      isActive
        ? 'bg-black text-yellow-400 font-semibold shadow-md'
        : 'text-gray-800 hover:bg-black hover:text-yellow-400 hover:shadow-md'
    }`;

  return (
    <div className="min-h-screen bg-yellow-400">
      {/* Top Navbar */}
      <nav className="bg-black text-yellow-400 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <BanknotesIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold tracking-wider">CHIT FUND ADMIN</h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 font-medium transition-colors"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Logout
        </button>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-yellow-300 p-6 space-y-1 shadow-xl min-h-screen">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.exact} className={linkClass}>
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-yellow-400">
          <Outlet />
        </main>
      </div>
    </div>
  );
}