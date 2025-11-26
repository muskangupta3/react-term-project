import { prisma } from "@/database";
import { requireUser } from "../../../lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  await requireUser();

  const blockId = Number(id);
  if (isNaN(blockId)) redirect("/");

  const block = await prisma.block.findUnique({ where: { id: blockId } });
  if (!block) redirect("/");

  // ⬅⬅ SERVER ACTION (THIS HANDLES THE SAVE)
  async function updateBlock(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    await prisma.block.update({
      where: { id: blockId },
      data: { title, code },
    });

    redirect(`/blocks/${blockId}`);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto space-y-6 bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Block</h1>

        {/* FIX → Use server action directly */}
        <form action={updateBlock} className="space-y-4">
          <input
            type="text"
            name="title"
            defaultValue={block.title}
            className="w-full px-3 py-2 border rounded"
            required
          />

          <textarea
            name="code"
            defaultValue={block.code}
            className="w-full px-3 py-2 border rounded h-52"
            required
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>

        <Link
          href={`/blocks/${block.id}`}
          className="px-4 py-2 block text-center bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </Link>
      </div>
    </main>
  );
}
