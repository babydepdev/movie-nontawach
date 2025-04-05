export interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
  price: number;
}

export interface MovieRaw {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Cart {
  id: number;
  original_title: string;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
  price: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface MovieById {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: any[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Video {
  id: number;
  iso_639_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface VideoById {
  id: number;
  results: Video[];
}
