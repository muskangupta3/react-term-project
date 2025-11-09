"use client";

import Link from "next/link";

export default function CreateBlock() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-6 flex justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <span className="text-xl">←</span>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Create Block</h1>
        </header>

        <form className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Block Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Code Content
            </label>
            <textarea
              placeholder="Your code goes here..."
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
