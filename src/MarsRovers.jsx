import React from 'react'
import { useEffect, useState } from 'react'
import './MarsRovers.css';
import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY


export default function MarsRovers() {

  const [images, setImages] = useState([])
  const [rover, setRover] = useState('curiosity')
  const [date, setDate] = useState('2015-06-03')
  const [camera, setCamera] = useState('FHAZ')
  const [roverInfo, setRoverInfo] = useState({})

  useEffect(() => {
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&page=${'1'}&api_key=${apiKey}`)
      .then(res => res.data.photos)
      .then(imageObj => {
        setImages(imageObj)
        setRoverInfo(imageObj[0].rover)
      })
  }, [rover, date, camera])

  const handleRover = e => {
    const roverVal = e.target.value
    setRover(roverVal)
    if (roverVal === 'curiosity') {
      setDate('2024-02-19')
      setCamera('FHAZ')
    } else if (roverVal === 'opportunity') {
      setDate('2018-06-11')
      setCamera('PANCAM')
    } else if (roverVal === 'spirit') {
      setDate('2010-03-21')
      setCamera('PANCAM')
    }
  }

  const handleDate = e => setDate(e.target.value)
  const handleCamera = e => setCamera(e.target.value)


  return (
    <div className="App">

      <div className="wrapper">

        <section className="rovers-section">
          <h2>Select Mars Rover</h2>
          <section className="rover-buttons">
            <button value="curiosity" onClick={handleRover}>Curiosity</button>
            <button value="opportunity" onClick={handleRover}>Opportunity</button>
            <button value="spirit" onClick={handleRover}>Spirit</button>
          </section>
        </section>
      
        <section className="cameras-section">
          <h2>Select Rover Camera</h2>
          <select name="camera" onChange={handleCamera}>
            <option value="FHAZ">Front Hazard Avoidance Camera</option>
            <option value="RHAZ">Rear Hazard Avoidance Camera</option>
            <option value="MAST">Mast Camera</option>
            <option value="CHEMCAM">Chemistry and Camera Complex</option>
            <option value="MAHLI">Mars Hand Lens Imager</option>
            <option value="MARDI">Mars Descent Imager</option>
            <option value="NAVCAM">	Navigation Camera</option>
            <option value="PANCAM">Panoramic Camera</option>
            <option value="MINITES">Miniature Thermal Emission Spectrometer</option>
          </select>
        </section>

        <section className="date-section">
          <h2>Select Image Date</h2>
          <input
            type="date"
            onChange={handleDate}
            // min={images[0].rover.landing_date}
            // max={images[0].rover.max_date}
          />
        </section>

        <section className="rover-info">
          <h2>Rover Details</h2>
          <p>Name: {roverInfo.name}</p>
          <p>Landing Date: {roverInfo.landing_date}</p>
          <p>Launch Date: {roverInfo.launch_date}</p>
          <p>Status: {roverInfo.status}</p>
          <p>Latest Images Sol: {roverInfo.max_sol}</p>
          <p>Latest Images Date: {roverInfo.max_date}</p>
          <p>Total Photos: {roverInfo.total_photos}</p>

          {/* <h2>Available Cameras</h2>
          {roverInfo ? roverInfo.cameras.map(camera => <p>{camera.full_name}</p>) : null} */}
        </section>

      </div>

      <section className="images-section">
        {images.map((data, index) => {
          return <img
          src={data.img_src}
          className="image-card"
          alt={"This is an image from the " + data.camera.full_name + " camera of the mars " + data.rover.name + " rover."}
          key={index}
          />
        })}
      </section>

      <footer>YOU HAVE NOW ENTERED THE MULTIVERSE</footer>

    </div>
  );
}
