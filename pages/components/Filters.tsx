interface FiltersProps {
    categories: string[];
    dates: string[];
    categoryFilter: string;
    dateFilter: string;
    setCategoryFilter: (value: string) => void;
    setDateFilter: (value: string) => void;
  }
  
  export default function Filters({
    categories,
    dates,
    categoryFilter,
    dateFilter,
    setCategoryFilter,
    setDateFilter,
  }: FiltersProps) {
    return (
      <section className="flex justify-center gap-6 mb-12 flex-wrap">
        <div>
          <label htmlFor="category-filter" className="block font-semibold mb-1 text-indigo-700">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="rounded text-indigo-700 border border-indigo-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
  
        <div>
          <label htmlFor="date-filter" className="block font-semibold mb-1 text-indigo-700">
            Filter by Date
          </label>
          <select
            id="date-filter"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="rounded text-indigo-700 border border-indigo-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {dates.map((date) => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
      </section>
    );
  }
  