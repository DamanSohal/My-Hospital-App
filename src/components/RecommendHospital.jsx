
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import hos from '../hos.jpg';
import { Link, useNavigate } from "react-router-dom";
import PopupForm from './AmbulanceBooking';
import LoginForm from "./LoginForm";
import PostView from './PostView';
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebase";
import VisitForm from './VisitForm';
import './RecommendHospital.css';


const Dropdown = () => {
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedTreatment, setSelectedTreatment] = useState("All Treatments");
  const [selectedBudget, setSelectedBudget] = useState("All Budgets");
  const [selectedHospitalType, setSelectedType] = useState("All Types");
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);


  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const openLoginForm = () => setIsLoginOpen(true);
  const closeLoginForm = () => setIsLoginOpen(false);

  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const openVisit = () => setIsVisitOpen(true);
  const closeVisit = () => setIsVisitOpen(false);

  {/* VisitForm Component */ }
  { isVisitOpen && <VisitForm isOpen={isVisitOpen} onClose={closeVisit} /> }

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // User ka data update karna
    });
    return () => unsubscribe(); // Cleanup function
  }, []);

  const [hospitalData, setHospitalData] = useState([]);
    const [filteredHospitalData, setFilteredHospitalData] = useState([]); // State for filtered data
    const [recommendations, setRecommendations] = useState("");
    const [showCards, setShowCards] = useState(false); // State to control card visibility


  const handleSelectChange = (event, setter) => {
    setter(event.target.value);
  };

  const handlePostView = () => {
    if (!user) {
      openLoginForm(); // Agar user login nahi hai toh login form open karein
    } else {
      navigate("/PostView", { replace: true });
    }
  };


  useEffect(() => {
    const fetchHospitalData = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        const fetchedData = [

          {
            name: 'S A S Grewal Memorial Multispeciality Hospital',
            city: 'Gurudev Nagar ',
            type: 'Private',
            budget: 'Within 8 Lakhs',
            treatment: 'Cardiology ',
            image: hos,
          },

          {
            name: 'Aastha Kidney And Super Speciality Hospital',
            city: 'Civil Lines',
            type: 'Government',
            budget: 'Within 2 Lakhs',
            treatment: 'Anesthesiology',
            image: hos,

          },
          {
            name: 'Christian Medical College And Hospital',
            city: 'Brown Road, DMC Road',
            type: 'Private',
            budget: 'Within 10 Lakhs',
            treatment: 'Cancer',
            image: hos,

          },
          {
            name: 'SPS Apollo Hospital',
            city: 'Sherpur Chowk ',
            type: 'Private',
            budget: 'Within 6 Lakhs',
            treatment: 'Cancer',
            image: hos,

          },
          {
            name: 'Raman Hospital',
            city: 'Hambran Road',
            type: 'Private',
            budget: 'Within 5 Lakhs',
            treatment: 'Cancer',
            image: hos,

          },

          {
            name: 'AIMC Bassi Hospital',
            city: 'Civil Lines',
            type: 'Private',
            budget: 'Within 5 Lakhs',
            treatment: 'Anesthesiology',
            image: hos,

          },

          {
            name: 'Rattan Multispecialty Hospital And Diagnostic',
            city: 'Samrala Road',
            type: 'Private',
            budget: 'Within 2 Lakhs',
            treatment: 'Cardiology',
            image: hos,

          },

          {
            name: 'SPS Hospitals (Satguru Partap Singh Hospitals)',
            city: 'Sherpur Chowk',
            type: 'Private',
            budget: 'Within 15 Lakhs',
            treatment: 'Dental',
            image: hos,

          },

          {
            name: 'S A S Grewal Memorial Multispeciality Hospital',
            city: 'Gurudev Nagar',
            type: 'Private',
            budget: 'Within 15 Lakhs',
            treatment: 'Diabetes',
            image: hos,

          },

          {
            name: 'Sidhu Hospital Pvt Ltd',
            city: 'Doraha',
            type: 'Private',
            budget: 'Within 2 Lakhs',
            treatment: 'Child Care',
            image: hos,

          },
          {
            name: 'Suman Hospital',
            city: 'Model Town',
            type: 'Private',
            budget: 'Within 4 Lakhs',
            treatment: 'Child Care',
            image: hos,

          },
          {
            name: 'Indo German Hospital',
            city: 'Khanna',
            type: 'Private',
            budget: 'Within 14 Lakhs',
            treatment: 'Cancer',
            image: hos,

          },
          {
            name: 'Satyam Hospital',
            city: 'Samrala Road',
            type: 'Private',
            budget: 'Within 15 Lakhs',
            treatment: 'Cosmetic & Plastic Surgery',
            image: hos,

          },

          {
            name: 'Sirish Hospital',
            city: 'Civil Lines',
            type: 'Private',
            budget: 'Within 11 Lakhs',
            treatment: 'Dermatology',
            image: hos,

          },

          {
            name: 'Bawa Hospital Pvt Ltd',
            city: 'Civil Lines',
            type: 'Private',
            budget: 'Within 17 Lakhs',
            treatment: 'Emergency',
            image: hos,

          },
          {
            name: 'Vasan Eye Care Hospital',
            city: 'Ferozpur Road',
            type: 'Private',
            budget: 'Within 16 Lakhs',
            treatment: 'Eyes',
            image: hos,

          },
          {
            name: 'Batra Eye Hospital',
            city: 'Model Town',
            type: 'Private',
            budget: 'Within 18 Lakhs',
            treatment: 'Eyes',
            image: hos,
            description: 'Batra Eye Hospital is known for its cancer treatment and specialized oncologists.'
          },
          {
            name: 'Preet Hospital',
            city: 'Model Town',
            type: 'Private',
            budget: 'Within 20 Lakhs',
            treatment: 'Nephrology',
            image: hos,
          },

        ];

        setHospitalData(fetchedData); // Store all hospital data
        filterAndSetData(fetchedData); // Initial filtering based on default selections
      }, 2000);
    };

    fetchHospitalData();
  }, []); // Fetch data only once on mount

  const filterAndSetData = (data) => {
    const filteredData = data.filter(hospital =>
      (selectedTreatment === 'All Treatments' || hospital.treatment === selectedTreatment) &&
      (selectedCity === 'All Cities' || hospital.city === selectedCity) &&
      (selectedBudget === 'All Budgets' || hospital.budget === selectedBudget) &&
      (selectedHospitalType === 'All Types' || hospital.type === selectedHospitalType)
    );

    setFilteredHospitalData(filteredData);
    setRecommendations(filteredData.length > 0 ? 'Here are some recommended hospitals based on your criteria.' : 'No recommendations found');
    setShowCards(filteredData.length > 0); // Show cards only if there's data
  }


  useEffect(() => {
    filterAndSetData(hospitalData); // Refilter whenever a dropdown changes
  }, [selectedTreatment, selectedCity, selectedBudget, selectedHospitalType]);

  const fetchData = async () => {
    setLoading(true);
    try {
        // Your API call or data fetching logic here
    } finally {
        setLoading(false);
    }
};

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {/* Dropdown Filters */}
          <div className="col-12 mb-3">
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="treatment">Treatment</label>
                <select id="treatment" className="form-control" value={selectedTreatment} onChange={(e) => handleSelectChange(e, setSelectedTreatment)}>
                  <option value="All Treatments">All Treatments</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Anesthesiology">Anesthesiology</option>
                  <option value="Cancer">Cancer</option>
                  <option value="Dental">Dental </option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Child Care">Child Care</option>
                  <option value="Cosmetic & Plastic Surgery">Cosmetic & Plastic Surgery</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Eyes">Eyes</option>
                  <option value="Nephrology">Nephrology</option>
                </select>
              </div>


              <div className="col-md-3">
                <label htmlFor="city">Ludhiana</label>
                <select id="city" className="form-control" value={selectedCity} onChange={(e) => handleSelectChange(e, setSelectedCity)}>
                  <option value="All Cities">Areas</option>
                  <option value="Gurudev Nagar">Gurudev Nagar</option>
                  <option value="Civil Lines"> Civil Lines </option>
                  <option value="Brown Road, DMC Road"> Brown Road, DMC Road </option>
                  <option value="Sherpur Chowk"> Sherpur Chowk </option>
                  <option value="Hambran Road"> Hambran Road </option>
                  <option value="Samrala Road"> Samrala Road </option>
                  <option value="Doraha"> Doraha </option>
                  <option value="Model Town"> Model Town </option>
                  <option value="Khanna"> Khanna </option>
                  <option value="Ferozpur Road"> Ferozpur Road </option>
                </select>
              </div>



              <div className="col-md-3">
                <label htmlFor="budget">Budget</label>
                <select id="budget" className="form-control" value={selectedBudget} onChange={(e) => handleSelectChange(e, setSelectedBudget)}>
                  <option value="All Budgets">All Budgets</option>
                  <option value="Within 2 Lakhs">Within 2 Lakhs</option>
                  <option value="Within 4 Lakhs">Within 4 Lakhs</option>
                  <option value="Within 5 Lakhs">Within 5 Lakhs</option>
                  <option value="Within 6 Lakhs">Within 6 Lakhs</option>
                  <option value="Within 8 Lakhs">Within 8 Lakhs</option>
                  <option value="Within 10 Lakhs">Within 10 Lakhs</option>
                  <option value="Within 11 Lakhs">Within 11 Lakhs</option>
                  <option value="Within 15 Lakhs">Within 15 Lakhs</option>
                  <option value="Within 16 Lakhs">Within 16 Lakhs</option>
                  <option value="Within 17 Lakhs">Within 17 Lakhs</option>
                  <option value="Within 18 Lakhs">Within 18 Lakhs</option>
                  <option value="Within 20 Lakhs">Within 20 Lakhs</option>
                </select>
              </div>


              <div className="col-md-3">
                <label htmlFor="type">Hospital Type</label>
                <select id="type" className="form-control" value={selectedHospitalType} onChange={(e) => handleSelectChange(e, setSelectedType)}>
                  <option value="All Types">All Types</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loader */}
          {loading && (
            <div className="col-12 text-center">
              <img src="https://dilseheal.com/images/Spinner.gif" alt="Loading..." />
            </div>
          )}

          {/* Recommendations Message */}
          {recommendations && !loading && (
            <div className="col-12 text-center mt-5">
              <h5>{recommendations}</h5>
            </div>
          )}

          {/* Hospital Cards - Conditionally Rendered */}
          {showCards && ( // Only render the cards if showCards is true

            <div className="row mt-5 ">
              {filteredHospitalData.map((hospital, index) => (
                <div key={index} className="col-md-4 mb-4"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}>

                  <div className="card shadow  m-4 position-relative overflow-hidden">
                    <img src={hospital.image} className="card-img-top" alt={hospital.name} />
                    <div className="card-body">
                      <h5 className="card-title">{hospital.name}</h5>
                      <p className="card-text">
                        <strong>Area:</strong> {hospital.city} <br />
                        <strong>Type:</strong> {hospital.type} <br />
                        <strong>Budget:</strong> {hospital.budget} <br />
                        <strong>Treatment:</strong> {hospital.treatment} <br />
                        {/* {hospital.description} */}
                      </p>
                    </div>

                    {

                /* Hover Part */}

                    <div
                      className="position-absolute bottom-0 start-0 w-100 h-50 bg-white bg-opacity-100 text-dark text-center p-2"
                      style={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        transform: hoveredIndex === index ? "translateY(0)" : "translateY(70%)",
                        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out"
                      }}
                    >
                      <h4> {hospital.name} </h4>
                      <div className=' hospital-buttons mt-3'>
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: '#c32148', color: 'white' }}
                          onClick={() => setIsPopupOpen(true)}
                        >
                          Ambulance
                        </button>

                        <button className="btn btn-sm" style={{ backgroundColor: '#c32148', color: 'white' }}>
                          Location
                        </button>
                      </div>

                      <div className='mt-3 hospital-buttons'>
                        <button className="btn btn-sm" style={{ backgroundColor: '#c32148', color: 'white' }} onClick={openVisit}>
                          Plan a Visit
                        </button>

                        <button className="btn btn-sm" style={{ backgroundColor: '#c32148', color: 'white' }} onClick={handlePostView}>
                          Post a Review
                        </button>
                      </div>
                    </div>

                    <PopupForm isOpen={isPopupOpen} onClose={closePopup} />
                    <LoginForm isOpen={isLoginOpen} onClose={closeLoginForm} />
                  </div>
                </div>
              ))}

              <VisitForm isOpen={isVisitOpen} onClose={closeVisit} />
            </div>
          )};
       </div>
      </div>
    </>
  );
};

export default Dropdown;
