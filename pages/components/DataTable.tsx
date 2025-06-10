/* eslint-disable @typescript-eslint/no-explicit-any */
interface DataTableProps {
    transactions: any[];
  }
  
  export default function DataTable({ transactions }: DataTableProps) {
    return (
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-indigo-100 text-indigo-900 font-semibold">
            <tr>
              <th className="border border-indigo-200 p-3">📅 Date</th>
              <th className="border border-indigo-200 p-3">🏷️ Category</th>
              <th className="border border-indigo-200 p-3 text-right">💵 Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr
                key={index}
                className={`hover:bg-indigo-50 ${index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'}`}
              >
                <td className="border border-indigo-200 p-3 text-indigo-800 font-medium">{txn.date}</td>
                <td className="border border-indigo-200 p-3 text-indigo-800">{txn.category}</td>
                <td className="border border-indigo-200 p-3 text-indigo-800 font-semibold text-right">
                  ₹{txn.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  