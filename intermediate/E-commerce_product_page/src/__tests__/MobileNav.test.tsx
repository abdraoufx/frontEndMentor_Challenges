import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MobileNavContext from "../contexts/MobileNavContext";
import App from "../App";

describe("MobileNav Component", () => {
  resizeScreenSize(768);

  it("renders component without errors", () => {
    render(
      <MobileNavContext>
        <App />
      </MobileNavContext>
    );

    const mobileNav = screen.getByAltText("Close icon").parentElement;
    expect(mobileNav).toBeInTheDocument();
  });

  it("opens/closes mobile nav on mobile/medium devices", () => {
    render(
      <MobileNavContext>
        <App />
      </MobileNavContext>
    );

    const mobileNav = screen.getByAltText("Close icon").parentElement;

    const hamburgerIcon = screen.getByAltText("Hamb Icon");
    fireEvent.click(hamburgerIcon);

    expect(mobileNav).toHaveClass("showed");

    const closeNavIcon = screen.getByAltText("Close icon");
    fireEvent.click(closeNavIcon);

    expect(mobileNav).not.toHaveClass("showed");
  });
});

function createMatchMedia(width: number) {
  const mediaQuery = require("css-mediaquery");

  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
}

export function resizeScreenSize(width: number) {
  window.matchMedia = createMatchMedia(width);
}
