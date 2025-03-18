import React, { useState } from 'react';
import './Create_new_account.css';
import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';

const Create = ({ isOpen, onClose }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!isOpen) return null;

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const usersRef = collection(db, "users");

            // Check if email already exists
            const emailQuery = query(usersRef, where("email", "==", email));
            const emailSnapshot = await getDocs(emailQuery);
            if (!emailSnapshot.empty) {
                setError('Email is already registered!');
                return;
            }

            // Check if phone number already exists
            const phoneQuery = query(usersRef, where("phone", "==", phone));
            const phoneSnapshot = await getDocs(phoneQuery);
            if (!phoneSnapshot.empty) {
                setError('Phone number is already registered!');
                return;
            }

            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store additional user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName,
                email,
                phone,
                createdAt: new Date()
            });

            setSuccess("Account created successfully! You can now log in.");
            setTimeout(() => onClose(), 2000); // Auto-close form after 2 sec

        } catch (error) {
            setError('Error registering user: ' + error.message);
        }
    };

    return (
        <div className='Login-overlay'>
            <div className='Login-form'>
                <span className='close-btn' onClick={onClose}>&times;</span>
                <h2> Create A New Account </h2>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Full Name" required className="form-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <input type="email" placeholder="Email" required className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Phone Number" required className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input type="password" placeholder="Password" required className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" required className="form-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="submit" className="btn btn-primary w-100 mt-3"> Register </button>
                </form>
            </div>
        </div>
    );
};

export default Create;