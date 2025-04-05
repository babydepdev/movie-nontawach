import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import store from "../../app/store";

interface MoviesState {
  movies: any[];
}

const initialState: MoviesState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<any>) => {
      state.movies.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<any>) => {
      state.movies = state.movies.filter(
        (movie: any) => movie.id !== action.payload
      );
    },
  },
});

export const { addMovie, removeMovie } = moviesSlice.actions;
