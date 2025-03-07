// src/pages/Profile.js

import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../api';

function Profile() {
  const [profile, setProfile] = useState(null);
  const userId = 1; // Replace with the logged-in user's ID in a real app

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <p>User ID: {profile.user?.id || profile.userId || profile.id}</p>
          <p>Name: {profile.user?.name || profile.name || "N/A"}</p>
          <p>Email: {profile.user?.email || profile.email || "N/A"}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
