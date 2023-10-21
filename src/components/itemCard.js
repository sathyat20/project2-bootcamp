import React, { useState, useEffect, useContext } from "react";
//import { UserContext } from "../App";

const ItemCard = ({name, overview, photoURL}) => {
  return (
    <>
      <div className="card w bg-base-100 shadow-xl">
        <div className="card-body flex justify-center content text-left content-center">
          <img src={photoURL} alt="" />
          <div>
            <h2 className="card-title text-base">{name}</h2>
            <p className=" text-xs">{overview}</p>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default ItemCard;
