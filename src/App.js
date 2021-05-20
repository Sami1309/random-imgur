import React, { useEffect, useState} from 'react'
import ItemGrid from './ItemGrid.jsx'
import './App.css';


const style = {
  body: {
    backgroundColor: 'black',
  },

  h1: {
    color: 'white',
  },
  
  header: {
    align: 'center',
    textAlign: 'center',
    textColor: 'white',
  },
  images: {
    margin: 80,
    marginBottom: 0,
    align: 'center',
  }
  
}

function App() {

  

  return (
    <body style={style.body}>
      <div>
      <header style={style.header}>
      <h1 style={style.h1}>Random Imgur Images (May be NSFW)</h1>
      </header>
      <div style = {style.images}>
        <ItemGrid />
      </div>
      
    </div>
    </body>
    
    
  );
}

export default App;
