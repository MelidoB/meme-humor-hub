// src/apiContent.js

// Base URL for content-service from environment variable
const CONTENT_SERVICE_URL = process.env.REACT_APP_CONTENT_SERVICE_URL;

export async function fetchMemes() {
  try {
    const response = await fetch(`${CONTENT_SERVICE_URL}/memes`);
    if (!response.ok) {
      throw new Error('Failed to fetch memes');
    }
    const data = await response.json();
    return data.memes || []; // Assuming the API returns { memes: [...] }
  } catch (error) {
    console.error("Error fetching memes:", error);
    throw error;
  }
}

export async function uploadMeme(formData) {
  try {
    const response = await fetch(`${CONTENT_SERVICE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Meme upload failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading meme:", error);
    throw error;
  }
}
