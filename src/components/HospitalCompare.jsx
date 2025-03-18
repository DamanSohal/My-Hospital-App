import React, { useState } from "react";

const HospitalCompare = () => {
  const [hospital1, setHospital1] = useState("");
  const [hospital2, setHospital2] = useState("");
  const [comparisonResult, setComparisonResult] = useState(null);

  const compareHospitals = () => {
    // logic for comparing hospitals
    setComparisonResult(`Comparison between ${hospital1} and ${hospital2}`);
  };

  return (
    <div>
      <h1>Compare Hospitals</h1>
      <input
        type="text"
        placeholder="Enter first hospital"
        value={hospital1}
        onChange={(e) => setHospital1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter second hospital"
        value={hospital2}
        onChange={(e) => setHospital2(e.target.value)}
      />
      <button onClick={compareHospitals}>Compare</button>
      {comparisonResult && <p>{comparisonResult}</p>}
    </div>
  );
};

export default HospitalCompare;
