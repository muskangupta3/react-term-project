"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditBlock() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-10">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Edit Code
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Block Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code
            </label>
            <textarea
              placeholder="Your code goes here..."
              className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              <Link
                href="/">
                Save
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
