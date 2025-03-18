import React, { useState } from 'react';
import './PostView.css';


const PostView = () => {

  const [city, setCity] = useState("");
  const [hospital, setHospital] = useState("");
  const [patientStatus, setPatientStatus] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingsList, setRatingsList] = useState([]);


  const handleRating = (value) => {
    setRating(value);
  };


  const submitRating = () => {
    if (rating > 0) {
      setRatingsList([...ratingsList, rating]);
      setRating(0);
    }
  };

  const calculateAverageRating = () => {
    if (ratingsList.length == 0) return 0;
    const sum = ratingsList.reduce((acc, curr) => acc + curr, 0);
    return (sum / ratingsList.length).toFixed(1);
  };


  return (
    <div className="post-view-container">
      <div className='row mt-5 '>
        <div className='col-lg-4 col-sm-12 col-md-6'>
          <h2> Post a Review </h2>
        </div>
        <div className='col-lg-8 col-sm-12 col-md-6 border-3 border-start border-danger'>
          <h5>
            Note: You must provide a legit Supportive Document and an ID of patient against your review
          </h5>
        </div>
      </div>


      <div className='row d-flex mt-5'>

        <div className='col-lg-4 col-sm-12'>
          <div>
            <label className='label' style={{ width: '100px' }}> City: </label>
          </div>

          <div>
            <select className='select p-2' value={city} onchange={(e) => setCity(e.target.value)} >
              <option value=""> Select Area </option>
              <option value="Gurudev Nagar"> Gurudev Nagar</option>
              <option value="Samrala Road"> Samrala Road</option>
              <option value="Civil Lines"> Civil Lines </option>
              <option value="Tagore Nagar"> Tagore Nagar </option>
              <option value="Ferozpur Road"> Ferozpur Road </option>
              <option value="Model Town"> Model Town </option>
              <option value="Brown Road CMC Campus"> Brown Road CMC Campus </option>
              <option value="Krishna nagar"> Krishna nagar </option>
              <option value="Sherpur Chowk"> Sherpur Chowk </option>
              <option value="Doraha"> Doraha </option>
              <option value="KitchluNagar"> KitchluNagar </option>
              <option value="G.T. Road"> G.T. Road </option>
              <option value="BRS Nagar"> BRS Nagar </option>
              <option value="Kohara"> Kohara </option>
              <option value="Jamalpur Colony"> Jamalpur Colony </option>
              <option value="Cheema Chowk"> Cheema Chowk </option>
              <option value="Urban Estate Dugri"> Urban Estate Dugri </option>
              <option value="Pakhowal Road"> Pakhowal Road </option>
              <option value="Hambran Road"> Hambran Road </option>
              <option value="Khanna"> Khanna </option>
              <option value="Haibowal Kalan"> Haibowal Kalan</option>
              <option value="Shaheed Udham Singh Nagar"> Shaheed Udham Singh Nagar </option>
              <option value="Baba Than Singh Chowk"> Baba Than Singh Chowk</option>
              <option value="Sunder Nagar"> Sunder Nagar </option>
              <option value="Srabha Nagar"> Srabha Nagar</option>
              <option value="Madhopuri"> Madhopuri </option>
              <option value="Chandigarh Road"> Chandigarh Road </option>
              <option value="Focal Point"> Focal Point </option>
              <option value="Gill Road"> Gill Road </option>
              <option value="Basti jodhewal"> Basti jodhewal </option>
              <option value="Industrial Area"> Industrial Area </option>
              <option value="Fountain Plaza"> Fountain Plaza </option>
              <option value="Shingar Road"> Shingar Road </option>
              <option value="Kochar Market"> Kochar Market </option>
              <option value="Baddowal"> Baddowal </option>
              <option value="Jalandhar Bypass Road"> Jalandhar Bypass Road </option>
              <option value="Tajpur Road"> Tajpur Road </option>
              <option value="DMC Road"> DMC Road </option>

            </select>
          </div>

        </div>

        <div className='col-lg-4 col-sm-12'>

          <div>
            <label className='label'> Hospital</label>
          </div>

          <div>
            <select className='select p-2' value={hospital} onChange={(e) => setHospital(e.target.value)}>
              <option value="">Select a Hospital</option>
              <option value="AIMC Bassi Hospita">AIMC Bassi Hospita</option>
              <option value="Aastha Kidney And Super Speciality Hospital">Aastha Kidney And Super Speciality Hospital</option>
              <option value="Christian Medical College And Hospital">Christian Medical College And Hospital</option>
              <option value="SPS Apollo Hospital">SPS Apollo Hospital</option>
              <option value="Raman Hospital">Raman Hospital</option>
              <option value="S A S Grewal Memorial Multispeciality Hospital">S A S Grewal Memorial Multispeciality Hospital</option>
              <option value="Rattan Multispecialty Hospital And Diagnostic Centre">Rattan Multispecialty Hospital And Diagnostic Centre</option>
              <option value="Sidhu Hospital Pvt Ltd">Sidhu Hospital Pvt Ltd</option>
              <option value="Suman Hospital">Suman Hospital</option>
              <option value="Indo German Hospital">Indo German Hospital</option>
              <option value="Satyam Hospital">Satyam Hospital</option>
              <option value="SPS Hospitals (Satguru Partap Singh Hospitals)">SPS Hospitals (Satguru Partap Singh Hospitals)</option>
              <option value="Sirish Hospital">Sirish Hospital</option>
              <option value="S A S Grewal Memorial Multispeciality Hospital">S A S Grewal Memorial Multispeciality Hospital</option>
              <option value="Bawa Hospital Pvt Ltd">Bawa Hospital Pvt Ltd</option>
              <option value="Vasan Eye Care Hospital">Vasan Eye Care Hospital</option>
              <option value="Batra Eye Hospital">Batra Eye Hospital</option>
              <option value="Preet Hospital">Preet Hospital</option>
            </select>
          </div>

        </div>



        <div className='col-lg-4 col-sm-12'>

          <div>
            <label className='label'>Are you a patient?</label>
          </div>

          <div>
            <select className="select p-2" value={patientStatus} onChange={(e) => setPatientStatus(e.target.value)}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>

      <div className='row mt-5'>
        <div className='col-lg-6 col-sm-12'>

          <div>
            <label className='label' >Date of Admission: <span className="text-danger-500">*</span></label>
          </div>

          <div>
            <input type="date" className=" select w-full p-2 border rounded" value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)} />
          </div>

        </div>


        <div className='col-lg-6 col-sm-12'>

          <div>
            <label className='label' >Date of Discharge: <span className="text-danger-500">*</span></label>
          </div>

          <div>
            <input type="date" className=" select w-full p-2 border rounded" value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)} />
          </div>

        </div>
      </div>


      {/* Star Rating System */}

      <div className='container mt-5'>
        <h2 style={{ fontWeight : '600', fontSize: 'larger' }} >Ratings:</h2>
        <div className='row w-100  mt-5'>

          <div className='col-lg-4'>
            Cleanliness
          </div>

          <div className='col-lg-4'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleRating(star)} style={{
                fontSize: '24px', cursor: 'pointer',
                color: star <= rating ? 'gold' : 'gray',
              }} >
                ★
              </span>
            ))}
          </div>

          <div className='col-lg-4'>
           <button className='btn btn-primary' onClick={submitRating}>Submit Rating</button>
          </div>

        </div>


        <div className='row w-100 mt-5'>

          <div className='col-lg-4'>
            Patient Care Overview
          </div>

          <div className='col-lg-4'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleRating(star)} style={{
                fontSize: '24px', cursor: 'pointer',
                color: star <= rating ? 'gold' : 'gray',
              }} >
                ★
              </span>
            ))}
          </div>

          <div className='col-lg-4'>
           <button className='btn btn-primary' onClick={submitRating}>Submit Rating</button>
          </div>

        </div>



        <div className='row w-100 mt-5'>

          <div className='col-lg-4'>
            Availability
          </div>

          <div className='col-lg-4'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleRating(star)} style={{
                fontSize: '24px', cursor: 'pointer',
                color: star <= rating ? 'gold' : 'gray',
              }} >
                ★
              </span>
            ))}
          </div>

          <div className='col-lg-4'>
           <button className='btn btn-primary' onClick={submitRating}>Submit Rating</button>
          </div>

        </div>


        <div className='row w-100 mt-5'>

          <div className='col-lg-4'>
            Facilities
          </div>

          <div className='col-lg-4'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleRating(star)} style={{
                fontSize: '24px', cursor: 'pointer',
                color: star <= rating ? 'gold' : 'gray',
              }} >
                ★
              </span>
            ))}
          </div>

          <div className='col-lg-4'>
           <button className='btn btn-primary' onClick={submitRating}>Submit Rating</button>
          </div>

        </div>

        <div className='row w-100 mt-5'>

          <div className='col-lg-4'>
            Time Management
          </div>

          <div className='col-lg-4'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleRating(star)} style={{
                fontSize: '24px', cursor: 'pointer',
                color: star <= rating ? 'gold' : 'gray',
              }} >
                ★
              </span>
            ))}
          </div>

          <div className='col-lg-4'>
           <button className='btn btn-primary' onClick={submitRating}>Submit Rating</button>
          </div>

        </div>

      </div>


      {/* Display Average Rating  */}
      <div className='row mt-3'>
        <div className='col-lg-12'>
         <h2 style={{ fontWeight: '600', fontSize: 'larger' }} > Overall Rating:  {calculateAverageRating()} ★ </h2>       
        </div>
      </div> 

      <button className='btn border'>
        Post
      </button>

    </div> //post-view-container

  );
};


export default PostView;

