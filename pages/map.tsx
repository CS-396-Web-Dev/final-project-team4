// pages/map.tsx
import Head from "next/head";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import Link from "next/link";
import { usePostcards } from "@/hooks/usePostcards";

// Dynamic import to avoid SSR issues with Leaflet
const PostcardMap = dynamic(
  () => import("@/components/PostcardMap").then((mod) => mod.PostcardMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg shadow-md flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
  }
);

const MapPage: NextPage = () => {
  const { postcards } = usePostcards();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter postcards based on search query
  const filteredPostcards = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) {
      return postcards;
    }

    return postcards.filter(
      (postcard) =>
        postcard.title.toLowerCase().includes(query) ||
        postcard.location.toLowerCase().includes(query)
    );
  }, [postcards, searchQuery]);

  // Filter for only postcards with valid coordinates
  const mappablePostcards = filteredPostcards.filter(
    (postcard) => postcard.lat !== null && postcard.lng !== null
  );

  return (
    <>
      <Head>
        <title>Postcard App – Map</title>
        <meta
          name="description"
          content="Map view showing the locations of your postcards."
        />
      </Head>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Map View</h1>
        <p className="mt-2 max-w-prose text-sm text-gray-600">
          Explore your postcard collection on an interactive map.
          {postcards.filter((p) => p.lat !== null && p.lng !== null).length === 0 && (
            <span className="block mt-1 text-amber-600">
              No postcards with locations yet. Add postcards with valid addresses to see them here!
            </span>
          )}
        </p>
      </header>

      {/* Search Input */}
      <div className="mb-4">
        <label htmlFor="map-search" className="block text-sm font-medium text-gray-700 mb-2">
          Search postcards
        </label>
        <input
          id="map-search"
          type="text"
          placeholder="Search by title or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            Found {mappablePostcards.length} postcard{mappablePostcards.length !== 1 ? 's' : ''} on map
            {filteredPostcards.length !== mappablePostcards.length && (
              <span className="text-amber-600">
                {' '}({filteredPostcards.length - mappablePostcards.length} without location)
              </span>
            )}
          </p>
        )}
      </div>

      {/* Conditional layout: full width if no search, grid if search results */}
      {searchQuery && filteredPostcards.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Map Section with sidebar */}
          <section aria-labelledby="map-heading" className="xl:col-span-3">
            <h2 id="map-heading" className="sr-only">
              Interactive map of postcard locations
            </h2>
            <div className="w-full h-[500px] md:h-[650px] lg:h-[750px]">
              <PostcardMap postcards={filteredPostcards} />
            </div>
          </section>

          {/* Filtered Postcards List */}
          <aside aria-labelledby="results-heading" className="xl:col-span-1">
            <h2 id="results-heading" className="text-lg font-semibold mb-3">
              Search Results ({filteredPostcards.length})
            </h2>
            <ul className="space-y-3 max-h-[500px] md:max-h-[650px] lg:max-h-[750px] overflow-y-auto">
              {filteredPostcards.map((postcard) => (
                <li key={postcard.id}>
                  <Link
                    href={`/post/${postcard.id}`}
                    className="block p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    {postcard.imageUrl && (
                      <img
                        src={postcard.imageUrl}
                        alt={postcard.title}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    )}
                    <h3 className="font-semibold text-sm mb-1">{postcard.title}</h3>
                    <p className="text-xs text-gray-600 mb-1">{postcard.location}</p>
                    {postcard.lat === null || postcard.lng === null ? (
                      <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded">
                        No location
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                        On map
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      ) : (
        /* Full width map when no search */
        <section aria-labelledby="map-heading">
          <h2 id="map-heading" className="sr-only">
            Interactive map of postcard locations
          </h2>
          <div className="w-full h-[500px] md:h-[650px] lg:h-[750px] xl:h-[800px]">
            <PostcardMap postcards={filteredPostcards} />
          </div>
        </section>
      )}
    </>
  );
};

export default MapPage;
