import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/database";
import { cookies } from "next/headers";

async function createBlock(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  const userId = Number((await cookies()).get("user_id")?.value);

  await prisma.block.create({
    data: { title, code, userId },
  });

  redirect("/");
}

export default function CreateBlockPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <form
        action={createBlock}
        className="w-full max-w-xl bg-white p-6 rounded-xl shadow space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800">Create Block</h1>

        <input
          name="title"
          className="w-full p-3 border rounded-lg"
          placeholder="Block Title"
          required
        />

        <textarea
          name="code"
          className="w-full p-3 border rounded-lg h-40"
          placeholder="Write code here..."
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Save
        </button>

        <Link
          href="/"
          className="px-4 py-2 block text-center bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}
