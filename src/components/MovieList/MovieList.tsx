import React from "react";
import { MovieCard } from "../MovieCard";

type MovieListProps = {
  movies: {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    overview: string;
  }[];
};

export function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
