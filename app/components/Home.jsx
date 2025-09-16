import Account from "./Account";

export default function Home({ user, db, setDb, setCurrentUser }) {
  const handleLogout = () => setCurrentUser(null);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-red-700 p-4 rounded-xl text-center">
          Total Costs: {totalCost}
        </div>
        <div className="bg-green-700 p-4 rounded-xl text-center">
          Total Saves: {totalSave}
        </div>
        <div className="bg-yellow-600 p-4 rounded-xl text-center">
          Total Extras: {totalExtra}
        </div>
        <div className="bg-blue-700 p-4 rounded-xl text-center">
          Net Revenue: {totalSave + totalExtra - totalCost}
        </div>
      </div>

      <div className="space-y-6">
        {user.accounts.map((acc) => (
          <Account key={acc.id} acc={acc} user={user} setDb={setDb} />
        ))}
      </div>
    </div>
  );
}
