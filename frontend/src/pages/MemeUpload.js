// src/pages/MemeUpload.js

import React, { useState } from 'react';
import { uploadMeme } from '../apiContent';

function MemeUpload() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('meme', file);
    formData.append('title', title); // optional if your backend supports it

    try {
      const data = await uploadMeme(formData);
      setUploadResult(data);
      console.log('Upload result:', data);
    } catch (error) {
      setUploadResult({ error: error.message });
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <h1>Upload Meme</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Select Meme File:</label><br />
          <input 
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadResult && (
        <div>
          <h3>Upload Response:</h3>
          <pre>{JSON.stringify(uploadResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MemeUpload;
