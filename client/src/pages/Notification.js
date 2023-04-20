import React from "react";
import Layout from "../components/Layout";
import { Tabs, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const { user } = useSelector((state) => state.user);
     const handleMarkAll = async () => {
          try {
               dispatch(showLoading());
               const res = await axios.post(
                    `/api/v1/user/get-all-notification`,
                    { userId: user._id },
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
               } else {
                    message.error(res.data.message);
               }
          } catch (error) {
               dispatch(hideLoading);
               console.log("error:", error);
               message.error("somthing went wrong");
          }
     };
     const deleteMarkAll = async () => {
          try {
               dispatch(showLoading());
               const res = await axios.post(
                    `/api/v1/user/delete-all-notification`,
                    {
                         userId: user._id,
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
               } else {
                    message.error(res.data.message);
               }
          } catch (error) {
               console.log("error:", error);
               message.error("Something Went Wrong In Notifications");
          }
     };
     return (
          <Layout>
               <h4 className="m-2 p-3 text-center">Notification</h4>
               <Tabs>
                    <Tabs.TabPane tab="unRead" key={0}>
                         <div className="d-flex justify-content-end">
                              <h5 className="p-2" onClick={handleMarkAll}>
                                   Mark All Read
                              </h5>
                         </div>
                    </Tabs.TabPane>
                    {user?.notifacation?.map((msg, index) => (
                         <div
                              key={index}
                              className="card"
                              style={{ cursor: "pointer" }}
                         >
                              <div
                                   className="card-text"
                                   onClick={() => navigate(msg.onClickPath)}
                              >
                                   {msg.message}
                              </div>
                         </div>
                    ))}
                    <Tabs.TabPane tab="Read" key={1}>
                         <div className="d-flex justify-content-end">
                              <h5
                                   className="p-2 text-primary"
                                   style={{ cursor: "pointer" }}
                                   onClick={deleteMarkAll}
                              >
                                   Delete All Read
                              </h5>
                         </div>
                         {user?.seennotification?.map((msg, index) => (
                              <div
                                   key={index}
                                   className="card"
                                   style={{ cursor: "pointer" }}
                              >
                                   <div
                                        className="card-text"
                                        onClick={() =>
                                             navigate(msg.onClickPath)
                                        }
                                   >
                                        {msg.message}
                                   </div>
                              </div>
                         ))}
                    </Tabs.TabPane>
               </Tabs>
          </Layout>
     );
};

export default Notification;
