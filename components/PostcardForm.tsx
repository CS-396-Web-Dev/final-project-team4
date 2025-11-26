// components/PostcardForm.tsx
import { useState, type FC, type FormEvent } from "react";
import type { Postcard } from "../types/postcard";
import { LocationSearchInput } from "./LocationSearchInput";

type PostcardInput = Omit<Postcard, "id" | "dateAdded" | "lat" | "lng">;

type PostcardFormProps = {
  initialValues?: PostcardInput;
  onSubmit: (postcard: PostcardInput, coords: { lat: number; lng: number } | null, date?: string) => void;
};

export const PostcardForm: FC<PostcardFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [location, setLocation] = useState(initialValues?.location || "");
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || "");
  const [description, setDescription] = useState(
    initialValues?.description || "",
  );
  const [date, setDate] = useState(() => {
    // Default to today's date in YYYY-MM-DD format
    return new Date().toISOString().split('T')[0];
  });
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationChange = (newLocation: string, coords: { lat: number; lng: number } | null) => {
    setLocation(newLocation);
    setLocationCoords(coords);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(
      {
        title,
        location,
        imageUrl,
        description,
      },
      locationCoords,
      date
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <LocationSearchInput
          value={location}
          onChange={handleLocationChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          required
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
        {imageUrl && (
          <div className="mt-4">
            <img
              src={imageUrl}
              alt="Preview"
              className="h-48 w-full rounded-lg object-cover border border-gray-200"
            />
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />
        <p className="mt-1 text-xs text-gray-500">Defaults to today's date</p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="Share your memories about this place..."
        />
      </div>

      <div>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

