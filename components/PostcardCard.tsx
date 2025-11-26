// components/PostcardCard.tsx
import Link from "next/link";
import type { FC } from "react";
import type { Postcard } from "../types/postcard";

type PostcardCardProps = {
  postcard: Postcard;
};

export const PostcardCard: FC<PostcardCardProps> = ({ postcard }) => {
  const formattedDate = new Date(postcard.dateAdded).toLocaleDateString();

  return (
    <li>
      <Link
        href={`/post/${postcard.id}`}
        className="block rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        <img
          src={postcard.imageUrl}
          alt={postcard.title}
          className="h-48 w-full object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {postcard.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{postcard.location}</p>
          <p className="mt-1 text-xs text-gray-500">{formattedDate}</p>
        </div>
      </Link>
    </li>
  );
};

