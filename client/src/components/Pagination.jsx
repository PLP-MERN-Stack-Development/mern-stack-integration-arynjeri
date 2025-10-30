// src/components/Pagination.jsx
export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-4 py-2">Page {page} of {totalPages}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}