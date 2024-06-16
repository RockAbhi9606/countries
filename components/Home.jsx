import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import AllContriesList from "./AllContriesList";
import { useContext, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import { ThemeContext } from "../contexts/ThemeContext";
import { useTheme } from "../hooks/useTheme";

const Home = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [searchByRegion, setSearchRegion] = useState("");
  // const [isDark] = useOutletContext();
  const [isDark] = useTheme();
  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setSearchCountry={setSearchCountry} />
        <Dropdown setSearchRegion={setSearchRegion} />
      </div>
      <AllContriesList
        searchCountry={searchCountry}
        searchByRegion={searchByRegion}
      />
    </main>
  );
};

export default Home;
