import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/database";
import { cookies } from "next/headers";

async function createBlock(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  const userId = Number((await cookies()).get("user_id")?.value);

  if (!title || !code) {
    throw new Error("Both title and code are required.");
  }

  await prisma.block.create({
    data: { title, code, userId },
  });

  redirect("/");
}

export default function CreateBlockPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto space-y-6 bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Create Block</h1>

        <form action={createBlock} className="space-y-4">
          <input
            name="title"
            className="w-full p-3 border rounded-lg"
            placeholder="Block Title"
            required
          />

          <textarea
            name="code"
            className="w-full p-3 border rounded-lg h-52"
            placeholder="Write code here..."
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-center font-medium"
            >
              Save
            </button>

            <Link
              href="/"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 text-center font-medium"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
