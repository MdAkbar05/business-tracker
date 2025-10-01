"use client";
import PopupConfirm from "./Popup";

export default function Saves({ acc, s, onRemove }) {
  return (
    <tr className="border-b border-gray-600">
      <td className="px-2 py-1">{s.name}</td>
      <td className="px-2 py-1">{s.amount}</td>
      <td className="px-2 py-1 text-center">
        <PopupConfirm
          message="Are you sure you want to delete this item?"
          onConfirm={() => onRemove(acc.id, "saves", s.id)}
          button={
            <button className="ml-2 text-red-300 hover:text-red-500 hover:scale-105 transition-all duration-300 hover:rotate-90 cursor-pointer">
              ✖
            </button>
          }
        />
      </td>
    </tr>
  );
}
