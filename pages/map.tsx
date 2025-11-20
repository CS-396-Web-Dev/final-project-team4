// pages/map.tsx
import Head from "next/head";
import type { NextPage } from "next";
import { MainNav } from "../components/MainNav";

const MapPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Postcard App – Map</title>
        <meta
          name="description"
          content="Map view showing the locations of your postcards."
        />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Map</h1>
          <p className="mt-2 max-w-prose text-sm text-gray-600">
            This is a placeholder for the interactive map. In a later milestone,
            this page will show markers for each postcard you have saved.
          </p>
        </header>

        <MainNav />

        <section aria-labelledby="map-placeholder-heading" className="mt-4">
          <h2
            id="map-placeholder-heading"
            className="text-lg font-medium text-gray-900"
          >
            Map page placeholder
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            The Leaflet map and search/filter UI will be implemented here by
            the map feature owner.
          </p>
        </section>
      </main>
    </>
  );
};

export default MapPage;
