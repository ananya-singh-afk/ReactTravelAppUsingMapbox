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
  const [viewport] = React.useState({
    zoom: 9,
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

  const handleMarkerClick = (id) => {
    setCurrenPlaceId(id);
  }

  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: 78.4,
          latitude: 20.8,
          zoom: 4,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
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
                  fontSize: viewport.zoom * 5,
                  color: p.username===currentUser? "tomato" :"slateblue",
                  cursor: "pointer",
                }}
                onClick = {() => handleMarkerClick(p._id)}
              ></RoomIcon>
            </Marker>
            {(p._id === currenPlaceId) && 
            <Popup longitude={p.longitude} latitude={p.latitude} anchor="left"
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
      </Map>
    </div>
  );
}

export default App;
