import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from "../../utils/api";
import { UserIcon, ArrowLeftIcon, IdentificationIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ name: '', mobile: '', password: '', aadhaarNo: '', panNo: '', bankAccount: '', bankIfsc: '' });

  useEffect(() => {
    if (isEdit) {
      api.get(`/users/${id}`).then((res) => {
        const { name, mobile, aadhaarNo, panNo, bankAccount, bankIfsc } = res.data;
        setForm({ name: name || '', mobile: mobile || '', password: '', aadhaarNo: aadhaarNo || '', panNo: panNo || '', bankAccount: bankAccount || '', bankIfsc: bankIfsc || '' });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/users/${id}`, form);
      } else {
        await api.post('/users', form);
      }
      navigate('/admin/users');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center space-x-4">
        <Link to="/admin/users" className="p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <UserIcon className="w-8 h-8 mr-3 text-indigo-600" />
            {isEdit ? 'Edit Member Details' : 'Register New Member'}
          </h2>
          <p className="text-gray-500 mt-1">Fill in the member's personal and bank information.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-yellow-400 to-indigo-500"></div>
        <form onSubmit={handleSubmit} className="p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="col-span-full">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 flex items-center">
                <UserIcon className="w-5 h-5 mr-2 text-gray-400" /> Personal Information
              </h3>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input name="name" placeholder="John Doe" value={form.name} onChange={handleChange} className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-gray-50" required />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number *</label>
              <input name="mobile" placeholder="9876543210" value={form.mobile} onChange={handleChange} className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-gray-50" required />
            </div>
            
            {!isEdit && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password *</label>
                <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-gray-50" required />
              </div>
            )}

            <div className="col-span-full mt-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 flex items-center">
                <IdentificationIcon className="w-5 h-5 mr-2 text-gray-400" /> Identity Details
              </h3>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Aadhaar Number</label>
              <input name="aadhaarNo" placeholder="1234 5678 9012" value={form.aadhaarNo} onChange={handleChange} className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-gray-50" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">PAN Number</label>
              <input name="panNo" placeholder="ABCDE1234F" value={form.panNo} onChange={handleChange} className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-gray-50 uppercase" />
            </div>

            <div className="col-span-full mt-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 flex items-center">
                <BuildingLibraryIcon className="w-5 h-5 mr-2 text-gray-400" /> Bank Details
              </h3>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bank Account Number</label>
              <input name="bankAccount" placeholder="1234567890" value={form.bankAccount} onChange={handleChange} className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-gray-50" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bank IFSC Code</label>
              <input name="bankIfsc" placeholder="SBIN0001234" value={form.bankIfsc} onChange={handleChange} className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 bg-gray-50 uppercase" />
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <Link to="/admin/users" className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors mr-4">
              Cancel
            </Link>
            <button type="submit" className="bg-black text-yellow-400 px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              {isEdit ? 'Save Changes' : 'Create Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}