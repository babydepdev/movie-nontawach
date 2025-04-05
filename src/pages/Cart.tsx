import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon, XIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeFromCart, clearCart } from "@/features/cart/cartSlice";
import { Movie } from "@/types/global";
import { Cart as CartType } from "@/types/global";
import { RootState } from "@/store";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(60);

      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime !== null && prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsOpen(false);
            toast.error("Time expired. Please try again.");
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    if (!cart || cart.length === 0) return 0;

    if (cart.length >= 5) {
      return cart.reduce(
        (total: number, item: Movie) => total + item.price * 0.8,
        0
      );
    } else if (cart.length >= 3) {
      return cart.reduce(
        (total: number, item: Movie) => total + item.price * 0.9,
        0
      );
    } else {
      return cart.reduce((total: number, item: Movie) => total + item.price, 0);
    }
  };

  return (
    <>
      <div className="bg-[#F5F5F5] h-screen">
        <div className="container mx-auto pt-10 w-full px-4">
          <h1 className="text-black text-2xl font-bold my-4">
            Cart Shop Movies
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-3/4 p-0 md:p-4 overflow-x-auto">
              <Table className="min-w-[600px] bg-white rounded-sm shadow-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead>Movie</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart?.map((item: CartType, index: number) => (
                    <TableRow key={`cart-item-${index}`}>
                      <TableCell className="flex items-center gap-2 text-black">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                          className="w-20 h-16 object-cover rounded"
                          alt={item?.original_title}
                        />
                        <span className="text-sm font-medium">
                          {item?.original_title}
                        </span>
                      </TableCell>
                      <TableCell className="text-black text-sm">
                        {item?.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                      <TableCell>
                        <Button
                          className="bg-red-500 hover:bg-red-600 rounded text-white cursor-pointer"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <TrashIcon size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {cart.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No items in cart
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell colSpan={2}></TableCell>
                    <TableCell>
                      <Button
                        className="bg-red-500 hover:bg-red-600 rounded text-white flex items-center gap-2 cursor-pointer"
                        onClick={handleClearCart}
                      >
                        <XIcon size={18} /> Clear Cart
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="w-full md:w-1/4 p-0 md:p-4">
              <div className="bg-white p-4 rounded-sm shadow-sm sticky top-4">
                <h2 className="text-lg font-semibold text-black">
                  Cart Summary
                </h2>
                <p className="text-gray-600 mt-2">
                  You have {cart.length} items in your cart.
                </p>
                <p className="text-gray-600 mt-2">
                  Total Price:{" "}
                  {cart
                    .reduce(
                      (total: number, item: Movie) => total + item.price,
                      0
                    )
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                </p>
                <p className="text-gray-600 mt-2">
                  Discount:{" "}
                  {cart.length >= 5 ? "20%" : cart.length >= 3 ? "10%" : "0%"}
                </p>
                <p className="text-gray-600 mt-2">
                  Price After Discount:{" "}
                  {calculateTotal().toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full my-4 bg-green-500 hover:bg-green-600 cursor-pointer"
                      disabled={cart.length === 0}
                    >
                      CheckOut
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Scan this QR code to pay
                      </DialogTitle>
                      <DialogDescription>
                        <img src="/qrcode.jpg" alt="QR Code" />
                        {timeLeft !== null && (
                          <>
                            <p className="mt-2 text-red-500 text-center text-lg">
                              Time left: {timeLeft} seconds
                            </p>
                            <Progress value={(timeLeft / 60) * 100} />
                          </>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
