// components/PostcardForm.tsx
import { useState, type FC, type FormEvent } from "react";
import type { Postcard } from "../types/postcard";

type PostcardInput = Omit<Postcard, "id" | "dateAdded" | "lat" | "lng">;

type PostcardFormProps = {
  initialValues?: PostcardInput;
  onSubmit: (postcard: PostcardInput) => void;
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      title,
      location,
      imageUrl,
      description,
    });
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
        <input
          type="text"
          id="location"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
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

