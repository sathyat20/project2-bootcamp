import { database } from "../firebase.js";
import { useState, useEffect } from "react";
import {ref, onChildAdded} from "firebase/database";

const DB_TRIPS_KEY = "trips";

export default function PastTrips() {
 
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const tripsRef = ref(database, DB_TRIPS_KEY);

    onChildAdded(tripsRef, (snapshot) => {
      const tripData = snapshot.val();

      setTrips((prevTrips) => [tripData, ...prevTrips]);
    })
  }, [])

  return (
    <div className="join join-vertical">
      {trips.map((trip, index) => (
        <button className="btn join-item" key={index}>{trip.title}</button>
      ))}
    </div>
  );
}
