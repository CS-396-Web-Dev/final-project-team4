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
    console.log("Form submitted with data:", postcardInput);
    
    const newPostcard: Postcard = {
      ...postcardInput,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
      lat: null,
      lng: null,
      category: postcardInput.category || "visited",
    };
    
    console.log("New postcard created:", newPostcard);
    
    // Add the postcard - this updates state and localStorage via useLocalStorage hook
    try {
      addPostcard(newPostcard);
      console.log("addPostcard called successfully");
      
      // Check localStorage immediately after
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("postcards");
        console.log("LocalStorage after add:", stored ? JSON.parse(stored).length : "empty");
      }
    } catch (error) {
      console.error("Error adding postcard:", error);
    }
    
    // Small delay to ensure React state and localStorage are synced before navigation
    setTimeout(() => {
      console.log("Navigating to home page");
      router.push("/").catch((err) => {
        console.error("Router push error:", err);
        window.location.href = "/";
      });
    }, 100);
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
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
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
