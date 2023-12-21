import React, { useState, useEffect } from 'react'

export default function Joke() {

    const [jokes, setJokes]=useState([]);
    const FetchJokes = async() => {
            const res= await fetch("https://api.chucknorris.io/jokes/random");
            const data=await res.json();
            setJokes(data);
    }

    useEffect(() => {
        FetchJokes();
    }, []);

  return (
    <div>
        <br/>
        
        <h4>Joke of the Day</h4>
        <i class="fa-solid fa-face-laugh"></i>&nbsp; 
        <i class="fa-solid fa-face-laugh-wink"></i>&nbsp; 
        <i class="fa-solid fa-face-laugh-beam"></i>&nbsp; 
        <i class="fa-solid fa-face-laugh-squint"></i>&nbsp; 
        <i class="fa-solid fa-face-grin-tears"></i>&nbsp; 
        <i class="fa-solid fa-face-grin-squint-tears"></i>
        <br/><br/><br/>
        <h6>{jokes.value}</h6>
        <br/>
        <button className='btn btn-warning'onClick={FetchJokes} >Generate New Joke</button>

    </div>
  );
}