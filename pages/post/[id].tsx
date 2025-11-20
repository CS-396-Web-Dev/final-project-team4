// pages/post/[id].tsx
import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { MainNav } from "../../components/MainNav";

const PostcardDetailPlaceholderPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Postcard App – Postcard Detail</title>
        <meta
          name="description"
          content="Detail view for a single postcard in your collection."
        />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Postcard Detail
          </h1>
          <p className="mt-2 max-w-prose text-sm text-gray-600">
            This is a placeholder. Later, it will show the postcard image,
            description, and actions for editing or deleting.
          </p>
        </header>

        <MainNav />

        <section aria-labelledby="postcard-placeholder-heading" className="mt-4">
          <h2
            id="postcard-placeholder-heading"
            className="text-lg font-medium text-gray-900"
          >
            Postcard detail placeholder
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Postcard ID:{" "}
            <span className="font-mono text-gray-900">
              {typeof id === "string" ? id : "loading..."}
            </span>
          </p>
        </section>
      </main>
    </>
  );
};

export default PostcardDetailPlaceholderPage;
