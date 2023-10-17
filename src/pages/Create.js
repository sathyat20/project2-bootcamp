import React, { useState, useContext } from "react";
import "../App.css";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import NewTrip from "../components/NewTrip";
import PastTrips from "../components/PastTrips";
import CurrentTrip from "../components/CurrentTrip";
// import { TripContext } from "../Provider/TripProvider";


export default function Create() {
  const [activeButton, setActiveButton] = useState(null);
  const [showNewTrip, setShowNewTrip] = useState(true);
  const [showCurrentTrip, setShowCurrentTrip] = useState(false);
  const [showPastTrips, setShowPastTrips] = useState(false);
  const [newTripData, setNewTripData] = useState(null)
  // const {date, setDate, title, setTitle} = useContext(TripContext);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setShowNewTrip(false); // Hide NewTrip component
    setShowCurrentTrip(false); // Hide CurrentTrip component
    setShowPastTrips(false); // Hide PastTrips component

    if (buttonId === 1) {
      // If the first button is clicked, show the NewTrip component
      setShowNewTrip(true);
    }

    if (buttonId === 2) {
      // If the second button is clicked, show the CurrentTrip component
      setShowCurrentTrip(true);
    } // Toggle the state

    if (buttonId === 3) {
      // If the third button is clicked, show the PastTrips component
      setShowPastTrips(true);
    }
  };

  const handleNewTripCreated = (newTrip) => {
    setNewTripData(newTrip)
    handleButtonClick(2)
    console.log("Moved to current tab")
  }

  return (
      <div className="App">
        <Header />
        <div
          className="flex flex-col h-screen justify-center text-center content-center overflow-auto"
          style={{ height: "calc(100% - 128px)" }}
        >
          <div className="my-8">
            <button
              className={activeButton === 1 ? "btn btn-active" : "btn"}
              onClick={() => {
                handleButtonClick(1);
              }}
            >
              New Trip
            </button>
            <button
              className={activeButton === 2 ? "btn btn-active" : "btn"}
              onClick={() => handleButtonClick(2)}
            >
              Current Trip
            </button>
            <button
              className={activeButton === 3 ? "btn btn-active" : "btn"}
              onClick={() => handleButtonClick(3)}
            >
              Past Trips
            </button>
          </div>
          {showNewTrip && <NewTrip onNewTripCreated={handleNewTripCreated} />}
          {showCurrentTrip && <CurrentTrip />}
          {showPastTrips && <PastTrips />}
        </div>
        <Footer />
      </div>
  );
}


