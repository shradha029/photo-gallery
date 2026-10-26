export default function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="h-48 w-full object-cover"
      />
      <div className="flex items-center justify-between p-3">
        <span className="truncate text-sm font-medium text-gray-800">
          {photo.author}
        </span>
        <button
          onClick={() => onToggle(photo.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={isFavourite}
          className="cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${
              isFavourite ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-500"
            }`}
            strokeWidth="2"
          >
            <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}