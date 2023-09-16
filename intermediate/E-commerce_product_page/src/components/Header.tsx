import { useContext } from "react";
import { CartContextAPI } from "../contexts/CartContext";
import Cart from "./Cart";
import { MobileNavContextAPI } from "../contexts/MobileNavContext";

const Header = () => {
  const { isCartShowed, setIsCartShowed, cartProductDetails } =
    useContext(CartContextAPI);

  const { setIsMobileNavShowed } = useContext(MobileNavContextAPI);

  // closing the cart box when opened and clicked any place not the actual cart
  window.onclick = (e) => {
    const isCartBoxClicked = (e.target as HTMLElement).closest(
      ".main-header__shopping-cart-side__box"
    );

    const isCartIcon = (e.target as HTMLElement).classList.contains(
      "main-header__shopping-cart-side__icon"
    );

    const addToCartBtn = (e.target as HTMLElement).closest(
      ".buttons__add-to-cart-btn"
    );
    const quantityBtn = (e.target as HTMLElement).closest(
      ".buttons__quantity-btn"
    );

    if (
      isCartShowed &&
      !isCartIcon &&
      !isCartBoxClicked &&
      !addToCartBtn &&
      !quantityBtn
    ) {
      setIsCartShowed(false);
    }
  };

  const handleClickingCartIcon = () => {
    setIsCartShowed(!isCartShowed);
  };

  return (
    <header className="main-header">
      <div className="main-header__container main-container fx-between-center">
        <div className="main-header__navigation-side fx-y-center">
          <img
            src="/images/icons/icon-menu.svg"
            alt="Hamb Icon"
            className="hamburger-menu"
            onClick={() => setIsMobileNavShowed(true)}
          />
          <img src="/images/logo.svg" alt="App logo" className="app-logo" />
          <nav className="fx-y-center smoothy-transition">
            <span>Collections</span>
            <span>Men</span>
            <span>Women</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
        </div>
        <div className="main-header__shopping-cart-side fx-y-center">
          <div className="main-header__shopping-cart-side__icon-wrapper">
            <img
              src="/images/icons/icon-cart.svg"
              alt="Shopping Cart Icon"
              className="main-header__shopping-cart-side__icon"
              onClick={handleClickingCartIcon}
            />
            {cartProductDetails && cartProductDetails.quantity > 0 ? (
              <span className="cart-quantity">
                {cartProductDetails.quantity}
              </span>
            ) : null}
          </div>
          <div className="main-header__shopping-cart-side__user-avatar-wrapper smoothy-transition">
            <img src="/images/user-avatar.png" alt="User avatar" />
          </div>
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Header;
