// components/AccountsList.jsx
"use client";

import Costs from "./Costs";
import Saves from "./Saves";
import Extras from "./Extras";
import AccountSkeleton from "./AccountSkeleton";
import PopupConfirm from "./Popup";
import DeleteButton from "./DeleteButton";
import AddEntryForm from "./AddEntryForm";
import { useState } from "react";
import Loader from "./Loader";

export default function AccountsList({
  accountsData,
  user,
  removeAccount,
  removeItem,
  addEntry,
  isDeleting,
  isRemoving,
  isCreating,
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccount = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="space-y-6">
      {accountsData.data?.length > 0 && !isDeleting && !isCreating ? (
        accountsData.data.map((acc, index) => (
          <div key={acc.id} className="bg-gray-800 rounded-xl p-6 shadow">
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleAccount(index);
              }}
              className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4"
            >
              <h2 className="text-xl font-bold whitespace-nowrap">
                Account Date: <br /> {acc.date}
              </h2>

              <PopupConfirm
                message="Are you sure you want to delete this account?"
                onConfirm={() => removeAccount(user.id, acc.id)}
                button={<DeleteButton />}
              />
            </div>

            <div
              className={`transition-all duration-500 overflow-hidden ease-in-out  ${
                openIndex === index ? "max-h-[1200px]" : "max-h-0"
              }`}
            >
              <div className="transition-all duration-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Costs */}
                <div className="bg-red-900/40 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Costs</h3>
                  <div className="overflow-x-auto">
                    {isRemoving ? (
                      <Loader />
                    ) : (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="px-2 py-1">Name</th>
                            <th className="px-2 py-1">Amount</th>
                            <th className="px-2 py-1 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {acc.costs.map((c) => (
                            <Costs
                              key={c.id}
                              acc={acc}
                              c={c}
                              onRemove={removeItem}
                            />
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <hr className="my-2 border-gray-600" />
                  <p className="font-semibold text-lg mt-2">
                    Total: {acc.costs.reduce((a, c) => a + c.amount, 0)}
                  </p>
                </div>

                {/* Saves */}
                <div className="bg-green-900/40 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Saves</h3>
                  <div className="overflow-x-auto">
                    {isRemoving ? (
                      <Loader />
                    ) : (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="px-2 py-1">Name</th>
                            <th className="px-2 py-1">Amount</th>
                            <th className="px-2 py-1 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {acc.saves.map((s) => (
                            <Saves
                              key={s.id}
                              acc={acc}
                              s={s}
                              onRemove={removeItem}
                            />
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <hr className="my-2 border-gray-600" />
                  <p className="font-semibold text-lg mt-2">
                    Total: {acc.saves.reduce((a, c) => a + c.amount, 0)}
                  </p>
                </div>

                {/* Extras */}
                <div className="bg-yellow-900/40 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Extras</h3>
                  <div className="overflow-x-auto">
                    {isRemoving ? (
                      <Loader />
                    ) : (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="px-2 py-1">Name</th>
                            <th className="px-2 py-1">Amount</th>
                            <th className="px-2 py-1 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {acc.extras.map((e) => (
                            <Extras
                              key={e.id}
                              acc={acc}
                              e={e}
                              onRemove={removeItem}
                            />
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <hr className="my-2 border-gray-600" />
                  <p className="font-semibold text-lg mt-2">
                    Total: {acc.extras.reduce((a, c) => a + c.amount, 0)}
                  </p>
                </div>
              </div>

              <AddEntryForm
                key={acc.id}
                accountId={acc.id}
                onAdd={addEntry}
                isCreating={isCreating}
              />
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
  );
}
