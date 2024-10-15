import * as React from "react";
import Map from "react-map-gl";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";

function App() {
  const [viewport] = React.useState({
    zoom: 9
  });
  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: 78.4,
          latitude: 20.8,
          zoom: 4
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          latitude={21.6}
          longitude={74}
          anchor="bottom"
        >
          <RoomIcon
            style={{
              fontSize: viewport.zoom * 5,
              color: "slateblue",
              cursor: "pointer",
            }}
          ></RoomIcon>
        </Marker>
      </Map>
    </div>
  );
}

export default App;
