"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Block {
  id: number;
  title: string;
  code: string;
}

export default function EditForm({ block }: { block: Block }) {
  const router = useRouter();
  const [title, setTitle] = useState(block.title);
  const [code, setCode] = useState(block.code);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    await fetch(`/blocks/${block.id}/edit-action`, {
      method: "POST",
      body: JSON.stringify({ title, code }),
    });

    router.push(`/blocks/${block.id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <form
        onSubmit={handleSave}
        className="w-full max-w-xl bg-white p-6 rounded-xl shadow space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800">Edit Block</h1>

        <input
          className="w-full p-3 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded-lg h-40"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
