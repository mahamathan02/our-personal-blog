import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHouse, FaUsers } from "react-icons/fa6";
import { MdContacts, MdMenu } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { UserProfileContainer } from "../components";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);

  const clientRoutes = useMemo(
    () => [
      {
        label: "Home",
        Icon: FaHouse,
        uri: "/",
      },
      {
        label: "About Us",
        Icon: FaUsers,
        uri: "/about",
      },
      {
        label: "Contact Us",
        Icon: MdContacts,
        uri: "/contact",
      },
    ],
    []
  );

  const userRoute = useMemo(
    () => [
      {
        label: "Favourites",
        Icon: FaHouse,
        uri: "/favourites/userId",
      },
      {
        label: "My Profile",
        Icon: FaUsers,
        uri: "/profile/userId",
      },
    ],
    []
  );

  const user = useSelector((state) => state.user.value);

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-20 py-4 shadow-md bg-white relative">
      {/* Logo */}
      <Link to={"/"} className="text-xl font-semibold text-neutral-700">
        Maha <span className="text-blue-500">Mathan</span>
      </Link>

      <div className="ml-auto"></div>

      {/* desktop nav */}
      <nav className="ml-auto hidden md:block">
        <ul className="flex items-center justify-center gap-8">
          {/* Client Route */}
          {clientRoutes?.map((item) => (
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  "text-neutral-600 font-semibold text-lg opacity-50 px-4 py-2 hover:opacity-100",
                  isActive && "opacity-100"
                )
              }
              to={item.uri}
              key={item.uri}
            >
              {item.label}
            </NavLink>
          ))}

          {/* Admin Route */}
        </ul>
      </nav>
      {/* Mobile Route */}

      <AnimatePresence>
        {isMenu && (
          <motion.nav
            initial={{ opacity: 0.6, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            className="absolute w-3/4 bg-black/80 shadow-md backdrop-blur-md top-[72px] right-0 h-[calc(100vh-72px)] px-6 py-8"
          >
            <ul className="flex flex-col items-start justify-start gap-8 ">
              {/* Client Route */}
              {clientRoutes?.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    twMerge(
                      "text-gray-50 font-semibold text-lg opacity-50 px-4 py-2 hover:opacity-100",
                      isActive && "opacity-100"
                    )
                  }
                  to={item.uri}
                  key={item.uri}
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Admin Route */}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* User Profile */}

      {user ? (
        <UserProfileContainer userRoute={userRoute} />
      ) : (
        <Link
          to={"/auth"}
          className="px-6 py-2 rounded-md border border-sky-500 cursor-pointer text-sky-500 font-semibold text-lg"
        >
          Login
        </Link>
      )}

      {/* Toggle Icon */}
      <MdMenu
        className="text-2xl text-neutral-600 cursor-pointer block md:hidden ml-6"
        onClick={() => setIsMenu(!isMenu)}
      />
    </header>
  );
};

export default Header;
