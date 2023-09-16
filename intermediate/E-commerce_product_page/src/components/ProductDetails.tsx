import { useContext, useState } from "react";
import { CartContextAPI } from "../contexts/CartContext";

interface Product {
  name: string;
  discount: number;
  price: number;
  finalPrice: number;
}

const ProductDetails = () => {
  const { setCartProductDetails } = useContext(CartContextAPI);

  const product: Product = {
    name: "Fall Limited Edition Sneakers",
    discount: 50,
    price: 250,
    finalPrice: (250 * 50) / 100,
  };

  const [orderedQuantity, setOrderedQuantity] = useState<number>(0);

  const incrementQuantity = (): void => {
    if (orderedQuantity !== 7) setOrderedQuantity(orderedQuantity + 1);
  };

  const decrementQuantity = (): void => {
    if (orderedQuantity !== 0) setOrderedQuantity(orderedQuantity - 1);
  };

  const addToCart = (): void => {
    const productImage = document.querySelector<HTMLImageElement>(
      ".product-section__images .current-showed-img__wrapper__img"
    );

    setCartProductDetails({
      name: product.name,
      imageUrl: addThumbnailKeyword(productImage?.src ?? ""),
      quantity: orderedQuantity,
      price: product.finalPrice,
    });

    setOrderedQuantity(0);
  };

  const addThumbnailKeyword = (path: string): string => {
    return path.replace(".jpg", "-thumbnail.jpg");
  };

  return (
    <div className="product-section__details fx-col">
      <h5 className="company-name">Sneaker Company</h5>
      <h1 className="product-name">{product.name}</h1>
      <p className="product-description">
        These low-profile sneakers are you perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer.
      </p>
      <div className="payment-details">
        <div className="product-price fx-y-center">
          <span className="product-price__cost">
            ${product.finalPrice.toFixed(2)}
          </span>
          <span className="product-price__discount-percentage">
            {product.discount}%
          </span>
        </div>
        <span className="product-old-price">${product.price.toFixed(2)}</span>
      </div>
      <div className="buttons fx-y-center">
        <div className="buttons__quantity-btn fx-y-center">
          <img
            src="/images/icons/icon-minus.svg"
            alt="Minus icon"
            onClick={decrementQuantity}
          />
          <span>{orderedQuantity}</span>
          <img
            src="/images/icons/icon-plus.svg"
            alt="Plus icon"
            onClick={incrementQuantity}
          />
        </div>
        <button
          className="buttons__add-to-cart-btn fx-full-center smoothy-transition"
          onClick={addToCart}
        >
          <img src="/images/icons/icon-cart.svg" alt="Cart icon" />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
