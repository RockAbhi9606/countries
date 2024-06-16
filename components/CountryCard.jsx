import { Link } from "react-router-dom";

const CountryCard = ({ name, area, capital, population, flag ,data}) => {
  return (
    <Link className="country-card" to={`${name}`} state={data}>
      <img src={flag} alt={name} />
      <div className="container">
        <h2>{name}</h2>
        <p>
          <b>Capital :</b> {capital}
        </p>
        <p>
          <b>Population: </b>
          {population.toLocaleString("en-IN")}
        </p>
        <p>
          <b>Area: </b> {area.toLocaleString("en-IN")} km²
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;
