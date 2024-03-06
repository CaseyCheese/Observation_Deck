import './App.css';
// import Home from './Home';
// import MarsRovers from './MarsRovers';
import { useEffect, useState } from 'react'
import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY

export default function App() {

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
  const handleDate = e => {
    setDate(e.target.value)
    console.log(date);
  }
  const handleRover = e => setRover(e.target.value)

  console.log(images)
  return (
    <div className="App">

      <p>Select Image Date:</p>
      <input
        type="date"
        onChange={handleDate}
        // min={images[0].rover.landing_date}
        // max={images[0].rover.max_date}
      />

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

      <p>Select Mars Rover:</p>
      <select name="rover" onChange={handleRover}>
        <option value="Curiosity">Curiosity</option>
        <option value="Opportunity">Opportunity</option>
        <option value="Spirit">Spirit</option>
      </select>

      {images.map(data => {
        <img
          src={data.img_src}
          alt={"This is an image from the " + data.camera.full_name + " camera of the mars " + data.rover.name + " rover."}
        />
        console.log(data);
      })}


    </div>
  );

  // return (
  //   <Home />
  //   <MarsRovers />
    
  // );
}

// export default App;



///////////////////////////////////////////////////////////////////////////////////////
// {/* <div className="mars-rover"> */}
//         {/* <div className="mars-card"> */}
//           {/* <img src={images.photos[0].img_src} /> */}
//           {/* <img src={"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG"} /> */}
//       //   </div>
//       // </div>

//       {/* <MarsRovers /> */}
//         {/* <DatePicker /> */}