import CardMovie from "./CardMovie";
import { useGetMoviesPopularQuery } from "../features/movies/moviesApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { InfoIcon, ShoppingCartIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { toast } from "sonner";
import { Cart, Movie } from "@/types/global";
import Loading from "@/utils/Loading";
import type { RootState } from "@/store";

export default function MoviesPopular() {
  const cart = useSelector((state: RootState) => state.cart?.items ?? []);
  const { data, isLoading } = useGetMoviesPopularQuery({});
  const dispatch = useDispatch();

  const randomMovie =
    data?.results?.[Math.floor(Math.random() * data?.results?.length)];

  const handleAddToCart = () => {
    const existingItem = cart.find((item: Cart) => item.id === randomMovie?.id);
    if (!existingItem) {
      const newItem: Movie = {
        id: randomMovie?.id || 0,
        original_title: randomMovie?.original_title || "",
        release_date: randomMovie?.release_date || "",
        backdrop_path: randomMovie?.backdrop_path || "",
        price: randomMovie?.price || 0,
        poster_path: randomMovie?.poster_path || "",
      };

      dispatch(addToCart(newItem));
      toast.success("Movie added to cart");
    } else {
      toast.error("Movie already in cart");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="relative w-full">
        <div className="relative w-full h-[40vh] lg:h-[60vh]">
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`}
              className="w-full h-full object-cover"
              alt={randomMovie?.original_title}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141414] "></div>

            <div className="absolute bottom-0 w-full flex flex-col justify-center items-center pb-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                {randomMovie?.original_title}
              </h2>

              <div className="flex gap-4 mb-6">
                <Button
                  onClick={handleAddToCart}
                  className="bg-[#084ED2] hover:bg-[#084fd2c3] px-6 py-3 rounded-lg cursor-pointer"
                >
                  <ShoppingCartIcon /> Add To Cart
                </Button>

                <Link to={`/movie/${randomMovie?.id}`}>
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-lg cursor-pointer">
                    <InfoIcon /> Info
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  <CardMovie data={item} />
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
