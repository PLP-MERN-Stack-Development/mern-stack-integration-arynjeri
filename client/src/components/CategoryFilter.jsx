// src/components/CategoryFilter.jsx
export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <select
      value={selected || ''}
      onChange={(e) => onSelect(e.target.value || null)}
      className="p-2 border rounded-md"
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}