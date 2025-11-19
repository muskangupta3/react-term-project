"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Block = { id: number; title: string; code: string };

export default function ViewBlock() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [block, setBlock] = useState<Block | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchBlock() {
      try {
        const res = await fetch(`/api/blocks/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        if (mounted) setBlock(data);
      } catch {
        setError("Could not load block.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchBlock();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleDelete() {
    if (!confirm("Delete this block?")) return;
    try {
      const res = await fetch(`/api/blocks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/");
    } catch {
      setError("Could not delete block.");
    }
  }

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
              onClick={handleDelete}
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </header>

        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          {loading ? (
            <p className="text-gray-500">Loading…</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : block ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{block.title}</h2>
              <pre className="text-gray-700 leading-relaxed font-mono whitespace-pre-wrap">{block.code}</pre>
            </>
          ) : (
            <p className="text-gray-500">Block not found.</p>
          )}
        </section>
      </div>
    </div>
  );
}
