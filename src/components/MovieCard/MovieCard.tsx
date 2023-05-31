import React from "react";

const IMAGE_BASE_PATH = "https://image.tmdb.org/t/p/w500";

type MovieCardProps = {
  movie: {
    title: string;
    posterPath: string;
    releaseDate: string;
    overview: string;
  };
};

export function MovieCard({ movie }: MovieCardProps) {
  const { title, posterPath, releaseDate, overview } = movie;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md shadow-gray-700">
      <img
        className="aspect-[2/3] w-full"
        src={`${IMAGE_BASE_PATH}${posterPath}`}
        alt={title}
      />
      <div className="p-4">
        <h2 className="mb-1 text-lg font-bold text-black">{title}</h2>
        <p className="mb-4 text-gray-600">Release Date: {releaseDate}</p>
        <p className="text-sm text-gray-700">{overview}</p>
      </div>
    </div>
  );
}
