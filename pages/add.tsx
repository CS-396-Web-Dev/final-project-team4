// pages/add.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";
import { usePostcards } from "../hooks/usePostcards";
import { PostcardForm } from "../components/PostcardForm";
import type { Postcard } from "../types/postcard";
import { geocodeLocation } from "../utils/geocode";

const AddPostcardPage: NextPage = () => {
  const router = useRouter();
  const { addPostcard } = usePostcards();
  const [geocodeWarning, setGeocodeWarning] = useState<string | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleSubmit = async (postcardInput: Omit<Postcard, "id" | "dateAdded" | "lat" | "lng">) => {
    setGeocodeWarning(null);
    setIsGeocoding(true);

    try {
      // Try to geocode the location
      const coords = await geocodeLocation(postcardInput.location);

      const newPostcard: Postcard = {
        ...postcardInput,
        id: crypto.randomUUID(),
        dateAdded: new Date().toISOString(),
        lat: coords?.lat ?? null,
        lng: coords?.lng ?? null,
      };

      addPostcard(newPostcard);

      // Show warning if geocoding failed
      if (!coords) {
        setGeocodeWarning(
          "Could not locate this address on the map. The postcard was saved but won't appear on the map."
        );
        // Still redirect after a short delay so user can see the warning
        setTimeout(() => {
          router.push("/map");
        }, 2000);
      } else {
        // Redirect to map immediately if geocoding succeeded
        router.push("/map");
      }
    } catch (error) {
      console.error("Error adding postcard:", error);
      setGeocodeWarning("An error occurred while adding the postcard.");
    } finally {
      setIsGeocoding(false);
    }
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
        
        {geocodeWarning && (
          <div
            className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-md"
            role="alert"
          >
            <p className="text-sm text-amber-800">{geocodeWarning}</p>
          </div>
        )}

        {isGeocoding && (
          <div
            className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md"
            role="status"
          >
            <p className="text-sm text-blue-800">
              Geocoding location... Please wait.
            </p>
          </div>
        )}

        <PostcardForm onSubmit={handleSubmit} />
      </section>
    </>
  );
};

export default AddPostcardPage;
