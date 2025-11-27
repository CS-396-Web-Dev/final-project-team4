// pages/post/[id].tsx
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { usePostcards } from "../../hooks/usePostcards";

const PostcardDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getPostcardById, deletePostcard } = usePostcards();

  const postcard =
    typeof id === "string" ? getPostcardById(id) : null;

  if (!postcard) {
    return (
      <>
        <Head>
          <title>Postcard App – Postcard Not Found</title>
        </Head>
        <div className="text-gray-900 dark:text-white">
          <p>Postcard not found.</p>
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
            Back to Home
          </Link>
        </div>
      </>
    );
  }

  const formattedDate = new Date(postcard.dateAdded).toLocaleDateString();

  const handleDelete = () => {
    if (typeof id === "string") {
      deletePostcard(id);
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Postcard App – {postcard.title}</title>
        <meta
          name="description"
          content="Detail view for a single postcard in your collection."
        />
      </Head>
      <article>
        <figure>
          <img
            src={postcard.imageUrl}
            alt={postcard.title}
            className="w-full rounded-lg object-cover"
          />
          <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {postcard.title}
          </figcaption>
        </figure>

         <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
            <dd
              tabIndex={0}
              aria-label={`Location: ${postcard.location}`}
              className="mt-1 text-base text-gray-900 dark:text-white"
            >
              {postcard.location}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Added</dt>
            <dd
              tabIndex={0}
              aria-label={`Date Added: ${formattedDate}`}
              className="mt-1 text-base text-gray-900 dark:text-white"
            >
              {formattedDate}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
            <dd
              tabIndex={0}
              aria-label={`Description: ${postcard.description}`}
              className="mt-1 text-base text-gray-900 dark:text-white"
            >
              {postcard.description}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Back button clicked, router:", router);
              console.log("Attempting to navigate to /");
              // Use window.location as fallback
              if (router && router.push) {
                router.push("/").catch((err) => {
                  console.error("Router push failed:", err);
                  window.location.href = "/";
                });
              } else {
                console.log("Router not available, using window.location");
                window.location.href = "/";
              }
            }}
            style={{ cursor: "pointer", zIndex: 10 }}
            className="rounded-md bg-gray-200 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back to Home
          </button>
          <Link
            href={`/edit/${postcard.id}`}
            className="rounded-md bg-gray-500 dark:bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </article>
    </>
  );
};

export default PostcardDetailPage;
