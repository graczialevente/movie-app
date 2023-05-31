"use client";
import React, { useEffect, useState } from "react";
import { SearchMoviesResponse } from "@/services/tmdbService";
import { MovieList } from "@/components/MovieList";
import { Paginator } from "@/components/Paginator";
import { SearchForm } from "@/components/SearchForm";
import { Loader } from "@/components/Loader";
import { makeRequest } from "@/utils/makeRequest";

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SearchMoviesResponse>();

  const changeSearchQuery = (query: string) => {
    setQuery(query);
    setPage(1);
  };

  useEffect(() => {
    if (!query.length) {
      return;
    }

    const handleSearch = async () => {
      try {
        setIsLoading(true);
        const responseData = await makeRequest<SearchMoviesResponse>({
          url: "/api/search",
          method: "GET",
          params: { query: query, page: page },
        });
        setData(responseData);
        setError("");
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [page, query]);

  const renderMovieList = () => {
    if (!data) {
      return null;
    }

    return data.results.length > 0 ? (
      <>
        <MovieList
          movies={data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date,
          }))}
        />
        <div className="mt-6">
          <Paginator
            onPageChange={setPage}
            page={data.page}
            totalPages={data.total_pages}
          />
        </div>
      </>
    ) : (
      <p className="text-center text-white">no content</p>
    );
  };

  return (
    <main className="flex flex-col items-center">
      <h1 className="mb-7 mt-7 text-4xl font-bold">MOVIE APP</h1>
      <div
        className="sticky top-0 z-50 mb-6 w-full py-4"
        style={{ backgroundColor: "rgb(var(--background-rgb))" }}
      >
        <div className="container mx-auto flex max-w-7xl  justify-center px-7">
          <SearchForm onSearch={(query) => changeSearchQuery(query)} />
        </div>
      </div>

      {error && (
        <div className="container mx-auto max-w-7xl px-7 pb-7">
          <p className="border border-orange-900 bg-red-600 p-3 text-white">
            {error}
          </p>
        </div>
      )}

      <div className="container mx-auto max-w-7xl px-7 pb-7">
        {isLoading ? <Loader /> : renderMovieList()}
      </div>
    </main>
  );
}
