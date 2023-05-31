"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchMovieResponse } from "@/services/tmdbService";
import { MovieList } from "@/components/MovieList";
import { Paginator } from "@/components/Paginator";
import { SearchForm } from "@/components/SearchForm";

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<SearchMovieResponse>();

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(`/api/search`, {
          params: { query: query, page: page },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    };

    handleSearch();
  }, [page, query]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="mb-7 mt-7 text-4xl font-bold">MOVIE APP</h1>
      <div
        className="sticky top-0 z-50 mb-6 w-full py-4"
        style={{ backgroundColor: "rgb(var(--background-rgb))" }}
      >
        <div className="container mx-auto flex max-w-7xl  justify-center px-7">
          <SearchForm onSearch={(query) => setQuery(query)} />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-7 pb-7">
        {data && (
          <MovieList
            movies={data.results.map((movie) => ({
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              posterPath: movie.poster_path,
              releaseDate: movie.release_date,
            }))}
          />
        )}

        {data && (
          <div className="mt-6">
            <Paginator
              onPageChange={setPage}
              page={data?.page || 1}
              totalPages={data?.total_pages || 1}
            />
          </div>
        )}
      </div>
    </main>
  );
}
