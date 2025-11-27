// pages/debug.tsx
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { usePostcards } from "@/hooks/usePostcards";

const DebugPage: NextPage = () => {
  const { postcards } = usePostcards();
  const [localStorageData, setLocalStorageData] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("postcards");
      setLocalStorageData(data || "No data in localStorage");
    }
  }, []);

  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("postcards");
      setLocalStorageData(data || "No data in localStorage");
      
      // Also log to console for easier inspection
      console.log("=== RAW LOCALSTORAGE DATA ===");
      console.log(data);
      
      if (data) {
        try {
          const parsed = JSON.parse(data);
          console.log("=== PARSED DATA ===");
          console.log(parsed);
          console.log("=== COUNT ===", parsed.length);
        } catch (e) {
          console.error("Failed to parse:", e);
        }
      }
    }
  };

  const handleClear = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("postcards");
      alert("Cleared postcards from localStorage. Refresh the page.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Postcards from Hook:</h2>
        <p className="mb-2">Count: {postcards.length}</p>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(postcards, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          <h2 className="text-xl font-semibold">localStorage Raw Data:</h2>
          <button
            onClick={handleRefresh}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Refresh
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Clear localStorage
          </button>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {localStorageData}
        </pre>
      </div>
    </div>
  );
};

export default DebugPage;

