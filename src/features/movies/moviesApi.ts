import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDFmY2VmN2UyYzU1M2RhOTRkODY2YjlmY2Q1NjBmZCIsIm5iZiI6MTc0MzY3NjQxMy40NjQsInN1YiI6IjY3ZWU2M2ZkNDY4MGYyNmJmM2E3YTdhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFi_QQuJEiJylFatosVVOpMcD2S2xKgxYSu6T-EaWPg",
    },
  }),
  endpoints: (builder) => ({
    getMoviesPopular: builder.query({
      query: () => `/movie/popular`,
      transformResponse: (response: any) => {
        return {
          ...response,
          results: response.results.map((movie: any) => {
            return {
              ...movie,
              price: 100,
            };
          }),
        };
      },
    }),
    getMovieById: builder.query({
      query: (id: number) => `/movie/${id}`,
      transformResponse: (response: any) => {
        return {
          ...response,
          price: 100,
        };
      },
    }),
    getMovieByName: builder.query({
      query: (name: string) => `/search/movie?query=${name}`,
      transformResponse: (response: any) => {
        return {
          ...response,
          results: response.results.map((movie: any) => {
            return {
              ...movie,
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
      transformResponse: (response: any) => {
        return {
          ...response,
          results: response.results.map((movie: any) => {
            return {
              ...movie,
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
