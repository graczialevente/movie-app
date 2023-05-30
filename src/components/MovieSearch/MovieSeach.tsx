"use client";
import React, { useState } from "react";
import axios from "axios";
import { SearchMovieResponse } from "@/services/tmdbService";
import { MovieList } from "../MovieList";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<SearchMovieResponse>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-2 py-4">
        <input
          className="text-black"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search movies..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {movies && (
        <MovieList
          movies={movies.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date,
          }))}
        />
      )}
    </div>
  );
};

export default MovieSearch;
