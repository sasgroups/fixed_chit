import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function SchemeForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    monthlyAmount: '',
    lateFeePerMonth: '',
    maxMembers: '',
    startDate: '',
    durationMonths: '',   // user enters the number of months here
  });

  const [prizeSchedule, setPrizeSchedule] = useState([]);  // auto‑generated
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Update basic fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // When duration changes, create that many empty prize entries
  const handleDurationChange = (e) => {
    const months = parseInt(e.target.value) || 0;
    setForm({ ...form, durationMonths: e.target.value });

    // Build prizeSchedule array with monthNumber and empty prizeAmount
    const newSchedule = Array.from({ length: months }, (_, i) => ({
      monthNumber: i + 1,
      prizeAmount: ''   // empty by default – user fills in
    }));
    setPrizeSchedule(newSchedule);
  };

  // Update a single prize amount
  const updatePrizeAmount = (index, value) => {
    const updated = prizeSchedule.map((entry, i) =>
      i === index ? { ...entry, prizeAmount: value } : entry
    );
    setPrizeSchedule(updated);
  };

  // Remove a prize entry (only if you want to let them adjust manually)
  const removePrizeEntry = (index) => {
    const updated = prizeSchedule.filter((_, i) => i !== index)
      .map((entry, i) => ({ ...entry, monthNumber: i + 1 }));
    setPrizeSchedule(updated);
    // Also update duration field to reflect new length
    setForm({ ...form, durationMonths: updated.length });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Build final payload
    const durationMonths = prizeSchedule.length;
    if (durationMonths === 0) {
      setErrorMsg('Duration must be at least 1 month.');
      return;
    }

    const payload = {
      name: form.name,
      durationMonths,
      monthlyAmount: Number(form.monthlyAmount) || 0,
      lateFeePerMonth: Number(form.lateFeePerMonth) || 0,
      maxMembers: Number(form.maxMembers) || 0,
      startDate: form.startDate,
      prizeSchedule: prizeSchedule.map(entry => ({
        monthNumber: entry.monthNumber,
        prizeAmount: Number(entry.prizeAmount) || 0,
      })),
    };

    try {
      await api.post('/schemes', payload);
      setSuccessMsg('Scheme created successfully! Redirecting...');
      setTimeout(() => navigate('/admin/schemes'), 1500);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Error creating scheme');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create Scheme</h2>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic fields */}
        <input
          name="name"
          placeholder="Scheme Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded border-gray-300"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Duration (Months)</label>
            <input
              type="number"
              name="durationMonths"
              placeholder="e.g., 25"
              value={form.durationMonths}
              onChange={handleDurationChange}
              className="w-full rounded border-gray-300"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Monthly Amount (₹)</label>
            <input
              type="number"
              name="monthlyAmount"
              placeholder="0"
              value={form.monthlyAmount}
              onChange={handleChange}
              className="w-full rounded border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Late Fee per Month (₹)</label>
            <input
              type="number"
              name="lateFeePerMonth"
              placeholder="0"
              value={form.lateFeePerMonth}
              onChange={handleChange}
              className="w-full rounded border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Max Members</label>
            <input
              type="number"
              name="maxMembers"
              placeholder="25"
              value={form.maxMembers}
              onChange={handleChange}
              className="w-full rounded border-gray-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full rounded border-gray-300"
            required
          />
        </div>

        {/* Prize schedule – generated automatically */}
        <div>
          <h4 className="font-semibold mb-2">
            Prize Schedule ({prizeSchedule.length} months)
          </h4>
          {prizeSchedule.length === 0 && (
            <p className="text-gray-500 italic">Enter duration above to generate prize fields</p>
          )}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {prizeSchedule.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-12 font-medium">M{entry.monthNumber}</span>
                <input
                  type="number"
                  placeholder="Amount"
                  value={entry.prizeAmount}
                  onChange={(e) => updatePrizeAmount(index, e.target.value)}
                  className="flex-1 rounded border-gray-300"
                  required
                />
                {/* Optional: remove button */}
                <button
                  type="button"
                  onClick={() => removePrizeEntry(index)}
                  className="text-red-500 hover:text-red-700 text-lg px-1"
                  title="Remove this month"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-yellow-400 py-2 rounded font-bold hover:bg-gray-800"
        >
          Create Scheme
        </button>
      </form>
    </div>
  );
}