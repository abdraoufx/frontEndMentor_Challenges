import { useEffect, useRef } from "react";

// Doing this because large image has the same path except -thumbnail
export const removeThumbnailKeyword = (thumbnailPath: string): string => {
  return thumbnailPath.replace("-thumbnail", "");
};

const ProductImages = () => {
  const thumbnails = [
    "/images/products_images/image-product-1-thumbnail.jpg",
    "/images/products_images/image-product-2-thumbnail.jpg",
    "/images/products_images/image-product-3-thumbnail.jpg",
    "/images/products_images/image-product-4-thumbnail.jpg",
  ];

  const currentShowedImage = useRef<HTMLImageElement>(null);
  const focusAreaShowedImage = useRef<HTMLImageElement>(null);

  const focusAreaPreviousImageArrow = useRef<HTMLDivElement>(null);
  const focusAreaNextImageArrow = useRef<HTMLDivElement>(null);

  const previousImageArrow = useRef<HTMLDivElement>(null);
  const nextImageArrow = useRef<HTMLDivElement>(null);

  const focusArea = useRef<HTMLDivElement>(null);
  const focusAreaThumbnails = useRef<HTMLDivElement>(null);

  const thumbnailsContainer = useRef<HTMLDivElement>(null);

  const screenToHideFocusAreaOn = window.matchMedia("(max-width: 480px)");

  const openFocusArea = (): void => {
    if (screenToHideFocusAreaOn.matches) return;

    if (focusArea.current) {
      focusArea.current.classList.add("show");
      document.body.style.overflowY = "hidden";
    }
  };

  const closeFoucsArea = (): void => {
    if (focusArea.current) {
      focusArea.current.classList.remove("show");
      document.body.style.overflowY = "visible";
    }
  };

  const clickingFoucsAreaOverlay = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const clickedElement = e.target as HTMLDivElement;

    if (clickedElement.classList.contains("focus-area")) {
      closeFoucsArea();
    }
  };

  const renderThumbnails = (
    imgToChangeSrcOf: React.RefObject<HTMLImageElement>,
    query: string,
    previousImageArrow: React.RefObject<HTMLDivElement>,
    nextImageArrow: React.RefObject<HTMLDivElement>
  ): JSX.Element[] => {
    return thumbnails.map((thumb, idx) => {
      return (
        <div
          className={`thumbnails__thumbnail-container smoothy-transition ${
            idx === 0 ? "selected" : ""
          }`}
          key={thumb}
          onClick={(e) => {
            toggleSelectedClassOnThumbnail(e, query);
            changeImageSrc(thumb, imgToChangeSrcOf);
            updateArrowClasses(idx, previousImageArrow, nextImageArrow);
          }}
        >
          <img src={thumb} alt={`Picture ${idx + 1}`} />
        </div>
      );
    });
  };

  const toggleSelectedClassOnThumbnail = (
    event: React.MouseEvent,
    query: string
  ): void => {
    const clickedThumbnail = event.currentTarget;

    const currentElementWithSelectedClass = document.querySelector(query);

    currentElementWithSelectedClass?.classList.remove("selected");

    clickedThumbnail.classList.add("selected");
  };

  const changeImageSrc = (
    thumbnailPath: string,
    imgToChangeSrcOf: React.RefObject<HTMLImageElement>
  ): void => {
    if (imgToChangeSrcOf.current) {
      imgToChangeSrcOf.current.src = removeThumbnailKeyword(thumbnailPath);
    }
  };

  const updateArrowClasses = (
    clickedElementIdx: number,
    previousImageArrow: React.RefObject<HTMLDivElement>,
    nextImageArrow: React.RefObject<HTMLDivElement>
  ): void => {
    const isPreviousArrowNoLess =
      previousImageArrow.current?.classList.contains("no-less");

    const isNextArrowNoMore =
      nextImageArrow.current?.classList.contains("no-more");

    if (isPreviousArrowNoLess && clickedElementIdx === 0) {
      return;
    }

    if (isNextArrowNoMore && clickedElementIdx === thumbnails.length - 1) {
      return;
    }

    if (isPreviousArrowNoLess) {
      previousImageArrow.current?.classList.remove("no-less");
    }

    if (isNextArrowNoMore) {
      nextImageArrow.current?.classList.remove("no-more");
    }

    if (clickedElementIdx === 0) {
      previousImageArrow.current?.classList.add("no-less");
    } else if (clickedElementIdx === thumbnails.length - 1) {
      nextImageArrow.current?.classList.add("no-more");
    }
  };

  const showImage = (
    delta: number,
    thumbnailsContainer: React.RefObject<HTMLDivElement>,
    nextImageArrow: React.RefObject<HTMLDivElement>,
    previousImageArrow: React.RefObject<HTMLDivElement>,
    imgToChangeSrcOf: React.RefObject<HTMLImageElement>
  ): void => {
    if (!thumbnailsContainer.current) return;

    const allThumbnailsContainers = Array.from(
      thumbnailsContainer.current.querySelectorAll("div")
    );

    const selectedElementIdx = allThumbnailsContainers.findIndex((thumbnail) =>
      thumbnail.classList.contains("selected")
    );

    const newIndex = selectedElementIdx + delta;

    if (newIndex < 0 || newIndex >= allThumbnailsContainers.length) return;

    changeImageSrc(
      (allThumbnailsContainers[newIndex].firstElementChild as HTMLImageElement)
        .src,
      imgToChangeSrcOf
    );

    updateArrowClasses(newIndex, previousImageArrow, nextImageArrow);

    allThumbnailsContainers[selectedElementIdx].classList.remove("selected");
    allThumbnailsContainers[newIndex].classList.add("selected");
  };

  const showNextImage = (
    thumbnailsContainer: React.RefObject<HTMLDivElement>,
    previousImageArrow: React.RefObject<HTMLDivElement>,
    nextImageArrow: React.RefObject<HTMLDivElement>,
    imgToChangeSrcOf: React.RefObject<HTMLImageElement>
  ): void => {
    showImage(
      1,
      thumbnailsContainer,
      nextImageArrow,
      previousImageArrow,
      imgToChangeSrcOf
    );
  };

  const showPrevImage = (
    thumbnailsContainer: React.RefObject<HTMLDivElement>,
    previousImageArrow: React.RefObject<HTMLDivElement>,
    nextImageArrow: React.RefObject<HTMLDivElement>,
    imgToChangeSrcOf: React.RefObject<HTMLImageElement>
  ): void => {
    showImage(
      -1,
      thumbnailsContainer,
      nextImageArrow,
      previousImageArrow,
      imgToChangeSrcOf
    );
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (screenToHideFocusAreaOn.matches) {
        closeFoucsArea();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="product-section__images fx-col">
      <div className="current-showed-img__wrapper" onClick={openFocusArea}>
        <img
          src={removeThumbnailKeyword(thumbnails[0])}
          alt="Showed Image"
          className="current-showed-img__wrapper__img smoothy-transition"
          ref={currentShowedImage}
        />
        <div
          className="arrow-1-container no-less smoothy-transition"
          onClick={() =>
            showPrevImage(
              thumbnailsContainer,
              previousImageArrow,
              nextImageArrow,
              currentShowedImage
            )
          }
          ref={previousImageArrow}
        >
          <img src="/images/icons/icon-previous.svg" alt="Previous icon" />
        </div>
        <div
          className="arrow-2-container smoothy-transition"
          onClick={() =>
            showNextImage(
              thumbnailsContainer,
              previousImageArrow,
              nextImageArrow,
              currentShowedImage
            )
          }
          ref={nextImageArrow}
        >
          <img src="/images/icons/icon-next.svg" alt="next icon" />
        </div>
      </div>
      <div
        className="thumbnails fx-between-center smoothy-transition"
        ref={thumbnailsContainer}
      >
        {renderThumbnails(
          currentShowedImage,
          ".thumbnails__thumbnail-container.selected",
          previousImageArrow,
          nextImageArrow
        )}
      </div>

      <div
        className="focus-area fx-full-center fx-col orange-scrollbar"
        onClick={clickingFoucsAreaOverlay}
        ref={focusArea}
      >
        <div className="fx-col">
          <img
            src="/images/icons/icon-close.svg"
            alt="focus area close icon"
            className="focus-area__close-icon"
            onClick={closeFoucsArea}
          />
          <div className="focus-area__current-showed-img-container">
            <img
              src={removeThumbnailKeyword(thumbnails[0])}
              alt="Current showed image"
              className="showed-img"
              ref={focusAreaShowedImage}
            />
            <div
              className="arrow-1-container no-less smoothy-transition"
              onClick={() =>
                showPrevImage(
                  focusAreaThumbnails,
                  focusAreaPreviousImageArrow,
                  focusAreaNextImageArrow,
                  focusAreaShowedImage
                )
              }
              ref={focusAreaPreviousImageArrow}
            >
              <img
                src="/images/icons/icon-previous.svg"
                alt="Focus Area Previous Icon"
              />
            </div>
            <div
              className="arrow-2-container smoothy-transition"
              onClick={() =>
                showNextImage(
                  focusAreaThumbnails,
                  focusAreaPreviousImageArrow,
                  focusAreaNextImageArrow,
                  focusAreaShowedImage
                )
              }
              ref={focusAreaNextImageArrow}
            >
              <img
                src="/images/icons/icon-next.svg"
                alt="Foucs Area Next Icon"
              />
            </div>
          </div>
          <div
            className="focus-area__thumbnails fx-between-center"
            ref={focusAreaThumbnails}
          >
            {renderThumbnails(
              focusAreaShowedImage,
              ".focus-area__thumbnails .selected",
              focusAreaPreviousImageArrow,
              focusAreaNextImageArrow
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
