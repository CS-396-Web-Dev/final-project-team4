// hooks/usePostcards.ts
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Postcard } from "../types/postcard";

const POSTCARDS_KEY = "postcards";

const SEED_POSTCARDS: Postcard[] = [
  {
    id: "chicago-1",
    title: "Chicago",
    location: "Chicago, Illinois, USA",
    lat: null,
    lng: null,
    imageUrl:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
    description:
      "First time in Chicago! Sunrise over the Bean and Lake Michigan.",
    dateAdded: "2025-03-17T00:00:00.000Z",
  },
  {
    id: "london-1",
    title: "London",
    location: "London, United Kingdom",
    lat: null,
    lng: null,
    imageUrl:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    description: "Evening walk along the Thames with Big Ben in view.",
    dateAdded: "2025-06-10T00:00:00.000Z",
  },
];

export function usePostcards() {
  const [postcards, setPostcards] = useLocalStorage<Postcard[]>(
    POSTCARDS_KEY,
    SEED_POSTCARDS,
  );

  const addPostcard = useCallback(
    (postcard: Postcard) => {
      setPostcards((current) => [...current, postcard]);
    },
    [setPostcards],
  );

  const updatePostcard = useCallback(
    (id: string, updates: Partial<Postcard>) => {
      setPostcards((current) =>
        current.map((card) =>
          card.id === id ? { ...card, ...updates } : card,
        ),
      );
    },
    [setPostcards],
  );

  const deletePostcard = useCallback(
    (id: string) => {
      setPostcards((current) => current.filter((card) => card.id !== id));
    },
    [setPostcards],
  );

  const getPostcardById = useCallback(
    (id: string) => {
      return postcards.find((card) => card.id === id) ?? null;
    },
    [postcards],
  );

  return {
    postcards,
    addPostcard,
    updatePostcard,
    deletePostcard,
    getPostcardById,
  };
}
