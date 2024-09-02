import { Link } from "react-router-dom"
import Map from "./Map"

function Home() {
  return (
    <div className="homeContainer">
      <div>
        <h1>Welcome to<span className="italic-bold"><span className="mirror">S</span>IGNED WORLD</span></h1>

        <div className="description">
          <p>Share your thoughts with the world—anonymously and effortlessly. Your message will find its place on the map.</p>
        </div>

        <div className="main-buttons">
          <Link to='/create'><button className="main-button">Create Pin</button></Link>
          <Link to='/edit'><button className="main-button">Edit Pin</button></Link>
        </div>
      </div>
      <div className="mapContainer">
      <Map></Map>
      </div>
    </div>
  )
}

export default Home