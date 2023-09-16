import { createContext, useState } from "react";
import {
  CartProductDetails,
  cartContextTypes,
} from "../types/cartContextTypes";

export type contextProviderProps = {
  children: React.ReactNode;
};

const contextDefaultValues = {
  isCartShowed: false,
  setIsCartShowed: () => {},

  cartProductDetails: null,
  setCartProductDetails: () => {},
};

export const CartContextAPI =
  createContext<cartContextTypes>(contextDefaultValues);

export const CartContext = ({ children }: contextProviderProps) => {
  const [isCartShowed, setIsCartShowed] = useState<boolean>(false);
  const [cartProductDetails, setCartProductDetails] =
    useState<CartProductDetails | null>(null);

  return (
    <CartContextAPI.Provider
      value={{
        isCartShowed,
        setIsCartShowed,

        cartProductDetails,
        setCartProductDetails,
      }}
    >
      {children}
    </CartContextAPI.Provider>
  );
};
