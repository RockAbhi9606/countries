const Dropdown = ({ setSearchRegion }) => {
  const handleSearchRegion = (event) => {
    setSearchRegion(event.target.value);
  };
  return (
    <>
      <select className="filter-by-region" onChange={handleSearchRegion}>
        <option selected disabled hidden>
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
};

export default Dropdown;
