"use client";
import { useState } from "react";

export default function AccountsApp() {
  const [db, setDb] = useState({
    users: [
      {
        id: 1,
        name: "Shop Owner",
        email: "owner@example.com",
        accounts: [],
      },
    ],
  });

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "cost",
  });

  const [dateInput, setDateInput] = useState("");

  // ✅ Add entry
  const addEntry = (userId, accountId) => {
    if (!form.description || !form.amount) return;

    setDb((prev) => ({
      ...prev,
      users: prev.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              accounts: user.accounts.map((acc) =>
                acc.id === accountId
                  ? {
                      ...acc,
                      [form.type + "s"]: [
                        ...acc[form.type + "s"],
                        {
                          id: Date.now(),
                          description: form.description,
                          amount: parseFloat(form.amount),
                        },
                      ],
                    }
                  : acc
              ),
            }
          : user
      ),
    }));

    setForm({ description: "", amount: "", type: "cost" });
  };

  // ✅ Add new account
  const addAccount = (userId) => {
    if (!dateInput) return;
    setDb((prev) => ({
      ...prev,
      users: prev.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              accounts: [
                ...user.accounts,
                {
                  id: Date.now(),
                  date: dateInput,
                  costs: [],
                  saves: [],
                  extras: [],
                },
              ],
            }
          : user
      ),
    }));
    setDateInput("");
  };

  // ✅ Remove account
  const removeAccount = (userId, accountId) => {
    setDb((prev) => ({
      ...prev,
      users: prev.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              accounts: user.accounts.filter((acc) => acc.id !== accountId),
            }
          : user
      ),
    }));
  };

  // ✅ Remove item from cost/save/extra
  const removeItem = (userId, accountId, type, itemId) => {
    setDb((prev) => ({
      ...prev,
      users: prev.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              accounts: user.accounts.map((acc) =>
                acc.id === accountId
                  ? {
                      ...acc,
                      [type]: acc[type].filter((item) => item.id !== itemId),
                    }
                  : acc
              ),
            }
          : user
      ),
    }));
  };

  const user = db.users[0];

  // ✅ Summary
  const totalCost = user.accounts.reduce(
    (sum, acc) => sum + acc.costs.reduce((a, c) => a + c.amount, 0),
    0
  );
  const totalSave = user.accounts.reduce(
    (sum, acc) => sum + acc.saves.reduce((a, s) => a + s.amount, 0),
    0
  );
  const totalExtra = user.accounts.reduce(
    (sum, acc) => sum + acc.extras.reduce((a, e) => a + e.amount, 0),
    0
  );
  const totalRevenue = totalSave + totalExtra - totalCost;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Business Tracker | {user.name}
      </h1>

      {/* Summary */}
      <div className="flex justify-around items-center flex-wrap  gap-6 mb-8 ">
        <div className="bg-red-700 p-4 rounded-xl text-center flex-2/12 min-w-44">
          <h2 className="text-lg font-semibold">Total Costs</h2>
          <p className="text-2xl font-bold">{totalCost}</p>
        </div>
        <div className="bg-green-700 p-4 rounded-xl text-center flex-2/12 min-w-44">
          <h2 className="text-lg font-semibold">Total Saves</h2>
          <p className="text-2xl font-bold">{totalSave}</p>
        </div>
        <div className="bg-yellow-600 p-4 rounded-xl text-center flex-2/12 min-w-44">
          <h2 className="text-lg font-semibold">Total Extras</h2>
          <p className="text-2xl font-bold">{totalExtra}</p>
        </div>
        <div className="bg-blue-700 p-4 rounded-xl text-center flex-2/12 min-w-44">
          <h2 className="text-lg font-semibold">Net Revenue</h2>
          <p className="text-2xl font-bold">{totalRevenue}</p>
        </div>
      </div>

      {/* Accounts */}
      <div className="space-y-6">
        {user.accounts.map((acc) => (
          <div key={acc.id} className="bg-gray-800 rounded-xl p-6 shadow">
            {/* Account header with remove button */}
            <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
              <h2 className="text-xl font-bold">Account Date: {acc.date}</h2>
              <button
                onClick={() => removeAccount(user.id, acc.id)}
                className="text-red-400 hover:text-red-600 font-bold text-lg"
              >
                ✖
              </button>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-6">
              {/* Costs */}
              <div className="bg-red-900/40 p-4 rounded-lg flex-4/12 min-w-sm">
                <h3 className="font-semibold mb-3">Costs</h3>
                {acc.costs.map((c) => (
                  <div
                    key={c.id}
                    className="flex justify-between items-center border-b border-gray-600 py-1"
                  >
                    <span>{c.description}</span>
                    <span>{c.amount}</span>
                    <button
                      onClick={() => removeItem(user.id, acc.id, "costs", c.id)}
                      className="ml-2 text-red-300 hover:text-red-500"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>

              {/* Saves */}
              <div className="bg-green-900/40 p-4 rounded-lg flex-4/12 min-w-sm">
                <h3 className="font-semibold mb-3">Saves</h3>
                {acc.saves.map((s) => (
                  <div
                    key={s.id}
                    className="flex justify-between items-center border-b border-gray-600 py-1"
                  >
                    <span>{s.description}</span>
                    <span>{s.amount}</span>
                    <button
                      onClick={() => removeItem(user.id, acc.id, "saves", s.id)}
                      className="ml-2 text-red-300 hover:text-red-500"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>

              {/* Extras */}
              <div className="bg-yellow-900/40 p-4 rounded-lg flex-4/12 min-w-sm">
                <h3 className="font-semibold mb-3">Extras</h3>
                {acc.extras.map((e) => (
                  <div
                    key={e.id}
                    className="flex justify-between items-center border-b border-gray-600 py-1"
                  >
                    <span>{e.description}</span>
                    <span>{e.amount}</span>
                    <button
                      onClick={() =>
                        removeItem(user.id, acc.id, "extras", e.id)
                      }
                      className="ml-2 text-red-300 hover:text-red-500"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add entry form */}
            <div className="mt-6 p-4 border border-gray-600 rounded-lg">
              <h3 className="mb-3 font-semibold">Add Entry</h3>
              <div className="grid grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
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
                  onClick={() => addEntry(user.id, acc.id)}
                  className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-500"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add new account */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Add New Account</h2>
        <div className="flex gap-4">
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="border p-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={() => addAccount(user.id)}
            className="bg-green-600 px-3 py-2 rounded hover:bg-green-500"
          >
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
}
