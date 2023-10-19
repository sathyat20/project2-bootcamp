import { useEffect, useContext, useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { database } from "../firebase.js";
import { ref, set, push, onChildAdded } from "firebase/database";
import {TripContext} from "../Provider/TripProvider.js";
import { UserContext } from "../App";

const DB_TRIPS_KEY = "trips";

export default function NewTrip({ onNewTripCreated }) {

  const [isFormValid, setIsFormValid] = useState(false);

  const { date, setDate, setTitle, title, setIsTripCreated, setTrips, addedGems, setAddedGems, trips } =
    useContext(TripContext);
  const { user } = useContext(UserContext);

  const validateForm = () => {
    setIsFormValid(
      title !== "" && date.startDate !== null && date.endDate !== null
    );
  };

  useEffect(() => {
    validateForm();
  }, [title, date.startDate, date.endDate]);

  useEffect(() => {
    const tripsRef = ref(database, DB_TRIPS_KEY);
    onChildAdded(tripsRef, (data) => {
      const trip = data.val()
      if (trip.userId === user.uid)
        setTrips((prevTrips) => [
          ...prevTrips,
          { key: data.key, val: trip },
        ]);
    });
  }, [setTrips, user]);

  const writeData = (newTrip) => {
    const tripListRef = ref(database, DB_TRIPS_KEY);
    const newTripRef = push(tripListRef);

    set(newTripRef, newTrip);
  };

  const handleChange = (event) => {

    const name = event.target.id;
    const value = event.target.value;

    if (name === "Title") {
      setTitle(value);
    }
  };

  const handleValueChange = (newValue) => {
    setDate(newValue);
  };

  const submit = (event) => {
    event.preventDefault();
    if (isFormValid) {
    const newTrip = {
      title,
      startDate: date.startDate,
      endDate: date.endDate,
      userId: user.uid,
      addedGems: addedGems,
    };
    console.log(addedGems)
    writeData(newTrip);
    setIsTripCreated(true);
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    console.log(trips)
    onNewTripCreated();
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Create New Trip List</h1>
            <p className="py-6"></p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title:</span>
                </label>
                <input
                  type="Title"
                  id="Title"
                  placeholder="Title"
                  className="input input-bordered"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <label className="label">
                <span className="label-text">Date:</span>
              </label>
              <Datepicker value={date} onChange={handleValueChange} />
              <div className="flex items-stretch">
                <label className="label">
                  <span className="label-text">People:</span>
                </label>
                <div className="avatar-group -space-x-6">
                  <div className="avatar">
                    <div className="w-12">
                      <img
                        src="https://media.istockphoto.com/id/1194465593/photo/young-japanese-woman-looking-confident.webp?b=1&s=170667a&w=0&k=20&c=Yw-pDjt1YusifALNZ2t6SNEY97RkSsekS7g82DQukHE="
                        alt="stock"
                      />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-12">
                      <img
                        src="https://media.istockphoto.com/id/1194465593/photo/young-japanese-woman-looking-confident.webp?b=1&s=170667a&w=0&k=20&c=Yw-pDjt1YusifALNZ2t6SNEY97RkSsekS7g82DQukHE="
                        alt="stock"
                      />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-12">
                      <img
                        src="https://media.istockphoto.com/id/1194465593/photo/young-japanese-woman-looking-confident.webp?b=1&s=170667a&w=0&k=20&c=Yw-pDjt1YusifALNZ2t6SNEY97RkSsekS7g82DQukHE="
                        alt="stock"
                      />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-12">
                      <img
                        src="https://media.istockphoto.com/id/1194465593/photo/young-japanese-woman-looking-confident.webp?b=1&s=170667a&w=0&k=20&c=Yw-pDjt1YusifALNZ2t6SNEY97RkSsekS7g82DQukHE="
                        alt="stock"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={submit}
                  disabled={!isFormValid}
                >
                  Create New Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
