import { prisma } from "@/database";
import Link from "next/link";

export default async function Home() {
  const blocks = await prisma.block.findMany();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Code Blocks
          </h1>

          <Link
            href="/blocks/create"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition"
          >
            + Create Block
          </Link>
        </header>

        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl shadow-inner text-gray-500 space-y-2">
            <p className="italic text-lg">No blocks yet</p>
            <p className="text-sm">Start by creating your first code block ✨</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm">
            {blocks.map((block) => (
              <li key={block.id}>
                <Link
                  href={`/blocks/${block.id}`}
                  className="flex justify-between items-center p-5 hover:bg-gray-50 transition group"
                >
                  <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                    {block.title}
                  </span>
                  <span className="text-gray-400 group-hover:text-blue-500 transition-colors text-sm">
                    View →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
