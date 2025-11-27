// hooks/usePostcards.ts
import { useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Postcard } from "../types/postcard";

const POSTCARDS_KEY = "postcards";
const MIGRATION_DONE_KEY = "postcards_migration_done";

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
    category: "visited",
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
    category: "visited",
  },
  {
    id: "paris-1",
    title: "Paris",
    location: "Paris, France",
    lat: null,
    lng: null,
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    description: "The Eiffel Tower at sunset.",
    dateAdded: "2025-09-15T00:00:00.000Z",
    category: "visited",
  },
  {
    id: "cairo-1",
    title: "Cairo",
    location: "Cairo, Egypt",
    lat: null,
    lng: null,
    imageUrl:
      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=1200&q=80",
    description: "The Great Pyramids of Giza.",
    dateAdded: "2025-01-01T00:00:00.000Z",
    category: "bucketlist",
  },
  {
    id: "las-vegas-1",
    title: "Las Vegas",
    location: "Las Vegas, Nevada, USA",
    lat: null,
    lng: null,
    imageUrl:
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&w=1200&q=80",
    description: "The Las Vegas Strip.",
    dateAdded: "2025-01-01T00:00:00.000Z",
    category: "bucketlist",
  },
  {
    id: "cappadocia-1",
    title: "Cappadocia",
    location: "Cappadocia, Turkey",
    lat: null,
    lng: null,
    imageUrl:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    description: "Hot air balloons over Cappadocia.",
    dateAdded: "2025-01-01T00:00:00.000Z",
    category: "bucketlist",
  },
  {
    id: "lapland-1",
    title: "Lapland",
    location: "Lapland, Finland",
    lat: null,
    lng: null,
    imageUrl:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80",
    description: "Northern Lights in Lapland.",
    dateAdded: "2025-01-01T00:00:00.000Z",
    category: "bucketlist",
  },
  {
    id: "bangkok-1",
    title: "Bangkok",
    location: "Bangkok, Thailand",
    lat: null,
    lng: null,
    imageUrl:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
    description: "Temples of Bangkok.",
    dateAdded: "2025-01-01T00:00:00.000Z",
    category: "bucketlist",
  },
  {
    id: "kyoto-1",
    title: "Kyoto",
    location: "Kyoto, Japan",
    lat: null,
    lng: null,
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    description: "Traditional temples in Kyoto.",
    dateAdded: "2025-01-01T00:00:00.000Z",
    category: "bucketlist",
  },
];

