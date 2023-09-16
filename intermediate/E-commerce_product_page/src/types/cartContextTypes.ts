export interface CartProductDetails {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface cartContextTypes {
  isCartShowed: boolean;
  setIsCartShowed: React.Dispatch<React.SetStateAction<boolean>>;

  cartProductDetails: CartProductDetails | null;
  setCartProductDetails: React.Dispatch<
    React.SetStateAction<CartProductDetails | null>
  >;
}
