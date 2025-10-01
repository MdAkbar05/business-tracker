"use client";
import PopupConfirm from "./Popup";

export default function Extras({ acc, e, onRemove }) {
  return (
    <tr className="border-b border-gray-600">
      <td className="px-2 py-1">{e.name}</td>
      <td className="px-2 py-1">{e.amount}</td>
      <td className="px-2 py-1 text-center">
        <PopupConfirm
          message="Are you sure you want to delete this item?"
          onConfirm={() => onRemove(acc.id, "extras", e.id)}
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
