import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import getCountries from "../api/getCountries";
import { Country } from "../App";

interface Props {
  darkTheme: boolean;
  returnBasedOnTheme: (valOne: string, valTwo: string) => string;
}

type LinkParams = {
  readonly countryName: string;
};

export interface DetailedCountry extends Country {
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: { code: string; name: string; symbol: string }[];
  languages: { name: string; nativeName: string }[];
  borders: string[];
}

const CountryDetails = ({ returnBasedOnTheme }: Props): JSX.Element => {
  const { countryName } = useParams<LinkParams>();
  const [detailedCountry, setDetailedCountry] = useState<DetailedCountry[]>([]); // Getting [] instead of single Object

  useEffect(() => {
    getCountries(`/name/${countryName}?fullText=true`).then(
      (fetchedCountry: DetailedCountry[]) => {
        setDetailedCountry([...fetchedCountry]);
      }
    );
  }, [countryName]);

  const renderCountryElements = (country: DetailedCountry[]): JSX.Element[] => {
    return country.map(
      ({
        flag,
        name,
        nativeName,
        population,
        region,
        subregion,
        capital,
        topLevelDomain,
        currencies,
        languages,
        borders,
      }) => {
        return (
          <div
            className={`country-details__wrapper flex flex-wrap justify-start sm:justify-between capitalize ${returnBasedOnTheme(
              "text-white",
              "text-darkBlue"
            )}`}
            key={name}
          >
            <img
              src={flag}
              alt={name}
              className="w-full max-w-[525px] sm:w-[49%] mb-8 shadow-lT-shadow"
            />
            <div className="info flex flex-col gap-5 justify-evenly w-full sm:w-[45%]">
              <span className="name font-bold text-3xl trns">{name}</span>
              <div className="more-details flex flex-col justify-between sm:flex-row">
                <div className="more-details__left-side flex flex-col gap-2">
                  <span className="trns">
                    <span className="font-semibold trns">native name: </span>
                    {nativeName}.
                  </span>
                  <span className="trns">
                    <span className="font-semibold trns">population: </span>
                    {population}.
                  </span>
                  <span className="trns">
                    <span className="font-semibold trns">region: </span>
                    {region}.
                  </span>
                  <span className="trns">
                    <span className="font-semibold trns">sub region: </span>
                    {subregion}.
                  </span>
                  <span className="trns">
                    <span className="font-semibold trns">capital: </span>
                    {capital}.
                  </span>
                </div>
                <div className="more-details__right-side flex flex-col gap-2">
                  <span>
                    <span className="font-semibold trns">
                      top level domain:{" "}
                    </span>
                    {topLevelDomain.map((domain, idx, { length }) => {
                      return (
                        <span key={domain} className="trns">
                          {domain}
                          {length - 1 === idx ? "." : ","}
                        </span>
                      );
                    })}
                  </span>
                  <span>
                    <span className="font-semibold trns">currencies: </span>
                    {currencies.map((currency, idx, { length }) => (
                      <span key={currency.name} className="trns">
                        {currency.name}
                        {length - 1 === idx ? "." : ","}
                      </span>
                    ))}
                  </span>
                  <span>
                    <span className="font-semibold trns">languages: </span>
                    {languages.map((lang, idx, { length }) => (
                      <span key={lang.name} className="trns">
                        {lang.name}
                        {length - 1 === idx ? "." : ","}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
              {borders && (
                <div className="border-countries flex gap-4 justify-between flex-wrap">
                  <span className="border-countries__txt font-semibold mr-4 w-fit trns">
                    border countries:
                  </span>
                  <div className="border-countries__countries inline-flex gap-2 flex-wrap trns">
                    {borders.map((borderCountry) => {
                      return (
                        <span
                          key={borderCountry}
                          className={`py-1 px-8 rounded text-[14px] trns ${returnBasedOnTheme(
                            "bg-dT-darkBlue",
                            "bg-white shadow-lT-shadow"
                          )}`}
                        >
                          {borderCountry}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }
    );
  };

  return (
    <div className="country-details flex flex-col gap-14">
      <Link
        to="/"
        className={`go-back w-fit py-2 px-8 flex gap-3 items-center rounded trns ${returnBasedOnTheme(
          "bg-dT-darkBlue",
          "bg-white shadow-lT-shadow"
        )}`}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          color={`${returnBasedOnTheme("white", "hsl(200, 15%, 8%)")}`}
          fontSize="14px"
          className="trns"
        />
        <button
          className={`text-[15px] trns ${returnBasedOnTheme(
            "text-white",
            "text-darkBlue"
          )}`}
        >
          Back
        </button>
      </Link>
      {renderCountryElements(detailedCountry)}
    </div>
  );
};

export default CountryDetails;
