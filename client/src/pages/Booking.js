import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/features/alertSlice";
import moment from "moment";
const Booking = () => {
     const { user } = useSelector((state) => state.user);

     const params = useParams();
     const dispatch = useDispatch();
     const [doctors, setDoctors] = useState([]);
     const [date, setDate] = useState();
     const [time, setTime] = useState();
     const [isAvailable, setIsAvailable] = useState();
     const getSingleDoctorInfo = async () => {
          try {
               const res = await axios.post(
                    "/api/v1/doctor/getDoctorById",
                    { doctorId: params.doctorId },
                    {
                         headers: {
                              Authorization:
                                   "Bearer " + localStorage.getItem("token"),
                         },
                    }
               );
               if (res.data.success) {
                    setDoctors(res.data.data);
               }
          } catch (error) {
               console.log("error:", error);
          }
     };
     const handleBooking = async () => {
          try {
               dispatch(showLoading());
               const res = await axios.post(
                    "/api/v1/user/book-appointment",
                    {
                         doctorId: params.doctorId,
                         userId: user._id,
                         doctorInfo: doctors,
                         date: date,
                         time: time,
                         userInfo: user,
                    },
                    {
                         headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                   "token"
                              )}`,
                         },
                    }
               );
               dispatch(hideLoading());
               if (res.data.success) {
                    message.success(res.data.message);
               }
          } catch (error) {
               dispatch(hideLoading());
          }
     };
     useEffect(() => {
          getSingleDoctorInfo();
     }, []);
     return (
          <Layout>
               <h4 className="text-center">Book Doctor</h4>
               <div className="container">
                    {doctors && (
                         <div>
                              <h5>
                                   Dr. {doctors.firstName}
                                   {doctors.lastName}
                              </h5>
                              <h5>Fees : {doctors.feesPerCunsaltation}</h5>
                              <h5>
                                   {/* Timings : {doctors?.timings[0]} -{" "}
                                   {doctors?.timings[1]} */}
                              </h5>
                              <div className="d-flex flex-column w-50">
                                   <DatePicker
                                        className="m-2"
                                        format="DD-MM-YYYY"
                                        onChange={(value) =>
                                             setDate(
                                                  moment(value).format(
                                                       "DD-MM-YYYY"
                                                  )
                                             )
                                        }
                                   />
                                   <TimePicker
                                        className="m-2"
                                        format="HH:mm"
                                        onChange={(value) =>
                                             setTime(
                                                  moment(value).format("HH:mm")
                                             )
                                        }
                                   />
                                   <button className="btn btn-primary mt-2">
                                        Check Availability
                                   </button>
                                   <button
                                        className="btn btn-dark mt-2"
                                        onClick={handleBooking}
                                   >
                                        Book Now
                                   </button>
                              </div>
                         </div>
                    )}
               </div>
          </Layout>
     );
};

export default Booking;
