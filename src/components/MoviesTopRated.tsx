import CardMovie from "@/utils/CardMovie";
import { useGetMovieTopRatedQuery } from "../features/movies/moviesApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Movie } from "@/types/global";
import Loading from "@/utils/Loading";

export default function MoviesPopular() {
  const { data, isLoading } = useGetMovieTopRatedQuery({});
  if (isLoading) return <Loading />;

  return (
    <>
      <section className="container mx-auto p-4">
        <h1 className="text-white text-2xl font-bold py-4">Popular Movies</h1>
        <div className="flex flex-wrap gap-4">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full"
          >
            <CarouselContent>
              {data?.results?.map((item: Movie, index: number) => (
                <CarouselItem
                  className="w-full basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-4 flex gap-2"
                  key={`movie-${index}`}
                >
                  <p className="text-white text-3xl font-bold pt-4">
                    {index + 1}
                  </p>
                  <CardMovie data={{ ...item, price: 100 }} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer text-black bg-gray-200 hidden lg:flex" />
            <CarouselNext className="cursor-pointer text-black bg-gray-200 hidden lg:flex" />
          </Carousel>
        </div>
      </section>
    </>
  );
}
