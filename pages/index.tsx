// pages/index.tsx
import Head from "next/head";
import type { NextPage } from "next";
import { usePostcards } from "../hooks/usePostcards";
import { PostcardCard } from "../components/PostcardCard";

const HomePage: NextPage = () => {
  const { postcards } = usePostcards();

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
        <h1 className="text-3xl font-semibold tracking-tight">
          Your Postcard Collection
        </h1>
      </header>

      <section aria-labelledby="postcards-heading">
        <h2 id="postcards-heading" className="sr-only">
          Postcards
        </h2>
        {postcards.length === 0 ? (
          <p className="text-gray-600">No postcards yet. Add your first one!</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postcards.map((postcard) => (
              <PostcardCard key={postcard.id} postcard={postcard} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default HomePage;