export function usePostcards() {
  const [postcards, setPostcards] = useLocalStorage<Postcard[]>(
    POSTCARDS_KEY,
    SEED_POSTCARDS,
  );

  // Use localStorage to track if migration has been done - persists across remounts
  // Migrate postcards that don't have a category field and merge seed data
  // Only add seed postcards on FIRST load when localStorage is empty
  useEffect(() => {
    // Check if migration was already done (stored in localStorage)
    const migrationDone = typeof window !== "undefined" 
      ? window.localStorage.getItem(MIGRATION_DONE_KEY) === "true"
      : false;
    
    if (migrationDone) {
      console.log("Migration already done (from localStorage), skipping - will NOT re-add seed postcards");
      return;
    }

    // Check if localStorage was empty (first time user)
    const stored = typeof window !== "undefined" 
      ? window.localStorage.getItem(POSTCARDS_KEY) 
      : null;
    
    console.log("Migration check - stored:", stored ? JSON.parse(stored).length : "null");
    const isFirstTimeUser = !stored || stored === "[]" || (stored && JSON.parse(stored).length === 0);
    console.log("Is first time user:", isFirstTimeUser);
    
    if (!isFirstTimeUser) {
      // Not first time - just ensure categories exist, NEVER re-add deleted seed postcards
      console.log("Not first time user - marking migration as done, will NEVER re-add seed postcards");
      if (typeof window !== "undefined") {
        window.localStorage.setItem(MIGRATION_DONE_KEY, "true");
      }
      const needsCategoryMigration = postcards.some(p => !p.category);
      if (needsCategoryMigration) {
        const updated = postcards.map((postcard) => {
          if (!postcard.category) {
            return { ...postcard, category: "visited" as const };
          }
          return postcard;
        });
        setPostcards(updated);
      }
      return;
    }
    
    // First time user ONLY - do full migration with seed data
    // Mark migration as done IMMEDIATELY before doing anything else
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MIGRATION_DONE_KEY, "true");
      console.log("Migration marked as done BEFORE processing - will never run again");
    }
    
    // Create a map of seed postcards by ID for easy lookup
    const seedPostcardMap = new Map(SEED_POSTCARDS.map(p => [p.id, p]));
    
    // Check if migration is needed
    const needsCategoryMigration = postcards.some(p => !p.category);
    const allPostcardIds = new Set(postcards.map(p => p.id));
    const missingSeedPostcards = SEED_POSTCARDS.filter(
      seed => !allPostcardIds.has(seed.id)
    );
    
    // Check if any existing postcards need image URL updates
    const needsImageUpdate = postcards.some(p => {
      const seedPostcard = seedPostcardMap.get(p.id);
      return seedPostcard && seedPostcard.imageUrl !== p.imageUrl;
    });
    
    if (needsCategoryMigration || missingSeedPostcards.length > 0 || needsImageUpdate) {
      let updatedPostcards = postcards.map((postcard) => {
        const seedPostcard = seedPostcardMap.get(postcard.id);
        let updated = { ...postcard };
        
        // Add category if missing
        if (!updated.category) {
          updated = { ...updated, category: "visited" as const };
        }
        
        // Update image URL if seed data has a different one
        if (seedPostcard && seedPostcard.imageUrl !== postcard.imageUrl) {
          updated = { ...updated, imageUrl: seedPostcard.imageUrl };
        }
        
        return updated;
      });

      if (missingSeedPostcards.length > 0) {
        console.log("Adding missing seed postcards:", missingSeedPostcards.map(p => p.id));
        updatedPostcards = [...updatedPostcards, ...missingSeedPostcards];
      }

      setPostcards(updatedPostcards);
      console.log("Migration completed - seed postcards added");
    } else {
      console.log("No migration needed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Memoize the migrated postcards to avoid recalculating on every render
  const migratedPostcards = useMemo(() => {
    return postcards.map((postcard) => {
      if (!postcard.category) {
        return { ...postcard, category: "visited" as const };
      }
      return postcard;
    });
  }, [postcards]);

  const addPostcard = useCallback(
    (postcard: Postcard) => {
      console.log("addPostcard called with:", postcard);
      // Ensure the postcard has a category
      const postcardWithCategory = {
        ...postcard,
        category: postcard.category || "visited",
      };
      console.log("Postcard with category:", postcardWithCategory);
      
      // Update state - useLocalStorage hook will automatically save
      setPostcards((current) => {
        const updated = [...current, postcardWithCategory];
        console.log("Updated postcards array, new length:", updated.length);
        return updated;
      });
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
      console.log("deletePostcard called with id:", id);
      setPostcards((current) => {
        const filtered = current.filter((card) => card.id !== id);
        console.log("After delete, postcards count:", filtered.length);
        console.log("Remaining postcard IDs:", filtered.map(p => p.id));
        return filtered;
      });
    },
    [setPostcards],
  );

  const getPostcardById = useCallback(
    (id: string) => {
      return migratedPostcards.find((card) => card.id === id) ?? null;
    },
    [migratedPostcards],
  );

  console.log("usePostcards returning:", {
    postcardsCount: migratedPostcards.length,
    postcards: migratedPostcards,
  });

  return {
    postcards: migratedPostcards,
    addPostcard,
    updatePostcard,
    deletePostcard,
    getPostcardById,
  };
}
