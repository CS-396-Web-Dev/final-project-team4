// pages/add.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { usePostcards } from "../hooks/usePostcards";
import { PostcardForm } from "../components/PostcardForm";
import type { Postcard } from "../types/postcard";

const AddPostcardPage: NextPage = () => {
  const router = useRouter();
  const { addPostcard } = usePostcards();

  const handleSubmit = (postcardInput: Omit<Postcard, "id" | "dateAdded" | "lat" | "lng">) => {
    const newPostcard: Postcard = {
      ...postcardInput,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
      lat: null,
      lng: null,
    };
    addPostcard(newPostcard);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Postcard App – Add Postcard</title>
        <meta
          name="description"
          content="Add a new postcard to your travel collection."
        />
      </Head>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Add a Postcard
        </h1>
      </header>

      <section aria-labelledby="add-form-heading">
        <h2 id="add-form-heading" className="sr-only">
          Add postcard form
        </h2>
        <PostcardForm onSubmit={handleSubmit} />
      </section>
    </>
  );
};

export default AddPostcardPage;
