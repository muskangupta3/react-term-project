"use client";

import React, { useState } from "react";
import { handleLogin } from "../api";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await handleLogin(formData); // call server action

      if ("error" in result) {
        //setError(result?.error);
        setLoading(false);
        return;
      }

      // success → navigate manually
      window.location.href = "/";
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input name="username" type="text" placeholder="Username" className="border p-2 rounded" required />
        <input name="password" type="password" placeholder="Password" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
