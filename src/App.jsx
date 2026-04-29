import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './components/AdminLayout';
import MemberLayout from './components/MemberLayout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import UserForm from './pages/admin/UserForm';
import Schemes from './pages/admin/Schemes';        // ← fixed import
import SchemeForm from './pages/admin/SchemeForm';
import SchemeDetail from './pages/admin/SchemeDetail';
import Installments from './pages/admin/Installments';
import PrizeAllotment from './pages/admin/PrizeAllotment';
import Reports from './pages/admin/Reports';
import MemberDashboard from './pages/member/Dashboard';
import MySchemes from './pages/member/MySchemes';
import InstalmentHistory from './pages/member/InstalmentHistory';
import PrizeDetails from './pages/member/PrizeDetails';
import Profile from './pages/member/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute role="admin"><AdminLayout /></PrivateRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/create" element={<UserForm />} />
            <Route path="users/:id" element={<UserForm />} />
            <Route path="schemes" element={<Schemes />} />
            <Route path="schemes/create" element={<SchemeForm />} />
            <Route path="schemes/:id" element={<SchemeDetail />} />
            <Route path="installments" element={<Installments />} />
            <Route path="prize" element={<PrizeAllotment />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          <Route path="/member" element={<PrivateRoute role="member"><MemberLayout /></PrivateRoute>}>
            <Route index element={<MemberDashboard />} />
            <Route path="schemes" element={<MySchemes />} />
            <Route path="schemes/:id/installments" element={<InstalmentHistory />} />
            <Route path="prize" element={<PrizeDetails />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;