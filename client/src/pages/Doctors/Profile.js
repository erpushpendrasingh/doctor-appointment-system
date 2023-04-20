import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
const Profile = () => {
     const id = useParams();
     const { user } = useSelector((state) => state.user);
     const [doctor, setDoctor] = useState(null);
     const getDoctorInfo = async () => {
          try {
               const res = await axios.post(
                    "/api/v1/doctor/getDoctorInfo",
                    { userId: id },
                    {
                         headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                   "token"
                              )}`,
                         },
                    }
               );
               if (res.data.success) {
                    setDoctor(res.data.data);
               }
          } catch (error) {
               console.log("error:", error);
          }
     };
     useEffect(() => {
          getDoctorInfo();
     }, []);
     return <Layout>Profile</Layout>;
};

export default Profile;
