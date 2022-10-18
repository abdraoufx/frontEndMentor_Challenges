import React, { useEffect, useState } from "react";
import getCountries from "./api/getCountries";
import Header from "./components/Header";
import SearchingAndFiltering from "./components/SearchingAndFiltering";
import ShowCountries from "./components/ShowCountries";
import { Routes, Route } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import LoadingScreen from "./components/LoadingScreen";
import Error from "./components/Error";

/* TODO: 

  1 => Make A Loading Screen  DONE:
  4 => Do Responsive DONE:
  3 => FIXME: Some Flags Images Are Not Taking Full Width And Height Maybe Cause Of Flex DONE:
  6 => Add Load More Countries Or Load New Ones. DONE:
  8 => FIXME: => Sub Error Is When Filtering One Time If You Click To Filter Again Nothing Will Return 
  Because We Editing On The Original Array. DONE:
  2 => Edit Styles Based On The Theme DONE:
    => Add Dark Theme To LocalStorage And What Must Do, Then Edit Loading Screen Based On The localStorage. DONE:
  - Handle Error. DONE:
  7 => Edit Variables And Functions Names. DONE:
  5 => Try Refactor More Code For More Readable Code. DONE: 90%
*/

export interface Country {
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [clonedCountries, setClonedCountries] = useState<Country[]>([]);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [requestFailed, setRequestFailed] = useState<boolean>(false);

  useEffect(() => {
    getCountries("/all")
      .then((fetchedCountries: Country[]) => {
        setCountries(fetchedCountries);
        setClonedCountries(fetchedCountries);
        setLoading(false);
      })
      .catch(() => setRequestFailed(true));
  }, []);

  useEffect(() => {
    const valueFromStorage = window.localStorage.getItem("isDarkTheme");
    if (valueFromStorage && valueFromStorage === "false") setDarkTheme(false);
    if (valueFromStorage && valueFromStorage === "true") setDarkTheme(true);
  }, [darkTheme]);

  const returnBasedOnTheme = (
    valueOneToReturn: string,
    valueTwoToReturn: string
  ): string => {
    if (darkTheme) {
      return valueOneToReturn;
    } else {
      return valueTwoToReturn;
    }
  };

  return (
    <main className="main-page">
      {requestFailed ? (
        <Error returnBasedOnTheme={returnBasedOnTheme} />
      ) : (
        <>
          {loading ? (
            <LoadingScreen returnBasedOnTheme={returnBasedOnTheme} />
          ) : (
            <>
              <Header
                theme={{ darkTheme, setDarkTheme }}
                returnBasedOnTheme={returnBasedOnTheme}
              />
              <section
                className={`main-section h-full py-12 trns ${
                  darkTheme ? "bg-dT-vryDarkBlue" : "bg-lT-lightGray"
                }`}
              >
                <div className="container my-0 mx-auto px-4">
                  <Routes>
                    <Route
                      path="/frontEndMentor_Challenges/advanced/rest_countries_api/build/"
                      element={
                        <>
                          <SearchingAndFiltering
                            setClonedCountries={setClonedCountries}
                            countries={countries}
                            returnBasedOnTheme={returnBasedOnTheme}
                          />
                          <ShowCountries
                            clonedCountries={clonedCountries}
                            returnBasedOnTheme={returnBasedOnTheme}
                          />
                        </>
                      }
                    />
                    <Route
                      path="/frontEndMentor_Challenges/advanced/rest_countries_api/build/country/:countryName"
                      element={
                        <CountryDetails
                          darkTheme={darkTheme}
                          returnBasedOnTheme={returnBasedOnTheme}
                        />
                      }
                    />
                    <Route
                      path="/frontEndMentor_Challenges/advanced/rest_countries_api/build/search/:countryName"
                      element={
                        <CountryDetails
                          darkTheme={darkTheme}
                          returnBasedOnTheme={returnBasedOnTheme}
                        />
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <Error returnBasedOnTheme={returnBasedOnTheme} />
                      }
                    />
                  </Routes>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default App;
