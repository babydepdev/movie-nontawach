import { Movie } from "@/types/global";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MoviesState {
  movies: Movie[];
}

const initialState: MoviesState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<Movie>) => {
      state.movies = state.movies.filter(
        (movie: Movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const { addMovie, removeMovie } = moviesSlice.actions;
