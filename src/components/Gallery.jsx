import { useState, useReducer, useEffect, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import {
  favouritesReducer,
  initFavourites,
  STORAGE_KEY,
} from "../reducers/favouritesReducer";
import PhotoCard from "./PhotoCard";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [query, setQuery] = useState("");
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    initFavourites
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleToggle = useCallback((id) => {
    dispatch({ type: "TOGGLE", id });
  }, []);

  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return photos.filter((p) => p.author.toLowerCase().includes(q));
  }, [photos, query]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by author..."
        className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
      />

      {loading && (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
        </div>
      )}

      {error && (
        <p className="py-20 text-center text-red-600">
          Failed to load photos: {error}
        </p>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-20 text-center text-gray-500">No photos found.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}