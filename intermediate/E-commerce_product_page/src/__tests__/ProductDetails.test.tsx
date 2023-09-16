import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductDetails from "../components/ProductDetails";
import { CartContext } from "../contexts/CartContext";
import App from "../App";

test("renders component without errors", () => {
  render(<ProductDetails />);

  const companyName = screen.getByText(/SNEAKER COMPANY/i);
  expect(companyName).toBeInTheDocument();
});

test("increment/decrement quantity to add to cart functionallity", () => {
  render(<ProductDetails />);

  const decrementBtn = screen.getByAltText(/minus icon/i);
  const incrementBtn = screen.getByAltText(/plus icon/i);

  expect(decrementBtn).toBeInTheDocument();
  expect(incrementBtn).toBeInTheDocument();

  let quantitySpan = decrementBtn.nextElementSibling;
  expect(quantitySpan?.textContent).toBe("0");

  fireEvent.click(incrementBtn);
  fireEvent.click(incrementBtn);

  quantitySpan = decrementBtn.nextElementSibling;
  expect(quantitySpan?.textContent).toBe("2");

  fireEvent.click(decrementBtn);

  quantitySpan = decrementBtn.nextElementSibling;
  expect(quantitySpan?.textContent).toBe("1");
});

test.only("adding to/deleting from cart", () => {
  // walkaround of window.matchMedia is not function
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  render(
    <CartContext>
      <App />
    </CartContext>
  );

  const addToCartBtn = screen.getByText(/add to cart/i);
  expect(addToCartBtn).toBeInTheDocument();

  // Nothing Should happen because quantity is 0
  fireEvent.click(addToCartBtn);

  const cartContent = screen.getByText(/your cart is empty./i);
  expect(cartContent).toBeInTheDocument(); // cart is empty

  const incrementBtn = screen.getByAltText(/plus icon/i);
  fireEvent.click(incrementBtn);
  fireEvent.click(addToCartBtn); // add the product

  // if checkout button exists means that there is product in our cart
  const checkoutBtn = screen.getByText(/checkout/i);
  expect(checkoutBtn).toBeInTheDocument();

  const delProductIcon = screen.getByAltText(/delete icon/i);
  expect(delProductIcon).toBeInTheDocument();

  // deleting product
  fireEvent.click(delProductIcon);
  expect(checkoutBtn).not.toBeInTheDocument();
});
