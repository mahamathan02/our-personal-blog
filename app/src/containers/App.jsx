import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Aunthentication,
  Dashboardblog,
  Dashboardcreate,
  Dashboardlayout,
  Dashboardusers,
  Home,
} from "../pages";
import { Blog, Blogs } from "../containers";
import { auth } from "../config/firebase.config";
import { useDispatch } from "react-redux";
import { saveuser } from "../context/reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((usercred) => {
      if (usercred) {
        console.log(usercred.providerData[0]);
        dispatch(saveuser(usercred.providerData[0]));
        navigate("/", { replace: true });
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Blogs />} />
          <Route path=":blogId" element={<Blog />} />
        </Route>
        <Route path="/auth" element={<Aunthentication />} />
        <Route path="/Dashboard" element={<Dashboardlayout />}>
          <Route index element={<Dashboardblog />} />
          <Route path="create" element={<Dashboardcreate />} />
          <Route path="users" element={<Dashboardusers />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
