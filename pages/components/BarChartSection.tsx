/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartSectionProps {
  transactions: any[];
}

export default function BarChartSection({ transactions }: BarChartSectionProps) {
  // Aggregate amount by date
  const dateData = transactions.reduce((acc: Record<string, number>, txn) => {
    acc[txn.date] = (acc[txn.date] || 0) + txn.amount;
    return acc;
  }, {});

  const barData = Object.entries(dateData).map(([date, amount]) => ({ date, amount }));

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-indigo-800 mb-4 border-b border-indigo-200 pb-2">
        Spending by Date
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#4c51bf' }}
            angle={-45}
            textAnchor="end"
            height={60}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={(val) => `₹${val}`}
            tick={{ fontSize: 12, fill: '#4c51bf' }}
          />
          <Tooltip
            formatter={(value: number) => `₹${value.toLocaleString()}`}
            contentStyle={{ borderRadius: 10, backgroundColor: '#f9fafb' }}
          />
          <Bar dataKey="amount" fill="#4F46E5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
