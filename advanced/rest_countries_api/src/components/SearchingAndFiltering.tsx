import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Country } from "../App";

interface Props {
  setClonedCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  countries: Country[];
  returnBasedOnTheme: (valOne: string, valTwo: string) => string;
}

const SearchingAndFiltering = ({
  setClonedCountries,
  countries,
  returnBasedOnTheme,
}: Props) => {
  const [searchForCountry, setSearchForCountry] = useState<string>("");
  const [dropdownShowed, setDropdownShowed] = useState<boolean>(false);

  const regions: string[] = ["africa", "americas", "asia", "europe", "oceania"];

  const navigateTo = useNavigate();

  const searchInputDOMElement: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const handleSearchEnterHit = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13)
      navigateTo(
        `/frontEndMentor_Challenges/advanced/rest_countries_api/build/search/${searchForCountry}`
      );
  };

  const handleRegionFilter = (region: string): void => {
    setDropdownShowed(false);
    setClonedCountries([
      ...countries.filter((country) => country.region.toLowerCase() === region),
    ]);
  };

  const handleDropdownClick = (): void => {
    setDropdownShowed(!dropdownShowed);
  };

  const resetAllCountries = (): void => {
    setClonedCountries([...countries]);
  };

  return (
    <div className="search-and-filter flex flex-wrap justify-between mb-12 gap-7">
      <div
        className={`search-box-container flex items-center gap-4 py-4 px-6 rounded w-full sm:w-[450px] trns ${returnBasedOnTheme(
          "bg-dT-darkBlue",
          "bg-white shadow-lT-shadow"
        )}`}
        onClick={(): void => searchInputDOMElement.current?.focus()}
      >
        <FontAwesomeIcon
          icon={faSearch}
          color={returnBasedOnTheme("white", "hsl(200, 15%, 8%)")}
          className="trns"
        />
        <input
          type="text"
          name="searchForCountry"
          id="searchForCountryInput"
          placeholder="Search for a country..."
          className={`search-box-container__searchInput focus:outline-none bg-[transparent] font-semibold placeholder:font-semibold placeholder:text-inherit flex-1 trns ${returnBasedOnTheme(
            "text-white",
            "text-lT-vryDarkBlue"
          )}`}
          maxLength={18}
          onChange={({ target: { value } }): void => setSearchForCountry(value)}
          onKeyDown={handleSearchEnterHit}
          ref={searchInputDOMElement}
        />
      </div>
      <div
        className={`filter-by-region-dropdown capitalize font-semibold flex items-center gap-12 bg-inherit py-4 px-5 rounded cursor-pointer relative trns ${returnBasedOnTheme(
          "text-white bg-dT-darkBlue",
          "bg-white text-lT-vryDarkBlue shadow-lT-shadow"
        )}`}
        onClick={handleDropdownClick}
      >
        filter by region
        <FontAwesomeIcon
          icon={faAngleDown}
          color={returnBasedOnTheme("white", "hsl(200, 15%, 8%)")}
          className="trns"
          size="sm"
          flip={`${dropdownShowed ? "horizontal" : "vertical"}`}
        />
        <ul
          className={`filter-by-region-dropdown__menu list-none absolute left-0 top-[61px] w-full px-5 py-3 flex flex-col gap-2 rounded trns 
          ${dropdownShowed ? "opacity-100 visible " : "opacity-0 invisible "}
          ${returnBasedOnTheme(
            "bg-dT-darkBlue",
            "bg-white shadow-[3px_2px_0px_-2px_#0000001a,_0px_0px_0px_2px_#0000001a;]"
          )}
          `}
        >
          {regions.map((region) => (
            <li key={region} onClick={() => handleRegionFilter(region)}>
              {region}
            </li>
          ))}
          <li className="capitalize" onClick={resetAllCountries}>
            all
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchingAndFiltering;
