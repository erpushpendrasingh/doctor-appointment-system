import axios from "axios";
import React, { useEffect } from "react";
import Layout from "../components/Layout";

const Homepage = () => {
     const getUserdata = async () => {
          try {
               const res = await axios.post(
                    "/api/v1/user/getUserData",
                    {},
                    {
                         headers: {
                              Authorization:
                                   "Bearer" + localStorage.getItem("token"),
                         },
                    }
               );
          } catch (error) {
               console.log("error:", error);
          }
     };
     useEffect(() => {
          getUserdata();
     }, []);
     return <Layout>Homepage</Layout>;
};

export default Homepage;
