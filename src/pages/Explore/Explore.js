import React, { useMemo } from "react";
import "../../App.css";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
// import { UserContext } from "../App.js";
// import mapStyles from "../components/mapStyles";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./explore.css";

/////////// DECALRE FIREBASE LIST NAME HERE ///////////
/////////// e.g. const DB_POSTS_KEY = "posts"; ///////////

export default function Explore() {
  // User Object brought in via useContext();
  // const { user } = useContext(UserContext);

  /////////// DECALRE STATES HERE ///////////
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  return (
    <div className="App">
      <Header />
      <div
        className="flex flex-col h-screen justify-center text-center content-center overflow-auto"
        style={{ height: "calc(100% - 128px)" }}
      >
        {!isLoaded ? <div>Loading...</div> : <Map />}
      </div>
      <Footer />
    </div>
  );
}

function Map() {
  const center = useMemo(() => ({ lat: 22.396427, lng: 114.109497 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
