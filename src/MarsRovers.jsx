import { useEffect, useState } from 'react'
import './MarsRovers.css';
import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY


export default function MarsRovers() {

  const [images, setImages] = useState([])
  const [camera, setCamera] = useState('FHAZ')
  const [date, setDate] = useState('2015-6-3')
  const [rover, setRover] = useState('curiosity')


  useEffect(() => {
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&page=${'1'}&api_key=${apiKey}`)
      .then(res => res.data.photos)
      .then(setImages)
  }, [camera, date, rover])

  const handleCamera = e => setCamera(e.target.value)
  const handleDate = e => setDate(e.target.value)
  const handleRover = e => setRover(e.target.value)

  return (
    <div className="App">

      <p>Select Mars Rover:</p>
      <select name="rover" onChange={handleRover}>
        <option value="Curiosity">Curiosity</option>
        <option value="Opportunity">Opportunity</option>
        <option value="Spirit">Spirit</option>
      </select>

      <p>Select Rover Camera:</p>
      <select name="camera" onChange={handleCamera}>
        <option value="FHAZ">Front Hazard Avoidance Camera</option>
        <option value="RHAZ">	Rear Hazard Avoidance Camera</option>
        <option value="MAST">Mast Camera</option>
        <option value="CHEMCAM">Chemistry and Camera Complex</option>
        <option value="MAHLI">Mars Hand Lens Imager</option>
        <option value="MARDI">Mars Descent Imager</option>
        <option value="NAVCAM">	Navigation Camera</option>
        <option value="PANCAM">Panoramic Camera</option>
        <option value="MINITES">Miniature Thermal Emission Spectrometer</option>
      </select>

      <p>Select Image Date:</p>
      <input
        type="date"
        onChange={handleDate}
        // min={images[0].rover.landing_date}
        // max={images[0].rover.max_date}
      />

      {images.map((data, index) => {
        return <img
          src={data.img_src}
          alt={"This is an image from the " + data.camera.full_name + " camera of the mars " + data.rover.name + " rover."}
          key={index}
        />
      })}

    </div>
  );
}
