import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase.config";
import { AnimatePresence, motion } from "framer-motion";

const UserProfileContainer = ({ userRoute }) => {
  const user = useSelector((state) => state.user.value);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    auth.signOut().then(() => {
      window.location.reload();
    });
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      className="w-10 cursor-pointer h-10 rounded-full flex items-center justify-center relative bg-gray-300 "
    >
      {/* image */}
      <img
        src={
          user?.photoURL
            ? user?.photoURL
            : "https://cdn.pixabay.com/photo/2021/04/20/07/59/woman-6193184_960_720.jpg"
        }
        className="w-full h-full object-cover rounded-full"
        alt=""
      />
      {/* user control box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0.5, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onMouseLeave={() => setIsOpen(false)}
            className="w-auto px-4 py-5 rounded-md shadow-md bg-white z-50 cursor-pointer absolute top-14 right-0 flex flex-col items-start gap-4"
          >
            {/* profile details */}
            <div className="w-52 flex items-center justify-center flex-col gap-4">
              <div className="w-20 h-20 rounded-md flex items-center justify-center">
                <img
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://cdn.pixabay.com/photo/2021/04/20/07/59/woman-6193184_960_720.jpg"
                  }
                  className="w-full h-full object-cover rounded-full"
                  alt=""
                />
              </div>
              <p className="text-lg capitalize text-neutral-600 tracking-wide font-semibold">
                {user?.displayName}
              </p>
            </div>

            {/* authenticated user routes */}
            {userRoute && (
              <ul className="flex flex-col w-full gap-3">
                {userRoute?.map((item) => (
                  <Link
                    className="text-neutral-600 opacity-75 hover:opacity-100 hover:bg-gray-100 px-2 py-1 rounded-md"
                    to={item?.uri.replace("userId", user.uid)}
                    key={item.uri}
                  >
                    {item.label}
                  </Link>
                ))}
              </ul>
            )}
            {/* signout button */}
            <button
              onClick={handleLogOut}
              type="button"
              className="bg-gray-100 w-full px-4 py-3 rounded-md text-neutral-600 opacity-75 hover:opacity-100"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileContainer;
