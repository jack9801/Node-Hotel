import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the CSS file for styling

function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('http://localhost:3000/person/profile', {
                    headers: { Authorization: `Bearer ${token}` } // Send token in Authorization header
                });
                setProfile(response.data); // Set the profile data
            } catch (err) {
                console.error(err);
                alert('Failed to fetch profile!');
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            <div className="profile-card">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Work:</strong> {profile.work}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>Salary:</strong> ₹{profile.salary}</p>
            </div>
        </div>
    );
}

export default Profile;