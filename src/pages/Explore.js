import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import Header from "../components/header.js";
import Footer from "../components/footer.js";

import { database } from "../firebase.js";
import { UserContext } from "../App.js";

import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";
import mapStyles from "../components/mapStyles";


import {
  ref,
  set,
  push,
  onChildAdded,
  onChildRemoved,
  onValue,
} from "firebase/database";

/////////// DECALRE FIREBASE LIST NAME HERE ///////////
/////////// e.g. const DB_POSTS_KEY = "posts"; ///////////

const Feeds = (props) => {
  // User Object brought in via useContext();
  const { user } = useContext(UserContext);

  /////////// DECALRE STATES HERE ///////////

  //Equivalent to "componentDidMount()"
  useEffect(() => {
    
  }, []);

function Map() {
  return (
     <GoogleMap defaultZoom={12} defaultCenter={{lat: 22.318567, lng: 114.179604}} defaultOptions={{styles: mapStyles}}/>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map) ) 

  return ( 
    <div className="App"> 
      <Header />
      <div
        className="flex flex-col h-screen justify-center text-center content-center overflow-auto"
        style={{ height: "calc(100% - 128px)" }}
      >
        <div style={{width: "100vw", height: "100vh"}}>
          <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`} 
          loadingElement={<div style={{height: "100%"}}/>}
          mapElement={<div style={{height: "100%"}}/>}
          containerElement={<div style={{height: "100%"}}/>} />
        </div>
      </div> 
      <Footer />
    </div> 
  );
};

export default Feeds;
