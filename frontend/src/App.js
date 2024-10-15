import * as React from "react";
import Map from "react-map-gl";
import { Marker } from "react-map-gl";
import RoomIcon from '@mui/icons-material/Room';
import { Icon } from '@mui/material';


function App() {
  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: 78.4,
          latitude: 20.8,
          zoom: 4,
        }}
        style={{ width: "40vw", height: "40vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker latitude={18.7577} longitude={72.4376}>
        </Marker>
      </Map>
    </div>
  );
}

export default App;
