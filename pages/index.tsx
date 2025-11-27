// pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { usePostcards } from "../hooks/usePostcards";
import { PostcardCard } from "../components/PostcardCard";

const HomePage: NextPage = () => {
  const { postcards } = usePostcards();

  // Debug logging
  console.log("HomePage rendered, postcards:", postcards);
  console.log("Postcards count:", postcards.length);
  console.log("Postcards with categories:", postcards.filter(p => p?.category).length);

  // Ensure we have valid postcards with categories
  const validPostcards = postcards.filter((p) => p && p.category);
  const visitedPostcards = validPostcards.filter((p) => p.category === "visited");
  const bucketlistPostcards = validPostcards.filter((p) => p.category === "bucketlist");
  
  console.log("Visited postcards:", visitedPostcards.length);
  console.log("Bucketlist postcards:", bucketlistPostcards.length);

  return (
    <>
      <Head>
        <title>Postcard App – Home</title>
        <meta
          name="description"
          content="View your current and future postcard collection."
        />
      </Head>

      {/* Current Collection */}
      <section className="mb-12" aria-labelledby="current-collection-heading">
        <div className="mb-4">
          <h2 id="current-collection-heading" className="text-2xl font-semibold text-gray-900 dark:text-white">
            Current Collection
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Visited</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {visitedPostcards.map((postcard) => (
            <PostcardCard key={postcard.id} postcard={postcard} showDate={true} />
          ))}
          <Link
            href="/add"
            className="flex h-[272px] w-64 flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-colors hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg
              className="h-16 w-16 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Future Collection */}
      <section aria-labelledby="future-collection-heading">
        <div className="mb-4">
          <h2 id="future-collection-heading" className="text-2xl font-semibold text-gray-900 dark:text-white">
            Future Collection
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Bucketlist</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {bucketlistPostcards.map((postcard) => (
            <PostcardCard key={postcard.id} postcard={postcard} showDate={false} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
