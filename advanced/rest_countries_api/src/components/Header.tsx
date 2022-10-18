import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

interface Props {
  theme: {
    darkTheme: boolean;
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  };
  returnBasedOnTheme: (valOne: string, valTwo: string) => string;
}

const Header = ({
  theme: { darkTheme, setDarkTheme },
  returnBasedOnTheme,
}: Props) => {
  const setTheme = (): void => {
    setDarkTheme(!darkTheme);
    window.localStorage.setItem("isDarkTheme", JSON.stringify(!darkTheme));
  };

  return (
    <header
      className={`main-page__header main-header trns ${returnBasedOnTheme(
        "bg-dT-darkBlue",
        "bg-white shadow-[inset_0px_-1px_2px_1px_#0000000f]"
      )} `}
    >
      <div
        className={`container main-header__container flex flex-wrap justify-between gap-3 mt-0 mx-auto py-5 px-3`}
      >
        <h1
          className={`font-bold text-xl trns ${returnBasedOnTheme(
            "text-white",
            "text-lT-vryDarkBlue"
          )}`}
        >
          Where In The World ?
        </h1>
        <div
          className="choose-mode cursor-pointer flex items-center gap-3"
          onClick={setTheme}
        >
          <FontAwesomeIcon
            icon={darkTheme ? solid("moon") : regular("moon")}
            color={returnBasedOnTheme("white", "hsl(200, 15%, 8%)")}
            transform={{ rotate: -22 }}
            className="trns"
          />
          <span
            className={`font-semibold trns ${returnBasedOnTheme(
              "text-white",
              "text-lT-vryDarkBlue"
            )}`}
          >
            Dark Mode
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
