import React, { useEffect, useState} from 'react'
import './App.css';

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}


function ImageMap() {

  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    var foundValid = false
    
    var randomKey = randomString(7, chars)
    console.log(randomKey);

    for (let i = 0; i < 1; i++){
      let randomKey = randomString(5, chars)
      let myURL = `https://i.imgur.com/${randomKey}l.png`
      fetch(myURL, {
        'Content-Type': 'application/json',
      })
        .then((result) => {
          console.log(result)
        }, (error) => {
          console.log(error)
        })
    }
    
    let alphanum = 'yzLfB0s'
    let myURL = `https://i.imgur.com/${alphanum}.png`

    fetch(myURL, {
      'Content-Type': 'application/json',
      'mode': 'no-cors',
    })
    .then((result) => {
      console.log(result)
      let isRemoved = result.url.substring(20,27) === 'removed'
      if (!isRemoved) {
        foundValid = true
        setImageURL(myURL + '.png');
      }
      console.log(isRemoved)
    }, (error) => {
      console.log(error)
      console.log("Invalid imgur url")
    })
    
    
    
    

    
  },[imageURL])
  const text = "It seems that a removed url is changed to 'removed.png'"

  return (
    <div>
      <h1>{text}</h1>
      <img src={imageURL} alt='image'></img>
    </div>
    
  );
}

export default ImageMap;
