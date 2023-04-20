import Layout from "../../components/Layout";
import React, { useState } from "react";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
     const [doctor, setDoctor] = useState([]);
     const getDoctors = async () => {
          try {
               const res = await axios.get("/api/v1/admin/getAllDoctors", {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem(
                              "token"
                         )}`,
                    },
               });
               if (res.data.success) {
                    setDoctor(res.data.data);
               }
          } catch (error) {}
     };
     const handleAccountStatus = async (record, status) => {
          try {
               const res = await axios.post(
                    "/api/v1/admin/changeAccountStatus",
                    {
                         doctorId: record._id,
                         userId: record.userId,
                         status: status,
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
                    message.success(res.data.message);
                    window.location.reload()
               }
          } catch (error) {
               console.log("error:", error);
               message.error("Something went wrong");
          }
     };

     useState(() => {
          getDoctors();
     }, []);
     const columns = [
          {
               title: "Name",
               dataIndex: "name",
               render: (text, record) => (
                    <span>
                         {record.firstName} {record.lastName}
                    </span>
               ),
          },
          {
               title: "Status",
               dataIndex: "status",
          },
          {
               title: "Phone",
               dataIndex: "phone",
          },

          {
               title: "Actions",
               dataIndex: "actions",
               render: (text, record) => (
                    <div className="d-flex">
                         {record.status === "pending" ? (
                              <button
                                   className="btn btn-success"
                                   onClick={() =>
                                        handleAccountStatus(record, "approved")
                                   }
                              >
                                   Approve
                              </button>
                         ) : (
                              <button className="btn btn-danger">Reject</button>
                         )}
                    </div>
               ),
          },
     ];
     return (
          <Layout>
               <h4 className="m-3 text-center">Doctors</h4>
               <Table columns={columns} dataSource={doctor} />
          </Layout>
     );
};

export default Doctors;
