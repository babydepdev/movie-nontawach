import { useParams } from "react-router-dom";
import {
  useGetMovieByIdQuery,
  useGetVideoByIdQuery,
} from "@/features/movies/moviesApi";
import { ShoppingCartIcon, TvMinimalPlayIcon, Volume2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/utils/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Movie } from "@/types/global";

interface SpokenLanguages {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetMovieByIdQuery(Number(id));
  const { data: videos } = useGetVideoByIdQuery(Number(id));
  const cart = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      document.title = `${data.original_title} - Movie Details`;
    }
  }, [data]);

  const handleAddToCart = () => {
    const existingItem = cart.find((item: any) => item.id === data?.id);
    if (!existingItem) {
      const newItem: Movie = {
        id: data?.id,
        original_title: data?.original_title,
        release_date: data?.release_date,
        backdrop_path: data?.backdrop_path,
        price: data?.price,
        poster_path: data?.poster_path,
      };

      dispatch(addToCart(newItem));
      toast.success("Movie added to cart");
    } else {
      toast.error("Movie already in cart");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        {videos?.results?.length > 0 ? (
          <iframe
            className="w-full h-full object-cover lg:flex hidden"
            src={`https://www.youtube.com/embed/${
              videos?.results[
                Math.floor(Math.random() * videos?.results.length)
              ]?.key
            }?autoplay=1&loop=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            className="w-full h-full object-cover"
            alt={data?.original_title}
          />
        )}
        {/* <img
          src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
          className="w-full h-full object-cover flex lg:hidden"
          alt={data?.original_title}
        /> */}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141414]"></div>
      </div>
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-20 px-4">
        <div className="flex items-center gap-3 mt-2 text-gray-300">
          {data?.genres?.map((genre: any, index: number) => (
            <span key={index} className="text-white text-lg font-medium">
              {genre.name}
            </span>
          ))}
        </div>
        <h1 className="text-white text-4xl font-bold">
          {data?.original_title}
        </h1>

        <div className="flex items-center gap-3 mt-2 text-gray-300">
          <Volume2Icon className="text-gray-400" />
          {data?.spoken_languages?.map(
            (item: SpokenLanguages, index: number) => (
              <span key={index} className="text-gray-300">
                {item.iso_639_1.toUpperCase()}
              </span>
            )
          )}
        </div>
        <div>
          <p className="text-red-500 text-lg font-semibold mt-6 max-w-2xl">
            Price : {data?.price == 0 ? "Free" : `${data?.price} $`}
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleAddToCart}
            className="flex items-center gap-3 bg-[#084ED2] hover:bg-[#084fd2c3] px-6 py-3 rounded-lg cursor-pointer"
          >
            <ShoppingCartIcon /> Add to cart
          </Button>

          {videos?.results?.length > 0 && (
            <VideoPlayer video={videos?.results[0]} />
          )}
        </div>

        <p className="text-white text-lg font-medium mt-6 max-w-2xl">
          {data?.overview}
        </p>
      </div>
    </div>
  );
}

export function VideoPlayer({ video }: { video: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer"
        >
          <TvMinimalPlayIcon className="w-5 h-5" /> Watch
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Watch this video</DialogTitle>
          <DialogDescription>
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video?.key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
