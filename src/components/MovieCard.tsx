import React from "react";
import Image from "next/image";
import { MovieData } from "@/types/common";

const IMAGE_BASE_PATH = "https://image.tmdb.org/t/p/w500";

type MovieCardProps = {
  movie: MovieData;
};

export function MovieCard({ movie }: MovieCardProps) {
  const { title, posterPath, releaseDate, overview } = movie;

  const imagePath = posterPath
    ? `${IMAGE_BASE_PATH}${posterPath}`
    : "/no-image.png";

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md shadow-gray-700">
      <Image
        className="aspect-[2/3] w-full shadow-md shadow-gray-100"
        width={500}
        height={750}
        src={imagePath}
        alt={title}
      />
      <div className="p-4">
        <h2 className="mb-1 text-lg font-bold text-black">{title}</h2>
        <p className="mb-4 text-gray-600">Release Date: {releaseDate}</p>
        <p className="text-sm text-gray-700">
          {overview || "[Overview not available]"}
        </p>
      </div>
    </div>
  );
}
