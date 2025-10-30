// src/components/SearchBar.jsx
export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-md p-2 border rounded-md"
    />
  );
}