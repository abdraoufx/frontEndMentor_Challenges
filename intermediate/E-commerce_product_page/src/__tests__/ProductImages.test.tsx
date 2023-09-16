import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductImages, {
  removeThumbnailKeyword,
} from "../components/ProductImages";
import { resizeScreenSize } from "./MobileNav.test";

describe("ProductImages Component", () => {
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

  it("renders without errors", () => {
    render(<ProductImages />);

    const showedImage = screen.getByAltText<HTMLImageElement>("Showed Image");
    expect(showedImage).toBeInTheDocument();
  });

  it("current showed image should have first thumbnail source path", () => {
    render(<ProductImages />);

    const showedImage = screen.getByAltText<HTMLImageElement>("Showed Image");
    const thumbnails =
      screen.getAllByAltText<HTMLImageElement>(/picture [1-9]/i);

    // selectedOne By Default
    const firstThumbnail = thumbnails[0];

    expect(showedImage.src).toBe(removeThumbnailKeyword(firstThumbnail.src));
  });

  it("changes current showed image src to the clicked thumbnail image src", () => {
    render(<ProductImages />);

    const thumbnails =
      screen.getAllByAltText<HTMLImageElement>(/picture [1-9]/i);

    const thumbnailToClick = thumbnails[thumbnails.length - 1];
    fireEvent.click(thumbnailToClick);

    // because of transition property in css we have to wait otherwise, getting error
    setTimeout(() => {
      const showedImage = screen.getByAltText<HTMLImageElement>("Showed Image");
      expect(showedImage.src).toBe(
        removeThumbnailKeyword(thumbnailToClick.src)
      );
    }, 250);
  });

  it("arrows in mobile screen exists", () => {
    resizeScreenSize(480);

    render(<ProductImages />);

    const previousIcon =
      screen.getByAltText<HTMLImageElement>(/^previous icon$/i);
    const nextIcon = screen.getByAltText<HTMLImageElement>(/^next icon$/i);

    expect(previousIcon).toBeInTheDocument();
    expect(nextIcon).toBeInTheDocument();
  });

  it("changing current showed image src with arrows in the mobile screen", () => {
    resizeScreenSize(480);

    render(<ProductImages />);

    const previousIcon =
      screen.getByAltText<HTMLImageElement>(/^previous icon$/i);
    const nextIcon = screen.getByAltText<HTMLImageElement>(/^next icon$/i);

    fireEvent.click(nextIcon);
    fireEvent.click(nextIcon);

    const thumbnails =
      screen.getAllByAltText<HTMLImageElement>(/picture [1-9]/i);

    let showedImage = screen.getByAltText<HTMLImageElement>("Showed Image");
    expect(showedImage.src).toBe(removeThumbnailKeyword(thumbnails[2].src));

    fireEvent.click(previousIcon);
    fireEvent.click(previousIcon);

    showedImage = screen.getByAltText<HTMLImageElement>("Showed Image");
    expect(showedImage.src).toBe(removeThumbnailKeyword(thumbnails[0].src));
  });
});
