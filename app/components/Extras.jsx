"use client";
export default function Extras({ acc, e, onRemove }) {
  return (
    <div
      key={e.id}
      className="flex justify-between items-center border-b border-gray-600 py-1"
    >
      <span>{e.name}</span>
      <span>{e.amount}</span>
      <button
        onClick={() => onRemove(acc.id, "costs", e.id)}
        className="ml-2 text-red-300 hover:text-red-500"
      >
        ✖
      </button>
    </div>
  );
}
