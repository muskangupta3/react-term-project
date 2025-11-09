"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ViewBlock() {
  const params = useParams();
  const id = params.id;

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

          <div className="flex items-center gap-3">
            <Link
              href={`/blocks/${id}/edit`}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </Link>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </header>

        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Block Title
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Block Code
          </p>
        </section>
      </div>
    </div>
  );
}
