import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";
import { CartContext } from "../contexts/CartContext";
import MobileNavContext from "../contexts/MobileNavContext";

it("should renders header without errors", () => {
  const { getByText } = render(<Header />);

  expect(getByText("Collections")).toBeInTheDocument();
});

it("should opens/closes the cart when clicking cart icon", () => {
  const { getByRole, getByAltText } = render(
    <CartContext>
      <Header />
    </CartContext>
  );

  const cartIcon = getByAltText("Shopping Cart Icon");
  expect(cartIcon).toBeInTheDocument();

  const cart = getByRole("heading", {
    name: "Cart",
  }).parentElement;

  fireEvent.click(cartIcon);
  expect(cart).toHaveClass("showed");

  fireEvent.click(cartIcon);
  expect(cart).not.toHaveClass("showed");
});

it.only("should renders shows hamburger icon on medium and small pages", () => {
  const { getByAltText } = render(
    <MobileNavContext>
      <Header />
    </MobileNavContext>
  );

  const hamburgerIcon = getByAltText("Hamb Icon");

  expect(hamburgerIcon).toBeVisible();
});
