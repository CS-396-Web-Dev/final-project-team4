// pages/edit/[id].tsx
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { usePostcards } from "../../hooks/usePostcards";
import { PostcardForm } from "../../components/PostcardForm";
import type { Postcard } from "../../types/postcard";

const EditPostcardPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getPostcardById, updatePostcard } = usePostcards();

  const postcard = typeof id === "string" ? getPostcardById(id) : null;

  if (!postcard) {
    return (
      <>
        <Head>
          <title>Postcard App – Postcard Not Found</title>
        </Head>
        <div>
          <p className="text-gray-600 mb-4">Postcard not found.</p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 underline">
            Back to Home
          </Link>
        </div>
      </>
    );
  }

  const handleSubmit = (
    postcardInput: Omit<Postcard, "id" | "dateAdded" | "lat" | "lng">,
    coords: { lat: number; lng: number } | null,
    date?: string
  ) => {
    if (typeof id !== "string") return;

    // Convert YYYY-MM-DD to ISO string if date is provided
    const dateAdded = date ? new Date(date).toISOString() : postcard.dateAdded;

    // If new coords are provided, use them. Otherwise keep existing coords if location hasn't changed
    let lat = coords?.lat ?? null;
    let lng = coords?.lng ?? null;
    
    // If no new coords but location hasn't changed, preserve existing coords
    if (!coords && postcardInput.location === postcard.location) {
      lat = postcard.lat;
      lng = postcard.lng;
    }

    updatePostcard(id, {
      ...postcardInput,
      dateAdded,
      lat,
      lng,
    });

    // Redirect back to the postcard detail page
    router.push(`/post/${id}`);
  };

  return (
    <>
      <Head>
        <title>Postcard App – Edit {postcard.title}</title>
        <meta
          name="description"
          content="Edit your postcard details."
        />
      </Head>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Edit Postcard
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Update the details of your postcard
        </p>
      </header>

      <section aria-labelledby="edit-form-heading">
        <h2 id="edit-form-heading" className="sr-only">
          Edit postcard form
        </h2>

        <PostcardForm
          initialValues={{
            title: postcard.title,
            location: postcard.location,
            imageUrl: postcard.imageUrl,
            description: postcard.description,
            dateAdded: postcard.dateAdded,
          }}
          onSubmit={handleSubmit}
        />

        <div className="mt-4">
          <Link
            href={`/post/${id}`}
            className="text-gray-600 hover:text-gray-800 underline text-sm"
          >
            Cancel and go back
          </Link>
        </div>
      </section>
    </>
  );
};

export default EditPostcardPage;

