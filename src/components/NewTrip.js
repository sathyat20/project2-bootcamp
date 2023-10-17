import { useState, useEffect, useContext} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { database } from "../firebase.js";
import { ref, set, push, onChildAdded } from "firebase/database";
import {TripContext} from "../Provider/TripProvider.js";

const DB_TRIPS_KEY = "trips";

export default function NewTrip({ onNewTripCreated }) {
  const [show, setShow] = useState(true);
  const [trips, setTrips] = useState([]);

  const {date, setDate, setTitle, title} = useContext(TripContext);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDate(newValue);
  };

  useEffect(() => {
    const tripsRef = ref(database, DB_TRIPS_KEY);
    onChildAdded(tripsRef, (data) => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render
      setTrips((prevTrips) => [
        ...prevTrips,
        { key: data.key, val: data.val() },
      ]);
    });
  }, []);

  const writeData = (newTrip) => {
    const tripListRef = ref(database, DB_TRIPS_KEY);
    const newTripRef = push(tripListRef);

    set(newTripRef, newTrip);
  };

  const handleChange = (event) => {
    //  let name = event.target.name;
    //  let value = event.target.value;
    const name = event.target.id;
    const value = event.target.value;

    if (name === "Title") {
      setTitle(value);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    const newTrip = {
      title,
      startDate: date.startDate,
      endDate: date.endDate,
    };
    writeData(newTrip);
    toggleShow();
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    console.log(date);
    console.log(title);

    onNewTripCreated(newTrip);
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
                  <button className="btn btn-primary" onClick={submit}>
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
