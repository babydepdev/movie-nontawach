import MoviesPopular from "@/components/MoviesPopular";
import MoviesTopRated from "@/components/MoviesTopRated";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home - Movie App";
  }, []);

  return (
    <div>
      <MoviesPopular />
      <MoviesTopRated />
    </div>
  );
}
