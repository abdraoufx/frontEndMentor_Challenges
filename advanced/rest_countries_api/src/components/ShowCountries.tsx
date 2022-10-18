import { useState } from "react";
import { Country } from "../App";
import { useNavigate } from "react-router-dom";

interface Props {
  clonedCountries: Country[];
  returnBasedOnTheme: (valOne: string, valTwo: string) => string;
}

enum GRID_NUMS {
  COLS = 2,
  ROWS = 4,
}

const ShowCountries = ({
  clonedCountries,
  returnBasedOnTheme,
}: Props): JSX.Element => {
  const GRID_ROWS_AND_COLS: number = GRID_NUMS.COLS * GRID_NUMS.ROWS;

  let [countriesToShow, setCountriesToShow] =
    useState<number>(GRID_ROWS_AND_COLS);

  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(true);

  const navigateTo = useNavigate();

  const renderCountries = (
    countries: Country[],
    arrLength: number
  ): JSX.Element[] => {
    const copyOfArr: Country[] = [...countries];
    copyOfArr.length = arrLength;

    if (copyOfArr.length >= countries.length) setShowLoadMoreButton(false);

    return copyOfArr.map(({ flag, name, population, region, capital }) => {
      return (
        <div
          className={`country flex flex-col w-[245px] cursor-pointer ${returnBasedOnTheme(
            "",
            "shadow-lT-shadow"
          )}`}
          key={name}
          onClick={() => handleCountryClick(name)}
        >
          <div className="flag-wrapper h-40 w-full">
            <img
              src={flag}
              alt={name}
              className="w-full h-full flag-wrapper__flag rounded rounded-b-none"
            />
          </div>
          <div
            className={`country__more-info flex flex-col flex-1 justify-between py-4 px-6 rounded rounded-t-none trns ${returnBasedOnTheme(
              "bg-dT-darkBlue text-white",
              "bg-white text-vryDarkBlue"
            )}`}
          >
            <span className="name font-bold mb-3">{name}</span>
            <span className="population">
              <span className="txt capitalize font-semibold mb-1">
                population:{" "}
              </span>
              {population}
            </span>
            <span className="region">
              <span className="txt capitalize font-semibold mb-1">
                region:{" "}
              </span>
              {region}
            </span>
            <span className="capital">
              <span className="txt capitalize font-semibold mb-1">
                capital:{" "}
              </span>
              {capital}
            </span>
          </div>
        </div>
      );
    });
  };

  const handleCountryClick = (countryName: string): void => {
    navigateTo(
      `/frontEndMentor_Challenges/advanced/rest_countries_api/build/country/${countryName}`
    );
  };

  const loadMoreCountries = (): void => {
    setCountriesToShow((countriesToShow += GRID_ROWS_AND_COLS));
  };

  return (
    <section className="countries flex justify-center sm:justify-between flex-wrap gap-14">
      {renderCountries(clonedCountries, countriesToShow)}
      {showLoadMoreButton && (
        <div className="btn-wrapper w-full flex justify-center">
          <button
            className={`btn-load-more capitalize rounded font-bold px-4 py-2 focus:outline-none ${returnBasedOnTheme(
              "bg-dT-darkBlue text-white",
              "bg-white text-darkBlue shadow-lT-shadow"
            )}`}
            onClick={loadMoreCountries}
          >
            load more...
          </button>
        </div>
      )}
    </section>
  );
};

export default ShowCountries;
