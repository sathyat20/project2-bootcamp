import { database } from "../firebase.js";
import { ref, onChildAdded } from "firebase/database";
import { useContext, useEffect } from "react";
import { TripContext } from "../Provider/TripProvider.js";
import { UserContext } from "../App";

const DB_TRIPS_KEY = "trips";

export default function PastTrips({ onPastTripClick }) {
  const { setDate, setTitle, trips, setTrips, setIsTripCreated } =
    useContext(TripContext);
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
    // console.log("oldTrip:", oldTrip);
    // if (oldTrip && oldTrip.val) {
    const { title, startDate, endDate } = oldTrip.val;
    setTitle(title);
    setDate({
      startDate: startDate,
      endDate: endDate,
    });
    setIsTripCreated(true);
    onPastTripClick();
    console.log(oldTrip.val);
  };

  console.log("trips:", trips);

  return (
    <div className="join join-vertical">
      {trips.map((trip) => (
        <div key={trip.key} className="my-2">
          <button className="btn px-4 py-2" onClick={() => handleClick(trip)}>
            {trip.val && trip.val.title ? trip.val.title : ""}
          </button>
        </div>
      ))}
    </div>
  );
}
