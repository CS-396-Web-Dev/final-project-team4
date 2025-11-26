// pages/index.tsx
import Head from "next/head";
import type { NextPage } from "next";
import { useState, useMemo } from "react";
import { usePostcards } from "../hooks/usePostcards";
import { PostcardCard } from "../components/PostcardCard";

type SortOption = "name-asc" | "name-desc" | "date-newest" | "date-oldest";

const HomePage: NextPage = () => {
  const { postcards } = usePostcards();
  const [sortBy, setSortBy] = useState<SortOption>("date-newest");

  // Sort postcards based on selected option
  const sortedPostcards = useMemo(() => {
    const sorted = [...postcards];

    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "date-newest":
        return sorted.sort((a, b) => 
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      case "date-oldest":
        return sorted.sort((a, b) => 
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        );
      default:
        return sorted;
    }
  }, [postcards, sortBy]);

  return (
    <>
      <Head>
        <title>Postcard App – Home</title>
        <meta
          name="description"
          content="View your current and future postcard collection."
        />
      </Head>
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Your Postcard Collection
          </h1>
          
          {postcards.length > 0 && (
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              >
                <option value="date-newest">Date (Newest First)</option>
                <option value="date-oldest">Date (Oldest First)</option>
                <option value="name-asc">Name (A to Z)</option>
                <option value="name-desc">Name (Z to A)</option>
              </select>
            </div>
          )}
        </div>
      </header>

      <section aria-labelledby="postcards-heading">
        <h2 id="postcards-heading" className="sr-only">
          Postcards
        </h2>
        {sortedPostcards.length === 0 ? (
          <p className="text-gray-600">No postcards yet. Add your first one!</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPostcards.map((postcard) => (
              <PostcardCard key={postcard.id} postcard={postcard} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default HomePage;
