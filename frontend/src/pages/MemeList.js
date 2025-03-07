// src/pages/MemeList.js

import React, { useEffect, useState } from 'react';
import { fetchMemes } from '../apiContent';

function MemeList() {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMemes = async () => {
      try {
        const data = await fetchMemes();
        setMemes(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadMemes();
  }, []);

  return (
    <div>
      <h1>Meme List</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {memes.length > 0 ? (
        <ul>
          {memes.map((meme) => (
            <li key={meme.id}>
              <img src={meme.imageUrl} alt={meme.title} style={{ width: '200px' }} />
              <p>{meme.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No memes available.</p>
      )}
    </div>
  );
}

export default MemeList;
