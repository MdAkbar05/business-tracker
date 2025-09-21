"use client";
export default function Saves({ acc, s, onRemove }) {
  return (
    <div
      key={s.id}
      className="flex justify-between items-center border-b border-gray-600 py-1"
    >
      <span>{s.name}</span>
      <span>{s.amount}</span>
      <button
        onClick={() => onRemove(acc.id, "saves", s.id)}
        className="ml-2 text-red-300 hover:text-red-500"
      >
        ✖
      </button>
    </div>
  );
}
