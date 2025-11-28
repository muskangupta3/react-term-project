import { prisma } from "@/prisma.client";
import Link from "next/link";
import { Suspense } from "react";
import { requireUser } from "./login/auth";

export default async function Home() {
  const userId = await requireUser();

  return (
    <Suspense fallback={<SkeletonBlocks />}>
      <BlocksList userId={userId} />
    </Suspense>
  );
}

async function BlocksList({ userId }: { userId: number }) {
  const blocks = await prisma.block.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">
            Code Blocks
          </h1>
          <Link
            href="/blocks/create"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Block
          </Link>
        </header>

        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl shadow-inner text-gray-500">
            <p className="italic text-lg">No blocks yet</p>
            <p className="text-sm">Start by creating your first code block ✨</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm">
            {blocks.map((block) => (
              <li key={block.id}>
                <Link
                  href={`/blocks/${block.id}`}
                  className="flex justify-between items-center p-5 hover:bg-gray-50 group"
                >
                  <span className="font-medium text-gray-800 group-hover:text-blue-600">
                    {block.title}
                  </span>
                  <span className="text-gray-400 group-hover:text-blue-500 text-sm">
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

function SkeletonBlocks() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 animate-pulse">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="h-8 w-40 bg-gray-300 rounded" />
          <div className="h-10 w-32 bg-gray-300 rounded" />
        </header>

        <ul className="divide-y divide-gray-100 bg-white rounded-xl shadow-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="p-5">
              <div className="h-5 w-48 bg-gray-300 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
