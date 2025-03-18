import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from './logo.jpg';
import PopupForm from './AmbulanceBooking';  // Ensure the path is correct
import LoginForm from './LoginForm';  // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';  // Check path to firebase.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';  // Correct import of ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

const Navbar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const openLoginForm = () => setIsLoginOpen(true);
    const closeLoginForm = () => setIsLoginOpen(false);

    const handlePostView = () => {
        if (!user) {
            openLoginForm();
        } else {
            navigate('/PostView', { replace: true });
        }
    };

    const handleLogout = async () => {
        try {
            if (user) {
                const userRef = doc(db, 'user_logins', user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    await updateDoc(userRef, { logoutTime: serverTimestamp() });
                } else {
                    await setDoc(userRef, { logoutTime: serverTimestamp() });
                }
            }

            await signOut(auth);
            setUser(null);
            toast.success('Logout Successfully');
        } catch (error) {
            console.error('Logout Failed:', error.message);
            toast.error('Logout Failed: ' + error.message);
        }
    };

    return (
        <>
            <div className='sticky'>
                <div className='navbar'>
                    <div className='navbar-logo ms-3'>
                        <img src={logo} alt='Logo' style={{ width: '50px', height: '50px' }} />
                        <h2>Hospital Recommendation System</h2>
                    </div>

                    <div className='nav-link'>
                        <nav>
                            <ul>
                                <li>
                                    <button style={{ borderRadius: '7px' }} onClick={openPopup}>
                                        <b>BOOK AN AMBULANCE</b>
                                    </button>
                                </li>
                                <li>
                                    <button style={{ borderRadius: '7px' }} onClick={handlePostView}>
                                        <b>POST A VIEW</b>
                                    </button>
                                </li>

                                {user ? (
                                    <li className='dropdown'>
                                        <button className='primary' style={{ padding: '12px 15px' }}>
                                            {user.email} ⬇
                                        </button>
                                        <div className='dropdown-content'>
                                            <button className='btn btn-primary' onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>
                                    </li>
                                ) : (
                                    <li>
                                        <button style={{ borderRadius: '7px', marginRight: '10px' }} onClick={openLoginForm}>
                                            <b>LOGIN</b>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Popup and Login Form */}
            {isPopupOpen && <PopupForm isOpen={isPopupOpen} onClose={closePopup} />}
            {isLoginOpen && <LoginForm isOpen={isLoginOpen} onClose={closeLoginForm} setUser={setUser} />}

            {/* Toast Notifications */}
            <ToastContainer />
        </>
    );
};

export default Navbar;
