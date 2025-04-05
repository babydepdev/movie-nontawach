import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import { InfoIcon, ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { toast } from "sonner";

interface MovieItem {
  id: number;
  original_title: string;
  release_date: string;
  backdrop_path: string;
  price: number;
}

const CardMovie = ({ data }: any) => {
  const cart: MovieItem[] = useSelector((state: any) => state.cart.items);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const existingItem = cart.find((item: any) => item.id === data?.id);
    if (!existingItem) {
      const newItem: MovieItem = {
        id: data?.id,
        original_title: data?.original_title,
        release_date: data?.release_date,
        backdrop_path: data?.backdrop_path,
        price: data?.price,
      };
      dispatch(addToCart(newItem));
      toast.success("Movie added to cart");
    } else {
      toast.error("Movie already in cart");
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link to={`/movie/${data.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
            className="rounded-lg cursor-pointer hover:scale-105 transition-transform h-full"
            alt={data.title || "Movie Poster"}
          />
        </Link>
      </HoverCardTrigger>

      <HoverCardContent>
        {data.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            className="w-full rounded-md"
            alt="Movie Backdrop"
          />
        )}
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="text-red-500 my-4 text-semibold">
          <Badge variant="destructive" className="text-sm">
            Price : {""}
            {data.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Badge>
        </p>
        <p className="text-sm text-gray-500">{Add3dot(data.overview, 150)}</p>
        <p className="text-sm text-gray-500">
          Release Date : {data.release_date}
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <Link to={`/movie/${data.id}`}>
            <Button variant="outline" className="cursor-pointer">
              <InfoIcon />
              Info
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            className="bg-[#084ED2] hover:bg-[#084fd2c3] px-6 py-3 rounded-lg cursor-pointer"
          >
            <ShoppingCartIcon /> Add to Cart
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Add3dot = (text: string, maxLength: number) => {
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return truncatedText;
};

export default CardMovie;
