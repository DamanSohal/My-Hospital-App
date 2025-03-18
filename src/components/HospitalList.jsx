import React, { useEffect, useState } from "react";
import { fetchHospitals } from "../services/api"; // Correct import

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const loadHospitals = async () => {
      const data = await fetchHospitals(); // Fetch data
      setHospitals(data); // Correctly set state
    };
    loadHospitals();
  }, []);

  return (
    <div>
      <h1>Hospital List</h1>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>{hospital.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalList;
