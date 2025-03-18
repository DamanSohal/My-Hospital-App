import React, { useState } from 'react';


const PopupForm = ({ isOpen, onClose }) => {
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');

    if (!isOpen) return null;

    const bookAmbulance = (e) => {
        e.preventDefault();
        alert(`Ambulance booked from ${location} to ${destination}`);
        setLocation('');
        setDestination('');
        onClose();
    };

    return (
        <div className='popup-overlay'>
            <div className='popup-form'>
                <span className='close-btn' onClick={onClose}>
                    &times;
                </span>
                <h2 className='text-center'>Book An Ambulance</h2>
                <h4 className='text-center'>Get a call in just 2 minutes</h4>
                <form onSubmit={bookAmbulance}>
                    <input
                        type='text'
                        placeholder='Full Name'
                        required
                        className='form-input'
                    />
                    <input
                        type='text'
                        placeholder='Mobile Number'
                        required
                        className='form-input'
                    />
                    <input
                        type='text'
                        placeholder='Current Location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className='form-input'
                    />
                    <input
                        type='text'
                        placeholder='Destination'
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                        className='form-input'
                    />

                    <button type='submit' className='btn btn-danger w-100'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;
