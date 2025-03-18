import React, { useEffect, useState } from "react";
import { fetchHospitals } from "../services/api"; // Correct import

const TopHospitals = () => {
  const [topHospitals, setTopHospitals] = useState([]);

  useEffect(() => {
    const loadTopHospitals = async () => {
      const data = await fetchHospitals(); // Fetch data
      setTopHospitals(data); // Correctly set state
    };
    loadTopHospitals();
  }, []);

  return (
    <div>
      <h1>Top Hospitals</h1>
      <ul>
        {topHospitals.map((hospital) => (
          <li key={hospital.id}>{hospital.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopHospitals;
