import { useEffect, useState } from 'react'
import './Home.css';
import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY


export default function Home() {

  const [apod, setApod] = useState({})

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then(res => res.data)
      .then(setApod)
  }, [])



  return (
    <div className="App">

      <div className="home">
        <h2>{apod.title}</h2>
        <h4>{apod.date}</h4>
        <img src={apod.url}/>
        <p>{apod.explanation}</p>
      </div>

    </div>
  );
}
