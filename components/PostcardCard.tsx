// components/PostcardCard.tsx
import Link from "next/link";
import type { FC } from "react";
import type { Postcard } from "../types/postcard";

type PostcardCardProps = {
  postcard: Postcard;
  showDate?: boolean;
};

export const PostcardCard: FC<PostcardCardProps> = ({ postcard, showDate = true }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Debug image loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Image failed to load for ${postcard.title}:`, postcard.imageUrl);
    console.error("Image error:", e);
  };

  const handleImageLoad = () => {
    console.log(`Image loaded successfully for ${postcard.title}`);
  };

  return (
    <div className="flex-shrink-0">
      <Link
        href={`/post/${postcard.id}`}
        className="block w-64 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-shadow hover:shadow-lg"
      >
        <img
          src={postcard.imageUrl}
          alt={postcard.title}
          className="h-56 w-full object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className="p-3">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {postcard.title}
          </h3>
          {showDate && postcard.category === "visited" && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {formatDate(postcard.dateAdded)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

