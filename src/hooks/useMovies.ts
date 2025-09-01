import { useState } from "react";
import { fetchMovies } from "../utils/api";
import { Movie } from "../types/Movie";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovies("/shows?page=1"); // TVmaze popular list
      setMovies(data);
    } catch (err) {
      setError("Failed to fetch popular movies");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovies("/shows?page=2"); // another page for variety
      setMovies(data);
    } catch (err) {
      setError("Failed to fetch trending movies");
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovies(`/search/shows?q=${query}`);
      // TVmaze search returns { show: {...} }
      setMovies(data.map((item: any) => item.show));
    } catch (err) {
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    fetchPopularMovies,
    fetchTrendingMovies,
    searchMovies,
  };
};
