/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, lazy, Suspense } from 'react';
import Filters from './components/Filters';
import FileUploader from './components/FileUploader';

const PieChartSection = lazy(() => import('./components/PieChartSection'));
const BarChartSection = lazy(() => import('./components/BarChartSection'));
const DataTable = lazy(() => import('./components/DataTable'));

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#3B82F6'];

export default function Analyzer() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const result = JSON.parse(text);

        if (!Array.isArray(result)) throw new Error('JSON should be an array');
        for (const txn of result) {
          if (
            typeof txn.date !== 'string' ||
            typeof txn.category !== 'string' ||
            typeof txn.amount !== 'number'
          ) {
            throw new Error('Invalid transaction object format');
          }
        }

        setTransactions(result);
      } catch (err) {
        alert('Invalid file format. Please upload a valid JSON array of transactions.');
        setTransactions([]);
      }
    };
    reader.readAsText(file);
  };

  const uniqueCategories = useMemo(() => ['All', ...new Set(transactions.map(txn => txn.category))], [transactions]);
  const uniqueDates = useMemo(() => ['All', ...new Set(transactions.map(txn => txn.date))], [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn =>
      (categoryFilter === 'All' || txn.category === categoryFilter) &&
      (dateFilter === 'All' || txn.date === dateFilter)
    );
  }, [transactions, categoryFilter, dateFilter]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-8">
      <h1 className="text-4xl font-serif font-bold text-center text-indigo-700 mb-10 drop-shadow-md">
        💰 Spending Analyzer
      </h1>

      <FileUploader handleFileUpload={handleFileUpload} />

      {transactions.length > 0 && (
        <Filters
          categories={uniqueCategories}
          dates={uniqueDates}
          categoryFilter={categoryFilter}
          dateFilter={dateFilter}
          setCategoryFilter={setCategoryFilter}
          setDateFilter={setDateFilter}
        />
      )}

      <Suspense fallback={<p className="text-center">Loading visualizations...</p>}>
        {filteredTransactions.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-14">
              <PieChartSection transactions={filteredTransactions} colors={COLORS} />
              <BarChartSection transactions={filteredTransactions} />
            </div>
            <DataTable transactions={filteredTransactions} />
          </>
        ) : (
          <p className="text-center text-gray-500 mt-12 italic">
            Upload a valid JSON file to analyze your spending.
          </p>
        )}
      </Suspense>
    </main>
  );
}
