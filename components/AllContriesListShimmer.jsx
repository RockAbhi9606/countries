import React from "react";
import "./AllContriesShimmer.css";
export default function AllContriesListShimmer() {
  return (
    <div className="countries-container">
      {Array.from({ length: 10 }).map((el, i) => {
        return (<div key={i} className="country-card shimmer-effect">
          <div className="flag-container"></div>
          <div className="container">
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>)
      })}
    </div>
  );
}
