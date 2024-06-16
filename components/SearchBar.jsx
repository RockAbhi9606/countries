const search = ({setSearchCountry}) => {
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchCountry(value);
  };
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default search;
