// pages/add.tsx
import Head from "next/head";
import type { NextPage } from "next";
import { MainNav } from "../components/MainNav";

const AddPostcardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Postcard App – Add Postcard</title>
        <meta
          name="description"
          content="Add a new postcard to your travel collection."
        />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Add a Postcard
          </h1>
          <p className="mt-2 max-w-prose text-sm text-gray-600">
            This is a placeholder. In later milestones, this page will contain a
            form to create a new postcard.
          </p>
        </header>

        <MainNav />

        <section aria-labelledby="add-placeholder-heading" className="mt-4">
          <h2
            id="add-placeholder-heading"
            className="text-lg font-medium text-gray-900"
          >
            Add postcard placeholder
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            The full postcard form and geocoding flow will be implemented here.
          </p>
        </section>
      </main>
    </>
  );
};

export default AddPostcardPage;
