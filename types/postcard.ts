// types/postcard.ts
export type Postcard = {
    id: string;
    title: string;
    location: string;
    lat: number | null;
    lng: number | null;
    imageUrl: string;
    description: string;
    dateAdded: string; // ISO date string
    category: "visited" | "bucketlist"; // Whether this is a visited place or a future destination
  };
  