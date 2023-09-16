// there is no file called FocusArea.tsx but need a file for test.
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductImages from "../components/ProductImages";

test("focus area opens/closes correctly", () => {
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

  render(<ProductImages />);

  const showedImage = screen.getByAltText<HTMLImageElement>("Showed Image");
  fireEvent.click(showedImage);

  const closeFoucsAreaIcon = screen.getByAltText(/focus area close icon/i);

  const focusArea = closeFoucsAreaIcon.parentElement?.parentElement;
  expect(focusArea).toHaveClass("show");

  fireEvent.click(closeFoucsAreaIcon);
  expect(focusArea).not.toHaveClass("show");
});
