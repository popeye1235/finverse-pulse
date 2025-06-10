/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface PieChartSectionProps {
  transactions: any[];
  colors: string[];
}

export default function PieChartSection({ transactions, colors }: PieChartSectionProps) {
  // Aggregate amount by category
  const categoryData = transactions.reduce((acc: Record<string, number>, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-indigo-800 mb-4 border-b border-indigo-200 pb-2">
        Spending by Category
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={60}
            labelLine={true}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
            isAnimationActive={true}
            animationDuration={800}
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `₹${value.toLocaleString()}`}
            contentStyle={{ borderRadius: 10, backgroundColor: '#f9fafb' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}
