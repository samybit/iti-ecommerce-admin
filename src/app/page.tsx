"use client";

import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">E-commerce Admin Dashboard</h1>
      <p className="mb-6">If you can see this, you are successfully authenticated!</p>

      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Log Out
      </button>

      <div className="mt-8 border-t pt-8">
        <h2 className="text-xl font-semibold text-gray-500">
          Ready for the team to add Recharts and CRUD tables here!
        </h2>
      </div>
    </div>
  );
}