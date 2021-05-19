import React, { useEffect, useState} from 'react'
import ImageMap from './ImageMap.js'
import ItemGrid from './ItemGrid.jsx'
import './App.css';




function App() {

  

  return (
    <div>
      <h1>Random Imgur Images (May be NSFW)</h1>
      <ItemGrid />
    </div>
    
  );
}

export default App;
