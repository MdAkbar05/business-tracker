"use client";
import { useState } from "react";

export default function Account({ acc, user, setDb }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "cost",
  });

  const addEntry = () => {
    if (!form.description || !form.amount) return;

    setDb((prev) => ({
      ...prev,
      users: prev.users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              accounts: u.accounts.map((a) =>
                a.id === acc.id
                  ? {
                      ...a,
                      [form.type + "s"]: [
                        ...a[form.type + "s"],
                        {
                          id: Date.now(),
                          description: form.description,
                          amount: parseFloat(form.amount),
                        },
                      ],
                    }
                  : a
              ),
            }
          : u
      ),
    }));

    setForm({ description: "", amount: "", type: "cost" });
  };

  const removeItem = (type, itemId) => {
    setDb((prev) => ({
      ...prev,
      users: prev.users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              accounts: u.accounts.map((a) =>
                a.id === acc.id
                  ? { ...a, [type]: a[type].filter((i) => i.id !== itemId) }
                  : a
              ),
            }
          : u
      ),
    }));
  };

  const removeAccount = () => {
    setDb((prev) => ({
      ...prev,
      users: prev.users.map((u) =>
        u.id === user.id
          ? { ...u, accounts: u.accounts.filter((a) => a.id !== acc.id) }
          : u
      ),
    }));
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
        <h2 className="text-xl font-bold">Date: {acc.date}</h2>
        <button
          onClick={removeAccount}
          className="text-red-400 hover:text-red-600 font-bold text-lg"
        >
          ✖
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {["costs", "saves", "extras"].map((type) => (
          <div
            key={type}
            className={`bg-${
              type === "costs" ? "red" : type === "saves" ? "green" : "yellow"
            }-900/40 p-4 rounded-lg`}
          >
            <h3 className="font-semibold mb-3">{type.toUpperCase()}</h3>
            {acc[type].map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-600 py-1"
              >
                <span>{item.description}</span>
                <span>{item.amount}</span>
                <button
                  onClick={() => removeItem(type, item.id)}
                  className="ml-2 text-red-300 hover:text-red-500"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border border-gray-600 rounded-lg">
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="border p-2 rounded bg-gray-700 text-white"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border p-2 rounded bg-gray-700 text-white"
          >
            <option value="cost">Cost</option>
            <option value="save">Save</option>
            <option value="extra">Extra</option>
          </select>
          <button
            onClick={addEntry}
            className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-500"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
