import { prisma } from "@/prisma.client";
import { requireUser } from "../../login/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "../DeleteButton";

export default async function BlockView(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  await requireUser();

  const blockId = Number(id);
  if (isNaN(blockId)) redirect("/");

  const block = await prisma.block.findUnique({ where: { id: blockId } });
  if (!block) redirect("/");

  const handleDelete = async () => {
    "use server";
    await prisma.block.delete({ where: { id: block.id } });
    redirect("/");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto space-y-6 bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            ← Back
          </Link>

          <div className="flex gap-3">
            <Link
              href={`/blocks/${block.id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </Link>

            <DeleteButton onDelete={handleDelete} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">{block.title}</h1>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {block.code}
        </pre>

      </div>
    </main>
  );
}
