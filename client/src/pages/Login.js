import React from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/features/alertSlice";
import axios from "axios";
const Login = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const onFinishHandler = async (values) => {
          try {
               dispatch(showLoading());
               const res = await axios.post("/api/v1/user/login", values);
               dispatch(hideLoading());

               if (res.data.success) {
                    message.success("Login Successfully");
                    localStorage.setItem("token", res.data.token);
                    navigate("/");
               } else {
                    message.error(res.data.message);
               }
          } catch (error) {
               dispatch(hideLoading());
               console.log("error:", error);
               message.error("something went wrong");
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
                         <h3 className="text-center">Login Form</h3>

                         <Form.Item label="Email" name={"email"}>
                              <Input type="email" required />
                         </Form.Item>
                         <Form.Item label="Password" name={"password"}>
                              <Input type="Password" required />
                         </Form.Item>
                         <Link to={"/register"} className="m-2">
                              Not a user Register hear
                         </Link>
                         <button className="btn btn-primary" type="submit">
                              Register
                         </button>
                    </Form>
               </div>
          </>
     );
};

export default Login;
