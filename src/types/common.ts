export type MovieData = {
  id: number;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  title: string;
};

export type MoviesList = {
  page: number;
  results: MovieData[];
  totalPages: number;
  totalResults: number;
};

export type CachedMovieList = MoviesList & { hitCount: number | null };
