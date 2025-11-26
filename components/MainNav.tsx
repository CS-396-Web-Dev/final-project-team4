// components/MainNav.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

const linkClasses =
  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const activeClasses = "bg-indigo-600 text-white";
const inactiveClasses =
  "bg-white text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50";

export const MainNav: FC = () => {
  const router = useRouter();

  const isActive = (href: string) => router.pathname === href;

  return (
    <nav
      aria-label="Primary"
      className="mb-4 flex flex-wrap items-center gap-3"
    >
      <Link
        href="/"
        className={`${linkClasses} ${
          isActive("/") ? activeClasses : inactiveClasses
        }`}
      >
        Postcards
      </Link>
      <Link
        href="/map"
        className={`${linkClasses} ${
          isActive("/map") ? activeClasses : inactiveClasses
        }`}
      >
        Map
      </Link>
      <Link
        href="/add"
        className={`${linkClasses} ${
          isActive("/add") ? activeClasses : inactiveClasses
        }`}
      >
        Add Postcard
      </Link>
    </nav>
  );
};
