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
    <main className="flex min-h-screen flex-col items-center p-7">
      <h1 className="mb-7 text-4xl font-bold">MOVIE APP</h1>
      <div className="container mx-auto max-w-7xl">
        <div className="sticky top-0 z-50 mb-6 flex justify-center bg-black py-4 shadow-md">
          <SearchForm onSearch={(query) => setQuery(query)} />
        </div>

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
