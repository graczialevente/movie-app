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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
