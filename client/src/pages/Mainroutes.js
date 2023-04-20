import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import ApplyDoctor from "./ApplyDoctor";
import Appointments from "./Appointments";
import Profile from "./Profile";
import Notification from "./Notification";

const Mainroutes = () => {
     const { loading } = useSelector((state) => state.alerts);

     return (
          <>
               {loading ? (
                    <Spinner />
               ) : (
                    <Routes>
                         <Route
                              path="/"
                              element={
                                   <ProtectedRoute>
                                        <Homepage />
                                   </ProtectedRoute>
                              }
                         />
                         <Route
                              path="/appointments"
                              element={
                                   <ProtectedRoute>
                                        <Appointments />
                                   </ProtectedRoute>
                              }
                         />
                         <Route
                              path="/apply-doctor"
                              element={
                                   <ProtectedRoute>
                                        <ApplyDoctor />
                                   </ProtectedRoute>
                              }
                         />
                         <Route
                              path="/profile"
                              element={
                                   <ProtectedRoute>
                                        <Profile />
                                   </ProtectedRoute>
                              }
                         />
                         <Route
                              path="/notification"
                              element={
                                   <ProtectedRoute>
                                        <Notification />
                                   </ProtectedRoute>
                              }
                         />
                         <Route
                              path="/login"
                              element={
                                   <PublicRoute>
                                        <Login />
                                   </PublicRoute>
                              }
                         />
                         <Route
                              path="/register"
                              element={
                                   <PublicRoute>
                                        <Register />
                                   </PublicRoute>
                              }
                         />
                         <Route path="*" element={<h1>Page Not Found</h1>} />
                    </Routes>
               )}
          </>
     );
};

export default Mainroutes;
