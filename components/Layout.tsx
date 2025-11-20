// components/Layout.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const isActive = (href: string) => router.pathname === href;

  return (
    <>
      <header>
        <nav aria-label="Primary" className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                isActive("/")
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Postcards
            </Link>
            <Link
              href="/map"
              className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                isActive("/map")
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Map
            </Link>
            <Link
              href="/add"
              className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                isActive("/add")
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Add Postcard
            </Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8">
        {children}
      </main>
    </>
  );
};

