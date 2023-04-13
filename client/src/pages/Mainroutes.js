import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

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
