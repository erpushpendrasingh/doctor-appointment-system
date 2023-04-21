import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/features/alertSlice";
import moment from "moment";
const Profile = () => {
     const id = useParams();
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const { user } = useSelector((state) => state.user);
     const [doctor, setDoctor] = useState(null);
     const getDoctorInfo = async () => {
          try {
               const res = await axios.post(
                    "/api/v1/doctor/getDoctorInfo",
                    {
                         userId: id,
                    },
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
     const handleFinish = async (values) => {
          try {
               dispatch(showLoading());
               const res = await axios.post(
                    "/api/v1/doctor/updateProfile",
                    {
                         ...values,
                         userId: user._id,
                         timings: [
                              moment(values.timings[0]).format("HH:mm"),
                              moment(values.timings[1]).format("HH:mm"),
                         ],
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
                    navigate("/");
               } else {
                    message.error(res.data.success);
               }
          } catch (error) {
               dispatch(hideLoading());
               console.log(error);
               message.error("somthing Went Wrong");
          }
          console.log(values);
     };
     useEffect(() => {
          getDoctorInfo();
     }, []);
     return (
          <Layout>
               <h4 className="m-3 text-center">Manage Profile</h4>
               {doctor && (
                    <Form
                         layout="vertical"
                         onFinish={handleFinish}
                         className="m-3"
                         initialValues={{
                              ...doctor,
                              timings: [
                                   moment(doctor.timings[0]),
                                   moment(doctor.timings[1]),
                              ],
                         }}
                    >
                         <h6 className="">Personal Details</h6>
                         <Row gutter={20}>
                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="First Name"
                                        name="firstName"
                                        required
                                        rules={[{ required: true }]}
                                   >
                                        <Input
                                             type="text"
                                             placeholder="Your name "
                                        />
                                   </Form.Item>
                              </Col>
                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="Last Name"
                                        name="lastName"
                                        required
                                        rules={[{ required: true }]}
                                   >
                                        <Input
                                             type="text"
                                             placeholder="Last name "
                                        />
                                   </Form.Item>
                              </Col>
                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="Phone"
                                        name="phone"
                                        required
                                        rules={[{ required: true }]}
                                   >
                                        <Input
                                             type="text"
                                             placeholder="Phone"
                                        />
                                   </Form.Item>
                              </Col>
                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="Email"
                                        name="email"
                                        required
                                        rules={[{ required: true }]}
                                   >
                                        <Input
                                             type="text"
                                             placeholder="Email "
                                        />
                                   </Form.Item>
                              </Col>
                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="Website"
                                        name="website"
                                        required
                                        rules={[{ required: true }]}
                                   >
                                        <Input
                                             type="text"
                                             placeholder="Website"
                                        />
                                   </Form.Item>
                              </Col>
                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="Address"
                                        name="address"
                                        required
                                        rules={[{ required: true }]}
                                   >
                                        <Input
                                             type="text"
                                             placeholder="Address"
                                        />
                                   </Form.Item>
                              </Col>
                         </Row>
                         <h6 className="">Professional Details</h6>

                         <Row gutter={20}>
                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="Specialization"
                                        name="specialization"
                                        required
                                        rules={[{ required: true }]}
                                   >
                                        <Input
                                             type="text"
                                             placeholder="Specialization"
                                        />
                                   </Form.Item>
                              </Col>
                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="Experience"
                                        name="experience"
                                        required
                                        rules={[{ required: true }]}
                                   >
                                        <Input
                                             type="text"
                                             placeholder="Experience"
                                        />
                                   </Form.Item>
                              </Col>

                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="FeesPerCunsaltation"
                                        name="feesPerCunsaltation"
                                        required
                                        rules={[{ required: true }]}
                                   >
                                        <Input
                                             type="text"
                                             placeholder="FeesPerCunsaltation"
                                        />
                                   </Form.Item>
                              </Col>
                              <Col xs={24} md={24} lg={8}>
                                   <Form.Item
                                        label="Timings"
                                        name="timings"
                                        required
                                   >
                                        <TimePicker.RangePicker
                                             format={"HH:mm"}
                                        />
                                   </Form.Item>
                              </Col>
                              <Col xs={24} md={24} lg={8}></Col>
                              <Col xs={24} md={24} lg={8}>
                                   <button
                                        className="btn btn-primary form-btn"
                                        type="submit"
                                   >
                                        Submit
                                   </button>
                              </Col>
                         </Row>
                    </Form>
               )}
          </Layout>
     );
};

export default Profile;
