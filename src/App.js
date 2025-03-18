import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Dropdown from './components/RecommendHospital.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./components/LoginForm.jsx";
import PostView from "./components/PostView.jsx";
import { Routes, Route, NavLink, Outlet } from "react-router-dom"; 
import VisitForm from "./components/VisitForm";
import Home from "./components/Home.jsx";
import Footer from "./components/footer.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faPhoneAlt, faUserMd, faUserCheck } from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container my-4">
        <div className="home-link row justify-content-center">
          <ul className="nav flex-column flex-sm-row justify-content-center gap-3">
            <li className="nav-item">
              <NavLink to="/recommend" className={({ isActive }) => isActive ? "custom-btn active" : "custom-btn"}>
                Recommend Me
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/compare-hospitals" className={({ isActive }) => isActive ? "custom-btn active" : "custom-btn"}>
                Compare Hospitals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/top-hospitals" className={({ isActive }) => isActive ? "custom-btn active" : "custom-btn"}>
                Top Hospitals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/reviews" className={({ isActive }) => isActive ? "custom-btn active" : "custom-btn"}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet />  {/* Yahan pe har route ka content dynamically load hoga */}
      </main>
      <Footer />
    </>
  );
};



const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/recommend" element={<Dropdown/>} />
          <Route path="/PostView" element={<PostView />} />
          <Route path="/VisitForm" element={<VisitForm />} />
          <Route path="login" element={<LoginForm setUser={setUser} />} /> {/* Wrapped in <Route> */}
        </Route>
      </Routes>
      
    </>
  );
};

export default App;
