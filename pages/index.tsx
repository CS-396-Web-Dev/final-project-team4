// pages/index.tsx
import Head from "next/head";
import type { NextPage } from "next";
import { MainNav } from "../components/MainNav";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Postcard App – Home</title>
        <meta
          name="description"
          content="View your current and future postcard collection."
        />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Retro Travel Postcard Collection
          </h1>
          <p className="mt-2 max-w-prose text-sm text-gray-600">
            This is a placeholder home screen. In later milestones it will show
            your current and future postcard collections.
          </p>
        </header>

        <MainNav />

        <section aria-labelledby="home-placeholder-heading" className="mt-4">
          <h2
            id="home-placeholder-heading"
            className="text-lg font-medium text-gray-900"
          >
            Home page placeholder
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Once the UI is built, this page will display your postcards in
            collections, similar to the Figma designs.
          </p>
        </section>
      </main>
    </>
  );
};

export default HomePage;
