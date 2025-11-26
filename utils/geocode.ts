// utils/geocode.ts

const GEOCODE_CACHE_KEY = "postcardApp_geocodeCache";
const NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search";

interface GeocodeCacheEntry {
  lat: number;
  lng: number;
  timestamp: number;
}

interface GeocodeCache {
  [location: string]: GeocodeCacheEntry;
}

/**
 * Get the geocode cache from localStorage
 */
function getGeocodeCache(): GeocodeCache {
  if (typeof window === "undefined") return {};
  
  try {
    const cached = localStorage.getItem(GEOCODE_CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch (error) {
    console.error("Error reading geocode cache:", error);
    return {};
  }
}

/**
 * Save the geocode cache to localStorage
 */
function saveGeocodeCache(cache: GeocodeCache): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error("Error saving geocode cache:", error);
  }
}

/**
 * Geocode a location string to lat/lng coordinates using Nominatim API
 * with localStorage caching to minimize API calls
 * 
 * @param location - The location string to geocode (e.g., "Paris, France")
 * @returns Promise resolving to {lat, lng} or null if not found
 */
export async function geocodeLocation(
  location: string
): Promise<{ lat: number; lng: number } | null> {
  if (!location || location.trim() === "") {
    return null;
  }

  const normalizedLocation = location.trim().toLowerCase();

  // Check cache first
  const cache = getGeocodeCache();
  if (cache[normalizedLocation]) {
    console.log(`Geocode cache hit for: ${location}`);
    const { lat, lng } = cache[normalizedLocation];
    return { lat, lng };
  }

  // Cache miss - call Nominatim API
  console.log(`Geocoding location: ${location}`);
  
  try {
    const response = await fetch(
      `${NOMINATIM_API_URL}?format=json&q=${encodeURIComponent(location)}&limit=1`,
      {
        headers: {
          // Nominatim requires a User-Agent header
          "User-Agent": "PostcardApp/1.0",
        },
      }
    );

    if (!response.ok) {
      console.error(`Nominatim API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);

      // Save to cache
      cache[normalizedLocation] = {
        lat,
        lng,
        timestamp: Date.now(),
      };
      saveGeocodeCache(cache);

      console.log(`Geocoded ${location} to: [${lat}, ${lng}]`);
      return { lat, lng };
    } else {
      console.warn(`No results found for location: ${location}`);
      return null;
    }
  } catch (error) {
    console.error("Error geocoding location:", error);
    return null;
  }
}

/**
 * Clear the geocode cache (useful for testing or if cache becomes stale)
 */
export function clearGeocodeCache(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(GEOCODE_CACHE_KEY);
    console.log("Geocode cache cleared");
  } catch (error) {
    console.error("Error clearing geocode cache:", error);
  }
}

