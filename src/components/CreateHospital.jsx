import React, { useState } from "react";

const CreateHospitalForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [services, setServices] = useState("");

  const createHospital = () => {
    // logic to create a new hospital
    alert("Hospital Created!");
  };

  return (
    <div>
      <h1>Create a New Hospital</h1>
      <input
        type="text"
        placeholder="Hospital Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Services"
        value={services}
        onChange={(e) => setServices(e.target.value)}
      />
      <button onClick={createHospital}>Create</button>
    </div>
  );
};

export default CreateHospitalForm;