import { useContext } from "react";
import { CartContextAPI } from "../contexts/CartContext";

const Cart = () => {
  const { isCartShowed, cartProductDetails, setCartProductDetails } =
    useContext(CartContextAPI);

  const renderCartProductDetails = (): JSX.Element => {
    if (!cartProductDetails || cartProductDetails.quantity === 0) {
      return <span className="content__cart-empty">Your cart is empty.</span>;
    }

    const { name, imageUrl, price, quantity } = cartProductDetails;

    return (
      <>
        <div className="content__product-details fx-between-center">
          <img
            src={`${imageUrl}`}
            alt="product image"
            className="product-image"
          />
          <div>
            <span className="name">{name}</span>
            <span className="info">
              {`$${price.toFixed(2)} x ${quantity} `}{" "}
              <span className="info__final-price">
                ${`${(price * quantity).toFixed(2)}`}
              </span>
            </span>
          </div>
          <img
            src="/images/icons/icon-delete.svg"
            alt="Delete icon"
            className="del-icon smoothy-transition"
            onClick={() => setCartProductDetails(null)}
          />
        </div>
        <button
          className="content__checkout-btn smoothy-transition"
          onClick={checkoutTheOrder}
        >
          Checkout
        </button>
      </>
    );
  };

  const checkoutTheOrder = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.classList.contains("checked-out")) return;

    e.currentTarget.classList.add("checked-out");
  };

  return (
    <div
      className={`main-header__shopping-cart-side__box fx-col ${
        isCartShowed ? "showed" : ""
      }`}
    >
      <h3 className="title">
        <span>Cart</span>
      </h3>
      <div className="content fx-full-center fx-col">
        {renderCartProductDetails()}
      </div>
    </div>
  );
};

export default Cart;
