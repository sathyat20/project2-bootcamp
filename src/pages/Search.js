import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../components/header.js";
import Footer from "../components/footer.js";

import { database } from "../firebase.js";
import { UserContext } from "../App.js";

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

const Search = (props) => {
  // User Object brought in via useContext();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  /////////// DECALRE STATES HERE ///////////

  //Equivalent to "componentDidMount()"
  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <Header />
      <div
        className="flex flex-col h-screen justify-center text-center content-center overflow-auto"
        style={{ height: "calc(100% - 128px)" }}
      ></div>
      <Footer />
    </div>
  );
};

export default Search;
