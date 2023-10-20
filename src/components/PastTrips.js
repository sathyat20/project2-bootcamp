import { database } from "../firebase.js";
import { ref, onChildAdded, set, get } from "firebase/database";
import { useContext, useEffect } from "react";
import { TripContext } from "../Provider/TripProvider.js";
import { UserContext } from "../App";
import "./PastTrips.css"

const DB_TRIPS_KEY = "trips";
const DB_GEMS_KEY = "hiddengems"

export default function PastTrips({ onPastTripClick }) {
  const {
    setDate,
    setTitle,
    trips,
    setTrips,
    setIsTripCreated,
    setCurrentHiddenGemId,
    currentHiddenGemId,
    setAddedGems
  } = useContext(TripContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const tripsRef = ref(database, DB_TRIPS_KEY);
      setTrips([]);

      onChildAdded(tripsRef, (data) => {
        const tripData = { key: data.key, val: data.val() };

        if (tripData.val.userId === user.uid) {
          setTrips((prevTrips) => [tripData, ...prevTrips]);
        }
      });
    }
  }, [setTrips, user]);

  const handleClick = (oldTrip) => {

    const { title, startDate, endDate, addedGems } = oldTrip.val;
    setTitle(title);
    setDate({
      startDate: startDate,
      endDate: endDate,
    });
    setAddedGems(addedGems)

    // if (Array.isArray(addedGems) && addedGems.length > 0) {
    //   // const updatedAddedGems = oldTrip.addedGems.push(currentHiddenGemId);
    //   const gemsData = []
    //   const gemsRef = ref(database, DB_GEMS_KEY)

    //   for (const gemId of addedGems) {
    //     const gemSnapshot = get(ref(gemsRef, gemId))
    //     if (gemSnapshot.exists()) {
    //       gemsData.push({key: gemSnapshot.key, val:gemSnapshot.val()})
    //     }
    //   }

    console.log(oldTrip.val);
    // console.log(gemsData);
    setIsTripCreated(true);
    onPastTripClick();
  };


  return (
    <div className="join join-vertical button-container">
      {trips.map((trip) => (
        <div key={trip.key} className="my-2">
          <button className="btn px-4 py-2" onClick={() => handleClick(trip)}>
            {trip.val && trip.val.title ? `${trip.val.title} +`: ""}
          </button>
        </div>
      ))}
    </div>
  );
}
