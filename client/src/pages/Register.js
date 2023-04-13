import React from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/features/alertSlice";

import axios from "axios";
const Register = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const onFinishHandler = async (values) => {
          try {
               dispatch(showLoading());
               const res = await axios.post("/api/v1/user/register", values);
               dispatch(hideLoading());

               if (res.data.success) {
                    message.success("Register Successfully!");
                    navigate("/login");
               } else {
                    message.error(res.data.message);
               }
          } catch (error) {
               dispatch(hideLoading());
               console.log("error:", error);
               message.error(`Somthing Went Wrong`);
          }
     };

     return (
          <>
               <div className="form-container">
                    <Form
                         className="register-form"
                         layout="vertical"
                         onFinish={onFinishHandler}
                    >
                         <h3 className="text-center">Register Form</h3>
                         <Form.Item label="Name" name={"name"}>
                              <Input type="text" required />
                         </Form.Item>
                         <Form.Item label="Email" name={"email"}>
                              <Input type="email" required />
                         </Form.Item>
                         <Form.Item label="Password" name={"password"}>
                              <Input type="Password" required />
                         </Form.Item>
                         <Link to={"/login"} className="m-2">
                              Already user login hear
                         </Link>
                         <button className="btn btn-primary" type="submit">
                              Register
                         </button>
                    </Form>
               </div>
          </>
     );
};

export default Register;
