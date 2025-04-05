import { Button } from "@/components/ui/button";
import { AlignJustifyIcon, ShoppingCartIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useEffect, useState, useRef } from "react";
import { useGetMovieByNameQuery } from "@/features/movies/moviesApi";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Cart, Movie } from "@/types/global";

export default function NavbarHeader() {
  const cart = useSelector((state: RootState) => state.cart?.items ?? []);

  const [keyword, setKeyword] = useState<string>("");
  const { data, isLoading } = useGetMovieByNameQuery(keyword, {
    refetchOnMountOrArgChange: true,
  });

  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setShowSearchResults(true);
  };
  return (
    <>
      <nav className="flex justify-between items-center w-full h-18 px-2 md:px-8 bg-black sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Movie - Logo"
              className="w-22"
              width={2000}
              height={2000}
            />
          </Link>
        </div>
        {/* Menu Mobile */}
        <div className="lg:hidden">
          <Link to="/cart">
            <Button className="bg-[#084ED2] hover:bg-[#084fd2c3] px-6 py-3 rounded-lg relative h-full cursor-pointer">
              <ShoppingCartIcon />
              <span className="absolute top-0 right-0 text-[12px] text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                {cart?.length}
              </span>
            </Button>
          </Link>
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className=" text-white"
            variant={"ghost"}
          >
            {isMobileMenuOpen ? (
              <XIcon size={30} />
            ) : (
              <AlignJustifyIcon size={30} />
            )}
          </Button>
        </div>

        <div className=" items-center gap-4 hidden lg:flex" ref={searchRef}>
          <div>
            <Input
              type="text"
              placeholder="Search Movie"
              onChange={handleSearchChange}
              onFocus={() => setShowSearchResults(true)}
              className="w-96 h-10 bg-gray-800 text-white placeholder:text-gray-400"
            />
            {showSearchResults && (
              <ScrollArea>
                <div className="absolute z-50 mt-2 bg-gray-800 rounded-sm overflow-auto max-h-200 w-96">
                  {isLoading && (
                    <div className="flex items-center justify-center h-16">
                      <p className="text-white">Loading...</p>
                    </div>
                  )}
                  {data?.results?.map((item: Movie, index: number) => (
                    <Link to={`/movie/${item.id}`} key={`movie-${index}`}>
                      <div className="flex gap-2 p-2  text-white hover:bg-gray-700">
                        <img
                          src={`${
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${item?.poster_path}`
                              : "https://dummyimage.com/500x750/000/fff"
                          } `}
                          alt={item?.original_title}
                          className="w-16 h-24 rounded-lg"
                        />
                        <div>
                          <p className="text-lg font-semibold">
                            {item.original_title}
                          </p>
                          <p className="text-sm text-gray-400">
                            {item.release_date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link to="/cart">
                <Button className="bg-[#084ED2] hover:bg-[#084fd2c3] px-6 py-3 rounded-lg relative h-full cursor-pointer">
                  <ShoppingCartIcon />
                  <span className="absolute top-0 right-0 text-[12px] text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                    {cart?.length}
                  </span>
                </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent side="bottom">
              {cart?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {cart?.map((item: Cart, index: number) => (
                    <Link to={`/movie/${item.id}`} key={`cart-${index}`}>
                      <div className="flex gap-2 p-2  text-white hover:bg-gray-700">
                        <img
                          src={`${
                            item?.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${item?.poster_path}`
                              : "https://dummyimage.com/500x750/000/fff"
                          } `}
                          alt={item?.original_title}
                          className="w-16 h-24 rounded-lg"
                        />
                        <div>
                          <p className="text-lg font-semibold text-black">
                            {item.original_title}
                          </p>
                          <p className="text-sm text-gray-400">
                            {item.release_date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link to="/cart">
                    <Button className="bg-[#084ED2] hover:bg-[#084fd2c3] px-6 py-3 rounded-lg cursor-pointer">
                      View Cart
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center h-16">
                  <p className="text-white">Cart is empty</p>
                </div>
              )}
            </HoverCardContent>
          </HoverCard>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 bg-black text-white w-full px-8 py-4 space-y-2 z-50">
          {/* <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <p className="hover:text-blue-400">Home</p>
          </Link> */}
        </div>
      )}
    </>
  );
}
