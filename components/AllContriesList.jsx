import { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import AllContriesListShimmer from "./AllContriesListShimmer";

const AllContriesList = ({ searchCountry, searchByRegion }) => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountriesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!countriesData.length) {
    return <AllContriesListShimmer />;
  }

  // First, filter by region if searchByRegion is provided
  let filteredCountries = countriesData;
  if (searchByRegion) {
    filteredCountries = filteredCountries.filter((country) =>
      country.region.toLowerCase().includes(searchByRegion.toLowerCase())
    );
  }

  // Then, filter by country name if searchCountry is provided
  if (searchCountry) {
    filteredCountries = filteredCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    );
  }

  return (
    <div className="countries-container">
      {filteredCountries.length > 0 ? (
        filteredCountries.map((country, index) => {
          return (
            <CountryCard
              key={index}
              name={country.name.common}
              area={country.area}
              capital={country.capital?.[0]}
              population={country.population}
              flag={country.flags.svg}
              data={country}
            />
          );
        })
      ) : (
        <h1>No Data Found</h1>
      )}
    </div>
  );
};

export default AllContriesList;

// Second Approch

// import CountriesData from "../data";
// import CountryCard from "./CountryCard";

// const AllCountriesList = ({ searchCountry }) => {
//   const searchQuery = searchCountry.trim().toLowerCase();
//   const filteredCountries = CountriesData.filter((country) =>
//     country.name.common.toLowerCase().includes(searchQuery)
//   );

//   return (
//     <div className="countries-container">
//       {filteredCountries.length > 0 ? (
//         filteredCountries.map((country, i) => (
//           <CountryCard
//             key={i}
//             name={country.name.common}
//             area={country.area}
//             capital={country.capital ? country.capital[0] : "N/A"}
//             population={country.population}
//             flag={country.flags.svg}
//           />
//         ))
//       ) : (
//         <h1>No data found</h1>
//       )}
//     </div>
//   );
// };

// export default AllCountriesList;
