// src/services/api.js
export const fetchHospitals = async () => {
  try {
    const response = await fetch("https://api.example.com/hospitals"); // Replace with actual API
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
};
