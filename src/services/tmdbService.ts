import axios from "axios";
import { getEnvVariable } from "@/utils";
import { MoviesList } from "@/types/common";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = getEnvVariable("TMDB_API_KEY");

type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type SearchMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export async function searchMovies(
  query: string,
  page?: number
): Promise<MoviesList> {
  try {
    const response = await axios.get<SearchMoviesResponse>(
      `${BASE_URL}/search/movie`,
      {
        params: {
          api_key: API_KEY,
          query: query,
          page: page,
        },
      }
    );

    return {
      page: response.data.page,
      results: response.data.results.map((movie) => ({
        id: movie.id,
        overview: movie.overview,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        title: movie.title,
      })),
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
}
