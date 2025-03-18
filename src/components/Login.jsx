import React, { useState } from 'react';
import { auth, db } from '../firebase';
import './Login.css';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail 
} from 'firebase/auth';
import { 
    collection, 
    query, 
    where, 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    serverTimestamp 
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');

        if (isSignUp) {
            if (!name || !phone || !email || !password) {
                setError('All fields are required for sign up.');
                return;
            }

            try {
                const usersRef = collection(db, 'users');

                // Check if email already exists
                const emailQuery = query(usersRef, where('email', '==', email));
                const emailSnapshot = await getDocs(emailQuery);
                if (!emailSnapshot.empty) {
                    setError('Email already registered.');
                    return;
                }

                // Check if phone already exists
                const phoneQuery = query(usersRef, where('phone', '==', phone));
                const phoneSnapshot = await getDocs(phoneQuery);
                if (!phoneSnapshot.empty) {
                    setError('Phone number already registered.');
                    return;
                }

                // Create user account
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Add user details to Firestore
                const newUserRef = await addDoc(usersRef, {
                    uid: user.uid,
                    name,
                    phone,
                    email,
                    createdAt: serverTimestamp()
                });

                // Update the user document with the ID (optional)
                await updateDoc(doc(db, 'users', newUserRef.id), { userId: newUserRef.id });

                alert('Account created successfully! Please log in.');
                setIsSignUp(false);
            } catch (err) {
                setError(err.message);
            }
        } else {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Log login time (optional)
                await updateDoc(doc(db, 'users', user.uid), {
                    lastLogin: serverTimestamp()
                });

                alert('Login successful!');
                navigate('/home');
            } catch (err) {
                setError('Invalid email or password.');
            }
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            setError('Please enter your email for password reset.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent!');
        } catch (err) {
            setError('Failed to send password reset email.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
                {isSignUp ? 'Create Account' : 'Login'}
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleAuth}>
                {isSignUp && (
                    <>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full p-2 mb-2 border rounded" 
                        />
                        <input 
                            type="text" 
                            placeholder="Phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            className="w-full p-2 mb-2 border rounded" 
                        />
                    </>
                )}

                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full p-2 mb-2 border rounded" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-2 mb-2 border rounded" 
                />

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>
            </form>

            <div className="mt-4">
                <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500">
                    {isSignUp ? 'Already have an account? Log in' : 'New here? Create an account'}
                </button>
            </div>

            {!isSignUp && (
                <div className="mt-2">
                    <button onClick={handlePasswordReset} className="text-blue-500">
                        Forgot Password?
                    </button>
                </div>
            )}
        </div>
    );
};

export default AuthForm;  

