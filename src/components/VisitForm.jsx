import React from 'react';
import './VisitForm.css';

const VisitForm = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted successfully!");
        onClose(); // Close the form after submission
    };

    return (
        <div className="popup-overlay">
            <div className="popup-form">
                <button className="close-btn" onClick={onClose} aria-label="Close">
                    &times;
                </button>
                <h2 className="text-center">Plan a Visit</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Full Name"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input
                            type="tel"
                            id="mobileNumber"
                            placeholder="Mobile Number"
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit mobile number"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">D.O.B.:</label>
                        <input
                            type="date"
                            id="dob"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="reason">Reason or Disease:</label>
                        <input
                            type="text"
                            id="reason"
                            placeholder="Reason"
                            required
                            className="form-input"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VisitForm;
