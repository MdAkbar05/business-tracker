"use client";
import { useEffect, useState } from "react";
import Costs from "./components/Costs";
import Saves from "./components/Saves";
import Extras from "./components/Extras";
import AccountSkeleton from "./components/AccountSkeleton";

export default function AccountsApp() {
  const [accountsData, setAccountsData] = useState({
    isLoading: true,
    data: null,
    error: null,
  });

  const [searchDate, setSearchDate] = useState("");
  const [user, setUser] = useState(null); // logged-in user state
  const [showLogin, setShowLogin] = useState(false); // popup state
  const [loginForm, setLoginForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "cost",
  });
  const [dateInput, setDateInput] = useState("");

  // ✅ Load user from localStorage at first
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setShowLogin(true);
    }
  }, []);

  const fetchAccounts = async () => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) =>
        setAccountsData({
          isLoading: false,
          data: data.filter((acc) => acc.user.id === user.id), // filter by user id
          error: null,
        })
      )
      .catch((error) =>
        setAccountsData({ isLoading: false, data: null, error })
      );
  };

  // ✅ Fetch accounts data if user exists
  useEffect(() => {
    if (!user) return;

    fetchAccounts();
  }, [user]);

  // ✅ Login handler
  const handleLogin = async () => {
    try {
      const loginData = {
        email: loginForm.email,
        password: loginForm.password,
      };
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (data?.id) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setShowLogin(false);
      } else {
        alert(data?.error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleCreate = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();
      if (data?.id) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setShowLogin(false);
      } else {
        alert(data?.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      handleLogin();
    } else {
      handleCreate();
    }
  };
  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogin(true); // show login popup again
  };

  // ✅ Add new account
  const addAccount = async (userId) => {
    if (!dateInput) return;
    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, date: dateInput }),
    });

    const data = await res.json();
    if (data?.status === 400) {
      alert(data?.error);
    } else {
      fetchAccounts();
    }

    // Your API call to add new account here
    setDateInput("");
  };

  // ✅ Remove account
  const removeAccount = async (userId, accountId) => {
    // Your API call here
    if (!window.confirm("Are you sure you want to delete this account?"))
      return;
    const res = await fetch(`/api/accounts/${accountId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    setAccountsData((prev) => {
      return {
        ...prev,
        data: prev.data.filter((acc) => acc.id !== accountId),
      };
    });
  };

  // ✅ Add entry
  const addEntry = async (accountId) => {
    if (!form.description || !form.amount) return;
    const res = await fetch(`/api/accounts/${accountId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountId,
        type: form.type,
        description: form.description,
        amount: parseFloat(form.amount),
      }),
    });
    const data = await res.json();
    if (data?.status === 404) {
      alert(data?.error);
    } else {
      fetchAccounts();
    }
    // Your API call to add entry here
    setForm({ description: "", amount: "", type: "cost" });
  };

  // ✅ Remove item
  const removeItem = async (accountId, type, itemId) => {
    const res = await fetch(`/api/accounts/${accountId}/${type}/${itemId}`, {
      method: "DELETE",
    });
    fetchAccounts();
    // Your API call here
  };

  const totalCost = accountsData.data
    ? accountsData.data.reduce(
        (sum, acc) =>
          sum + (acc.costs?.reduce((a, c) => a + (c.amount || 0), 0) || 0),
        0
      )
    : 0;

  // Similarly, for saves and extras:
  const totalSave = accountsData.data
    ? accountsData.data.reduce(
        (sum, acc) =>
          sum + (acc.saves?.reduce((a, s) => a + (s.amount || 0), 0) || 0),
        0
      )
    : 0;

  const totalExtra = accountsData.data
    ? accountsData.data.reduce(
        (sum, acc) =>
          sum + (acc.extras?.reduce((a, e) => a + (e.amount || 0), 0) || 0),
        0
      )
    : 0;
  let totalRevenue = totalSave + totalExtra - totalCost;
  // negative number to positive number
  totalRevenue = totalRevenue < 0 ? Math.abs(totalRevenue) : 0;

  // ✅ Show login popup if not logged in
  if (showLogin) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl w-96"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            {mode === "login" ? "Login" : "Create Account"}
          </h2>
          {mode === "create" && (
            <input
              type="name"
              placeholder="name"
              required
              value={loginForm.name}
              onChange={(e) =>
                setLoginForm({ ...loginForm, name: e.target.value })
              }
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
          {mode === "login" ? (
            <button
              onClick={() => setMode("create")}
              className=" w-full bg-green-600 py-2 rounded hover:bg-green-500 mt-2"
            >
              Create Account
            </button>
          ) : (
            <button
              onClick={() => setMode("login")}
              className=" w-full bg-green-600 py-2 rounded hover:bg-green-500 mt-2"
            >
              Login Account
            </button>
          )}
        </form>
      </div>
    );
  }

  // search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchDate) return;
    setAccountsData({ isLoading: true, data: null, error: null });

    try {
      const res = await fetch(
        `/api/accounts/search?date=${searchDate}&userId=${user.id}`
      );
      const data = await res.json();
      if (res.ok) {
        setAccountsData({
          isLoading: false,
          data,
          error: null,
        });
        console.log(accountsData.isLoading);
      } else {
        alert(data.error || "No account found & Show all data");
        fetchAccounts();
        console.log(accountsData.isLoading);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold  text-center">
          Business Tracker | {user?.name}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-2 rounded hover:bg-red-500"
        >
          Logout
        </button>
      </div>
      {/* 🔍 Search by Date */}
      <div className="flex justify-center items-center">
        <form onSubmit={handleSearch} className="mb-6 flex gap-4">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-500"
          >
            Search
          </button>
        </form>
      </div>

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
          <h2 className="text-lg font-semibold">Sell Revenue</h2>
          <p className="text-2xl font-bold">{totalRevenue}</p>
        </div>
      </div>

      {/* Accounts */}
      <div className="space-y-6">
        {accountsData.data?.length > 0 ? (
          accountsData.data.map((acc) => (
            <div key={acc.id} className="bg-gray-800 rounded-xl p-6 shadow">
              <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
                <h2 className="text-xl font-bold whitespace-nowrap">
                  Account Date: <br /> {acc.date}
                </h2>

                <button
                  onClick={() => removeAccount(user.id, acc.id)}
                  className="text-red-300 hover:bg-red-600 font-bold text-lg px-2 py-1 rounded bg-red-500 cursor-pointer whitespace-nowrap"
                >
                  Delete ✖
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Costs */}
                <div className="bg-red-900/40 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Costs</h3>
                  {acc.costs.map((c) => (
                    <Costs key={c.id} acc={acc} c={c} onRemove={removeItem} />
                  ))}
                  <hr className="my-2 border-gray-600" />
                  <p className="font-semibold text-lg mt-2">
                    Total: {acc.costs.reduce((a, c) => a + c.amount, 0)}
                  </p>
                </div>

                {/* Saves */}
                <div className="bg-green-900/40 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Saves</h3>
                  {acc.saves.map((s) => (
                    <Saves key={s.id} acc={acc} s={s} onRemove={removeItem} />
                  ))}
                  <hr className="my-2 border-gray-600" />
                  <p className="font-semibold text-lg mt-2">
                    Total: {acc.saves.reduce((a, c) => a + c.amount, 0)}
                  </p>
                </div>

                {/* Extras */}
                <div className="bg-yellow-900/40 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Extras</h3>
                  {acc.extras.map((e) => (
                    <Extras key={e.id} acc={acc} e={e} onRemove={removeItem} />
                  ))}
                  <hr className="my-2 border-gray-600" />
                  <p className="font-semibold text-lg mt-2">
                    Total: {acc.extras.reduce((a, c) => a + c.amount, 0)}
                  </p>
                </div>
              </div>

              {/* Costs / Saves / Extras go here */}
              {/* same as before, but now use user.id */}
              {/* Add entry form */}
              <div className="mt-6 p-4 border border-gray-600 rounded-lg">
                <h3 className="mb-3 font-semibold">Add Entry</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
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
                    onClick={() => addEntry(acc.id)}
                    className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <AccountSkeleton />
        )}
        {accountsData.data?.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-3">No accounts found</h2>
            <p className="text-gray-400">Add an account to get started</p>
          </div>
        )}
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
