import * as React from "react";
import Map, { Popup } from "react-map-gl";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "./app.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {format} from "timeago.js";

function App() {
  const currentUser = "Jane"
  const [pins, setPins] = useState([]);
  const [currenPlaceId, setCurrenPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw", height: "100vh",
    latitude: 20.8,
    longitude: 78.4,
    zoom: 4,
  });
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins()
  }, []);

  const handleMarkerClick = (id,latitude,longitude) => {
    setCurrenPlaceId(id);
    setViewport({...viewport, latitude:latitude, longitude:longitude});
  }

  const handleAddClick = (e)=>{
    const [lat, long] = [e.lngLat.lat, e.lngLat.lng];
    setNewPlace({
      lat,
      long
    });
  };

  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: viewport.longitude,
          latitude: viewport.latitude,
          zoom: viewport.zoom,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
        transitionDuration="200"
      >
        {pins.map(p => (
          <>
            <Marker
              latitude={p.latitude}
              longitude={p.longitude}
              anchor="right"
            >
              <RoomIcon
                style={{
                  fontSize: 30,
                  color: p.username===currentUser? "tomato" :"slateblue",
                  cursor: "pointer",
                }}
                onClick = {() => handleMarkerClick(p._id, p.latitude, p.longitude)}
              ></RoomIcon>
            </Marker>
            {(p._id === currenPlaceId) && 
            <Popup longitude={p.longitude} latitude={p.latitude} anchor="left" closeOnClick={false}
            onClose={() => setCurrenPlaceId(null)}>
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="description">{p.description}</p>
                <label>Rating</label>
                <div className="stars">
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">{format(p.createdAt)} </span>
              </div>
            </Popup>
            }
          </>
          ))}
          {newPlace && (
         <Popup longitude={newPlace.long} latitude={newPlace.lat} anchor="left" closeOnClick={false}
            onClose={() => setNewPlace(null)}> 
            <div>
              <form>
                <label> Title </label>
                <input placeholder="Enter a title"/>
                <label> Review </label>
                <textarea placeholder="Enter your review"/>
                <label> Rating </label>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit"> Add Pin </button>
              </form>
            </div>
         </Popup>
         )}
      </Map>
    </div>
  );
}

export default App;
