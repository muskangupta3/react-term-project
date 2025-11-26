"use client";

import { useState } from "react";

export default function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (window.confirm("Are you sure you want to delete this block?")) {
      setLoading(true);
      onDelete();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
