import "./CurrentTrip.js";
import { useContext, useEffect, useState } from "react";
import { TripContext } from "../Provider/TripProvider.js";
import { database } from "../firebase.js";
import { ref, onChildAdded } from "firebase/database";
import React from "react";

const DB_GEMS_KEY = "hiddengems";

export default function CurrentTrip() {
  const [gems, setGems] = useState([]);
  const trip = useContext(TripContext);

  useEffect(() => {
    const gemsRef = ref(database, DB_GEMS_KEY);

    onChildAdded(gemsRef, (snapshot) => {
      const gemsData = snapshot.val();

      setGems((prevGems) => [gemsData, ...prevGems]);
    });
  }, []);

  function generateStarRating(rating) {
    const maxStars = 5;
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      // Calculate the class based on whether it's a full star, a half star, or empty star
      let starClass = "bg-green-500 mask mask-star-2";
      if (i <= rating) {
        if (i === Math.ceil(rating) && rating % 1 !== 0) {
          // This is a half star
          starClass += " mask-half-1"; // Add the class for half star
        }
      } else {
        starClass = "rating-hidden"; // Empty star
      }

      stars.push(
        <input
          key={i}
          type="radio"
          name={`rating-${rating}`}
          className={starClass}
        />
      );
    }
    return (
      <div className="rating rating-lg rating-half">
        {stars.map((star, index) => React.cloneElement(star, { key: index }))}
      </div>
    );
  }

  return (
    <div>
      <div>
        {trip && trip.isTripCreated ? (
          <div>
            {trip.title && <h1>{trip.title}</h1>}
            {trip.date ? (
              <div>
                <h1>Start Date: {trip.date.startDate}</h1>
                <h1>End Date: {trip.date.endDate}</h1>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="top-card-container">
        <div className="card lg:card-side bg-base-100 shadow-xl max-w-md">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1619083417049-d08746f461c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3174&q=80"
              alt="Album"
            />
          </figure>
          {gems.length > 0 && (
            <div className="card-body">
              <h2 className="card-title">{gems[0].name}</h2>
              {gems[0].editorial_summary ? (
                <p>{gems[0].editorial_summary.overview}</p>
              ) : (
                <p>{gems[0].formatted_address}</p>
              )}
              <div className="rating">{generateStarRating(gems[0].rating)}</div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Add</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <h2>Suggestions</h2>
      <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
        <div className="carousel-item">
          {gems.map((gem, index) => (
            <div
              className="card card-compact w-96 bg-base-100 shadow-xl"
              key={index}
            >
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1518599807935-37015b9cefcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
                  alt="Hong Kong"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{gem.name}</h2>
                {gem.editorial_summary ? (
                  <p>{gem.editorial_summary.overview}</p>
                ) : (
                  <p>{gem.formatted_address}</p>
                )}
                <div className="rating">{generateStarRating(gem.rating)}</div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

