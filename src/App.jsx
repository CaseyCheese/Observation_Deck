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

  const handleCamera = e => setCamera(e.target.value)
  const handleDate = e => setDate(e.target.value)
  const handleRover = e => setRover(e.target.value)

  useEffect(() => {
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&camera=${camera}&page=${'1'}&api_key=${apiKey}`)
      .then(res => res.data.photos)
      .then(setImages)
  }, [camera])


  return (
    <div className="App">

      
      <input aria-label="Date" type="date" onChange={handleDate} />
      {images.map(image => {
        return <img src={image.img_src} />

      })}
      <input type="text" onChange={handleCamera} />

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