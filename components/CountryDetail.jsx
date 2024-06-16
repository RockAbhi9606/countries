import { useContext, useEffect, useState } from "react";
import axios from "axios";

import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const CountryDetail = () => {
  const countryName = useParams().countries;
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { state } = useLocation();
  // const [isDark] = useOutletContext();
  const [isDark] = useContext(ThemeContext);

  function updateState(data) {
    const country = data;
    setCountryData({
      name: country.name.common || country.name,
      nativeName: Object.values(country.name.nativeName || {})[0]?.common,
      population: country.population.toLocaleString("en-IN"),
      region: country.region,
      subregion: country.subregion,
      capital: country.capital,
      flag: country.flags.svg,
      tld: country.tld,
      languages: Object.values(country.languages || {}).join(", "),
      currencies: Object.values(country.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      borders: [],
    });

    if (!country.borders) {
      country.borders = [];
    }

    Promise.all(
      country.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setCountryData((prevState) => ({ ...prevState, borders }));
    });
  }

  useEffect(() => {
    if (state) {
      updateState(state);
    } else {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(({ data: [dataCountry] }) => {
          // const [dataCountry] = data;
          // console.log(dataCountry)
          updateState(dataCountry);
        })
        .catch((error) => {
          setNotFound(true);
        });
    }
  }, [countryName]);

  if (notFound) {
    return <h1>Country Not Found</h1>;
  }

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span onClick={() => history.back()} className="back-button">
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
          "loading.....!!!!"
        ) : (
          // <CountryDetailShimmer />
          <div className="country-details">
            <img src={countryData.flag} alt={`${countryData.name} flag`} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: {countryData.nativeName}</b>
                  <span className="native-name"></span>
                </p>
                <p>
                  <b>Population: {countryData.population}</b>
                  <span className="population"></span>
                </p>
                <p>
                  <b>Region: {countryData.region}</b>
                  <span className="region"></span>
                </p>
                <p>
                  <b>Sub Region: {countryData.subregion}</b>
                  <span className="sub-region"></span>
                </p>
                <p>
                  <b>Capital: {countryData.capital?.join(", ")}</b>
                  <span className="capital"></span>
                </p>
                <p>
                  <b>Top Level Domain: {countryData.tld}</b>
                  <span className="top-level-domain"></span>
                </p>
                <p>
                  <b>Currencies: {countryData.currencies}</b>
                  <span className="currencies"></span>
                </p>
                <p>
                  <b className="country-langauge">
                    Languages: {countryData.languages}
                  </b>
                  <span className="languages"></span>
                </p>
              </div>
              {countryData.borders.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((country) => (
                    <Link key={country} to={`/${country}`}>
                      {country}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CountryDetail;
