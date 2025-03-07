// src/api.js

export async function registerUser(name, email, password) {
    try {
      const response = await fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }
  
  export async function loginUser(email, password) {
    try {
      const response = await fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  
  export async function getUserProfile(userId) {
    try {
      const response = await fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/profile/${userId}`);
      if (!response.ok) {
        throw new Error('Fetching profile failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Profile fetch error:", error);
      throw error;
    }
  }
  