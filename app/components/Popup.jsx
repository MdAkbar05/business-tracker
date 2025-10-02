"use client";
import { useState } from "react";

export default function PopupConfirm({ message, onConfirm, button }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleYes = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger button */}
      <div onClick={() => setIsOpen(true)}>{button}</div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div
            className={`bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 ${
              isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-black">Confirm</h2>
            <p className="mb-6 text-gray-700">{message}</p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={handleYes}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
