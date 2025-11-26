// components/PostcardMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import type { Postcard } from "@/types/postcard";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with Next.js
// This is needed because webpack doesn't bundle the marker images correctly
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface PostcardMapProps {
  postcards: Postcard[];
}

export const PostcardMap: React.FC<PostcardMapProps> = ({ postcards }) => {
  // Filter postcards that have valid coordinates
  const mappablePostcards = postcards.filter(
    (postcard) => postcard.lat !== null && postcard.lng !== null
  );

  // Default center (world view)
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;

  // If we have postcards with coordinates, center on the first one
  const center: [number, number] =
    mappablePostcards.length > 0 && mappablePostcards[0].lat && mappablePostcards[0].lng
      ? [mappablePostcards[0].lat, mappablePostcards[0].lng]
      : defaultCenter;

  const zoom = mappablePostcards.length > 0 ? 4 : defaultZoom;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mappablePostcards.map((postcard) => {
        if (postcard.lat === null || postcard.lng === null) return null;
        
        return (
          <Marker key={postcard.id} position={[postcard.lat, postcard.lng]}>
            <Popup>
              <div className="p-2 min-w-[200px]">
                {postcard.imageUrl && (
                  <img
                    src={postcard.imageUrl}
                    alt={postcard.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold text-lg mb-1">{postcard.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{postcard.location}</p>
                <Link
                  href={`/post/${postcard.id}`}
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

