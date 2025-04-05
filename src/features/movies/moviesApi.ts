import { MovieById, MovieRaw } from "@/types/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  }),
  endpoints: (builder) => ({
    getMoviesPopular: builder.query({
      query: () => `/movie/popular`,
      transformResponse: (response: {
        page: number;
        results: MovieRaw[];
        total_pages: number;
        total_results: number;
      }) => {
        return {
          ...response,
          results: response.results.map((item: MovieRaw) => {
            return {
              ...item,
              price: 100,
            };
          }),
        };
      },
    }),
    getMovieById: builder.query({
      query: (id: number) => `/movie/${id}`,
      transformResponse: (response: MovieById) => {
        return {
          ...response,
          price: 100,
        };
      },
    }),
    getMovieByName: builder.query({
      query: (name: string) => `/search/movie?query=${name}`,
      transformResponse: (response: {
        page: number;
        results: MovieRaw[];
        total_pages: number;
        total_results: number;
      }) => {
        return {
          ...response,
          results: response.results.map((item: MovieRaw) => {
            return {
              ...item,
              price: 100,
            };
          }),
        };
      },
    }),
    getMovieGenres: builder.query({
      query: () => `/genre/movie/list`,
    }),
    getMovieTopRated: builder.query({
      query: () => `/movie/top_rated`,
      transformResponse: (response: {
        page: number;
        results: MovieRaw[];
        total_pages: number;
        total_results: number;
      }) => {
        return {
          ...response,
          results: response.results.map((item: MovieRaw) => {
            return {
              ...item,
              price: 100,
            };
          }),
        };
      },
    }),
    getVideoById: builder.query({
      query: (id: number) => `/movie/${id}/videos`,
    }),
  }),
});

export const {
  useGetMoviesPopularQuery,
  useGetMovieByIdQuery,
  useGetMovieByNameQuery,
  useGetMovieGenresQuery,
  useGetMovieTopRatedQuery,
  useGetVideoByIdQuery,
} = moviesApi;
