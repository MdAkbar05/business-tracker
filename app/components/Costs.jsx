"use client";
export default function Costs({ acc, c, onRemove }) {
  return (
    <div
      key={c.id}
      className="flex justify-between items-center border-b border-gray-600 py-1"
    >
      <span>{c.name}</span>
      <span>{c.amount}</span>
      <button
        onClick={() => onRemove(acc.id, "costs", c.id)}
        className="ml-2 text-red-300 hover:text-red-500"
      >
        ✖
      </button>
    </div>
  );
}
