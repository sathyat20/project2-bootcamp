import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../components/header.js";
import Footer from "../components/footer.js";

import { auth, database, storage } from "../firebase.js";
import { UserContext } from "../App.js";

import {
  ref,
  set,
  push,
  onChildAdded,
  onChildRemoved,
  onValue,
} from "firebase/database";

import { 
    ref as sRef, 
    uploadBytes, 
    getDownloadURL,
} from "firebase/storage";

import { 
  signOut,
  updateProfile,
} from "firebase/auth";

/////////// DECALRE FIREBASE LIST NAME HERE ///////////
const STORAGE_KEY = "profile-pic";

const Profile = (props) => {
  // User Object brought in via useContext();
  const { user, setUser, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  /////////// DECALRE STATES HERE ///////////
  const [profilePic, setProfilePic] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");
  const [imagePreviewURL, setImagePreviewURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image into storage and get the image url
      const fileRef = sRef(storage, `${STORAGE_KEY}/${profilePic.name}`);
      await uploadBytes(fileRef, profilePic);
      const url = await getDownloadURL(fileRef);

      console.log("url:", url);

      // Pushing up profile photo url into auth.
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });

      setProfilePic(null);

      // Turn off "Modal"
      document.getElementById("change_profile_pic_modal").close();
    } catch (error) {
      console.error("Error", error);
    }

    // // Upload image into storage and get the image url
    // const fileRef = sRef(storage, `${STORAGE_KEY}/${profilePic.name}`);
    // uploadBytes(fileRef, profilePic)
    //   .then(() => {
    //     // Get Image URL
    //     return getDownloadURL(fileRef);
    //   })
    //   .then((url) => {
    //     console.log("url:", url);
    //     // Pushing up profile photo url into realtime database.
    //     updateProfile(auth.currentUser, {
    //       photoURL: url,
    //     });
    //   })
    //   .then(() => {
    //     setProfilePic(null);
    //   });
    // // Need to put turn off "Modal" code here? 
    // document.getElementById("change_profile_pic_modal").close();

  };

  const logOut = () => {
    signOut(auth)
    .then(() => {
      console.log("Signed Out");
      setUser({});
      setIsLoggedIn(false);
      navigate('/');
    }).catch((error) => {
      console.error("Error:", error);
    });
  };

  // const uploadPhotoButton = () => {
  //   return (
  //     <div>
  //       <label htmlFor="image_upload" className="btn btn-circle">
  //         <i class="fi fi-rr-plus"></i>
  //       </label>
  //       <br />
  //       <input
  //         type="file"
  //         id="image_upload"
  //         accept="image/*"
  //         // Set state's fileInputValue to "" after submit to reset file input
  //         value={fileInputValue}
  //         onChange={(e) => fileChange(e)}
  //         style={{ opacity: 0 }}
  //       />
  //     </div>
  //   )
  // };

  const changePhotoButton = () => {
    return (
      <div>
        <label htmlFor="image_upload" className="text-sm cursor-pointer">
          Change Photo
        </label>
        <br />
        <input
          type="file"
          id="image_upload"
          accept="image/*"
          // Set state's fileInputValue to "" after submit to reset file input
          value={fileInputValue}
          onChange={(e) => fileChange(e)}
          style={{ opacity: 0 }}
        />
      </div>
    )
  };
  
  const fileChange = (e) => {
    // "e.target.files" gets all the information of the selected file
    console.log(e.target.files[0]);
    setProfilePic(e.target.files[0]);
    setImagePreviewURL(URL.createObjectURL(e.target.files[0]));
  };

  //Equivalent to "componentDidMount()"
  useEffect(() => {
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="flex text-left content-center gap-4 p-7">
        <div className="avatar flex flex-col">
          <div className=" w-24 h-24 rounded-full">
            <img
              alt="profile_pic"
              src={
                user.photoURL
                  ? user.photoURL
                  : `https://firebasestorage.googleapis.com/v0/b/globalgems-e353b.appspot.com/o/profile_pic.jpg?alt=media&token=0ddff376-b175-4835-8d1c-02867db1a397&_gl=1*1uc9vza*_ga*MTI5Mzg0Nzk2Mi4xNjk3NjE2NTA2*_ga_CW55HF8NVT*MTY5NzYxNjUwNi4xLjEuMTY5NzYxNzMzNy41NS4wLjA.`
              }
            />
          </div>
          <button
            className="btn btn-xs btn-link text-xs p-2"
            onClick={() =>
              document.getElementById("change_profile_pic_modal").showModal()
            }
          >
            Change Pic
          </button>
        </div>

        <div className="flex flex-col justify-around gap-3">
          <div>
            <p>
              Username: <span className="font-bold">{user.displayName}</span>
            </p>
            <p>
              Email: <span className="font-bold">{user.email}</span>
            </p>
          </div>
          <button className="btn btn-sm" onClick={logOut}>
            Logout
          </button>
        </div>

        <dialog id="change_profile_pic_modal" className="modal">
          <div className="modal-box flex flex-col justify-center text-center content-center">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Change Profile Photo</h3>
            <form onSubmit={(e) => handleSubmit(e)} className="m-5">
              {imagePreviewURL ? (
                <div>
                  <div className="avatar">
                    <div className=" w-40 h-40 rounded-full">
                      <img src={imagePreviewURL} alt="uploadedPhoto" />
                    </div>
                  </div>
                  <br />
                  {changePhotoButton()}
                </div>
              ) : (
                <div>
                  <div className="avatar">
                    <div className="w-40 h-40 rounded-full">
                      <img 
                        src="https://firebasestorage.googleapis.com/v0/b/globalgems-e353b.appspot.com/o/profile_pic.jpg?alt=media&token=0ddff376-b175-4835-8d1c-02867db1a397&_gl=1*1uc9vza*_ga*MTI5Mzg0Nzk2Mi4xNjk3NjE2NTA2*_ga_CW55HF8NVT*MTY5NzYxNjUwNi4xLjEuMTY5NzYxNzMzNy41NS4wLjA." 
                        alt="defaultPhoto"
                      />
                    </div>
                  </div>
                  <br />
                  {changePhotoButton()}
                </div>
              )}
              { imagePreviewURL ? <input type="submit" className="btn" /> : "" }
            </form>

            {/* <div className="modal-action mt-1 flex justify-center">
              <form method="dialog">
                if there is a button in form, it will close the modal
                <button className="btn" >
                  Close
                </button>
              </form>
            </div> */}

          </div>
        </dialog>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
