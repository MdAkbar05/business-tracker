"use client";
import { useState } from "react";
import Loader from "./Loader";

export default function AddEntryForm({ accountId, onAdd, isCreating }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "cost",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    onAdd(accountId, form);
    setForm({ description: "", amount: "", type: "cost" }); // reset after add
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 border border-gray-600 rounded-lg"
    >
      <h3 className="mb-3 font-semibold">Add Entry</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          type="submit"
          className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-500"
        >
          {isCreating ? <Loader /> : "Add"}
        </button>
      </div>
    </form>
  );
}
