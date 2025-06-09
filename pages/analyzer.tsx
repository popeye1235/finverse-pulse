/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#3B82F6'];

export default function Analyzer() {
  const [transactions, setTransactions] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = JSON.parse(event.target?.result as string);
        setTransactions(result);
      } catch (err) {
        alert('Invalid file format. Please upload a valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Group by category
  const categoryData = transactions.reduce((acc: any, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});
  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  // Group by date
  const dateData = transactions.reduce((acc: any, txn) => {
    acc[txn.date] = (acc[txn.date] || 0) + txn.amount;
    return acc;
  }, {});
  const barData = Object.keys(dateData).map((date) => ({
    date,
    amount: dateData[date],
  }));

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">💰 Spending Analyzer</h1>

      <div className="flex justify-center mb-8">
        <input
          type="file"
          accept=".json,.pdf,.doc,.docx,.xls,.xlsx,.csv"
          onChange={handleFileUpload}
          className="border rounded px-4 py-2 cursor-pointer bg-white shadow"
        />
      </div>

      {transactions.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Pie Chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg text-black font-semibold mb-2">Spending by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg text-black font-semibold mb-2">Spending by Date</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        {transactions.length > 0 ? (
          <table className="w-full text-sm text-left border-collapse border border-gray-300 bg-white shadow-md rounded">
            <thead>
              <tr className="bg-blue-100 text-gray-800">
                <th className="border p-2">📅 Date</th>
                <th className="border p-2">🏷️ Category</th>
                <th className="border p-2">💵 Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index} className="hover:bg-blue-50">
                  <td className="text-black border p-2">{txn.date}</td>
                  <td className="text-black border p-2">{txn.category}</td>
                  <td className="text-black border p-2 font-medium">₹{txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-8">Upload a valid JSON file to analyze spending.</p>
        )}
      </div>
    </main>
  );
}
