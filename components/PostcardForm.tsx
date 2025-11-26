// components/PostcardForm.tsx
import { useState, type FC, type FormEvent } from "react";
import type { Postcard } from "../types/postcard";
import { LocationSearchInput } from "./LocationSearchInput";

type PostcardInput = Omit<Postcard, "id" | "dateAdded" | "lat" | "lng">;

type PostcardFormProps = {
  initialValues?: PostcardInput & { dateAdded?: string };
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
    // Use initial date if provided, otherwise default to today
    if (initialValues?.dateAdded) {
      return new Date(initialValues.dateAdded).toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [imageSource, setImageSource] = useState<"url" | "upload">("url");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleLocationChange = (newLocation: string, coords: { lat: number; lng: number } | null) => {
    setLocation(newLocation);
    setLocationCoords(coords);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }

    // Check file size (max 2MB to avoid localStorage limits)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Image must be smaller than 2MB');
      return;
    }

    setUploadError(null);

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file');
    };
    reader.readAsDataURL(file);
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image
        </label>
        
        {/* Toggle between URL and Upload */}
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => {
              setImageSource("url");
              setUploadError(null);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              imageSource === "url"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Image URL
          </button>
          <button
            type="button"
            onClick={() => {
              setImageSource("upload");
              setImageUrl("");
              setUploadError(null);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              imageSource === "upload"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Upload Image
          </button>
        </div>

        {/* Show URL input or file upload based on selection */}
        {imageSource === "url" ? (
          <input
            type="url"
            id="imageUrl"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        ) : (
          <div>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              required={!imageUrl}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              Max file size: 2MB. Supports JPG, PNG, GIF, WebP.
            </p>
          </div>
        )}

        {uploadError && (
          <p className="mt-2 text-sm text-red-600">{uploadError}</p>
        )}

        {imageUrl && (
          <div className="mt-4">
            <img
              src={imageUrl}
              alt="Preview"
              className="h-48 w-full rounded-lg object-cover border border-gray-200"
              onError={() => setUploadError("Failed to load image")}
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

