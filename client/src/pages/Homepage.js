import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const Homepage = () => {
     const [doctors, setDoctors] = useState([]);
     const getUserdata = async () => {
          try {
               const res = await axios.get("/api/v1/user/getAllDoctors", {
                    headers: {
                         Authorization:
                              "Bearer " + localStorage.getItem("token"),
                    },
               });
               if (res.data.success) {
                    setDoctors(res.data.data);
               }
          } catch (error) {
               console.log("error:", error);
          }
     };
     useEffect(() => {
          getUserdata();
     }, []);
     return (
          <Layout>
               <h4 className="m-3 text-center">Homepage</h4>
               <Row>
                    {doctors &&
                         doctors?.map((doctor) => (
                              <DoctorList key={doctor._id} doctor={doctor} />
                         ))}
               </Row>
          </Layout>
     );
};

export default Homepage;
