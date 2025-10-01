"use client";
import { useEffect, useState } from "react";

import LogoutButton from "./components/LogoutButton";
import AccountsList from "./components/AccountsList";
import LoginPopup from "./components/LoginPopup";
import Loader from "./components/Loader";

export default function AccountsApp() {
  const [accountsData, setAccountsData] = useState({
    isLoading: true,
    data: null,
    error: null,
  });
  const [isCreating, setIsCreating] = useState(false); // for creating account
  const [isDeleting, setIsDeleting] = useState(false); // for deleting account
  const [isRemoving, setIsRemoving] = useState(false); // for removing entry

  const [searchDate, setSearchDate] = useState("");
  const [user, setUser] = useState(null); // logged-in user state
  const [showLogin, setShowLogin] = useState(false); // popup state
  const [loginForm, setLoginForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [mode, setMode] = useState("login");

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
    setIsCreating(false);
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
    setIsCreating(true);
    try {
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
      setDateInput("");
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Remove account
  const removeAccount = async (userId, accountId) => {
    setIsDeleting(true);
    const res = await fetch(`/api/accounts/${accountId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setAccountsData((prev) => {
      return {
        ...prev,
        data: prev.data.filter((acc) => acc.id !== accountId),
      };
    });
    setIsDeleting(false);
  };

  // ✅ Add entry
  const addEntry = async (accountId, form) => {
    setIsCreating(true);
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
      setIsCreating(false);
      fetchAccounts();
    }
  };

  // ✅ Remove item
  const removeItem = async (accountId, type, itemId) => {
    setIsRemoving(true);
    const res = await fetch(`/api/accounts/${accountId}/${type}/${itemId}`, {
      method: "DELETE",
    });
    fetchAccounts();
    setIsRemoving(false);
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
      <LoginPopup
        mode={mode}
        setMode={setMode}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleSubmit={handleSubmit}
      />
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
      } else {
        alert(data.error || "No account found & Show all data");
        fetchAccounts();
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
        <LogoutButton onClick={handleLogout} />
      </div>
      {/* 🔍 Search by Date */}
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSearch}
          className="mb-6 flex gap-3 justify-center items-center"
        >
          <div className="relative">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="
        block w-52 px-4 py-2
        bg-gray-50 text-gray-900
        border border-gray-300 rounded-md
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
        transition-all duration-200
      "
            />
          </div>

          <button
            type="submit"
            className="
      bg-blue-600 text-white font-medium
      px-4 py-2 rounded-md
      hover:bg-blue-500
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      transition-colors duration-200
    "
          >
            Search
          </button>
        </form>
      </div>

      {/* Summary */}
      <div className="flex justify-around items-center flex-wrap gap-6 mb-8">
        <div className="bg-red-700 p-4 rounded-xl text-center flex-2/12 min-w-44">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-2xl font-bold">{totalCost}</p>
        </div>

        <div className="bg-green-700 p-4 rounded-xl text-center flex-2/12 min-w-44">
          <h2 className="text-lg font-semibold">Savings</h2>
          <p className="text-2xl font-bold">{totalSave}</p>
        </div>

        <div className="bg-yellow-600 p-4 rounded-xl text-center flex-2/12 min-w-44">
          <h2 className="text-lg font-semibold">Additional Savings</h2>
          <p className="text-2xl font-bold">{totalExtra}</p>
        </div>

        <div className="bg-blue-700 p-4 rounded-xl text-center flex-2/12 min-w-44">
          <h2 className="text-lg font-semibold">Net Revenue</h2>
          <p className="text-2xl font-bold">{totalRevenue}</p>
        </div>
      </div>

      {/* Accounts */}
      <AccountsList
        accountsData={accountsData}
        user={user}
        removeAccount={removeAccount}
        removeItem={removeItem}
        addEntry={addEntry}
        isDeleting={isDeleting}
        isRemoving={isRemoving}
        isCreating={isCreating}
      />

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
            disabled={isCreating}
          >
            {isCreating ? <Loader /> : "Add Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
