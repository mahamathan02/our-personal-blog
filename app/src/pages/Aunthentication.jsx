import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../config/firebase.config";
const Aunthentication = () => {
  const provider = new GoogleAuthProvider();

  const handleclick = async () => {
    await signInWithRedirect(auth, provider)
      .then((usercred) => {
        console.log(usercred);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center gap-12">
      <h2 className="text-blue-700 font-semibold text-2xl md:text-3xl">
        Welcome back
      </h2>
      <p>Authentication Yourself by Following</p>

      <div
        className="flex items-center gap-x-3 border border-neutral-400 w-[98%] md:w-auto justify-center px-12 py-3 rounded-md cursor-pointer bg-neutral-200 opacity-70 hover:opacity-100 hover:shadow-md transition"
        onClick={handleclick}
      >
        <FcGoogle />
        <p>sign-in with google</p>
      </div>
    </div>
  );
};

export default Aunthentication;
