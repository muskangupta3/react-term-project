"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function EditBlock() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  function adjustTextareaHeight() {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`/api/blocks/${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setTitle(data.title ?? "");
        setCode(data.code ?? "");
      } catch (err) {
        const e = err as { name?: string } | undefined;
        if (e?.name !== "AbortError") setError("Could not load block.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    // adjust height after code loads/changes
    adjustTextareaHeight();
  }, [code]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/blocks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, code }),
      });
      if (!res.ok) throw new Error("Save failed");
      const updated = await res.json();
      router.push(`/blocks/${updated.id}`);
    } catch {
      setError("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-10">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Edit Code</h1>

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Block Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
              <textarea
                ref={taRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Your code goes here..."
                rows={6}
                style={{ resize: "none", overflow: "hidden" }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <Link href={`/blocks/${id}`} className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</Link>
              <button
                disabled={saving}
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
