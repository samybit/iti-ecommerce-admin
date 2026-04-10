"use client";

import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="flex-1 p-8 w-full">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">E-commerce Admin Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Log Out
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300">Successfully authenticated.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Ready to add Recharts and CRUD tables here.
          </p>
        </div>
      </div>
    </div>
  );
}