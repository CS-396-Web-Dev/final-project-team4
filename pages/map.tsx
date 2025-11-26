// pages/map.tsx
import Head from "next/head";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
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

  // Filter postcards with valid coordinates
  const mappablePostcards = postcards.filter(
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
          {mappablePostcards.length === 0 && (
            <span className="block mt-1 text-amber-600">
              No postcards with locations yet. Add postcards with valid addresses to see them here!
            </span>
          )}
        </p>
      </header>

      <section aria-labelledby="map-heading" className="mt-4">
        <h2 id="map-heading" className="sr-only">
          Interactive map of postcard locations
        </h2>
        <div className="w-full h-[600px]">
          <PostcardMap postcards={postcards} />
        </div>
      </section>
    </>
  );
};

export default MapPage;
