import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import moment from "moment";
const Appointments = () => {
     const [appointments, setAppointments] = useState([]);
     const getAppointments = async () => {
          try {
               const res = await axios.get("/api/v1/user/user-appointments", {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem(
                              "token"
                         )}`,
                    },
               });
               if (res.data.success) {
                    setAppointments(res.data.data);
               }
          } catch (error) {
               console.log("error:", error);
          }
     };
     useEffect(() => {
          getAppointments();
     }, []);
     const columns = [
          {
               title: "ID",
               dataIndex: "_id",
          },
          {
               title: "Name",
               dataIndex: "name",
               render: (text, record) => (
                    <span>
                         {record.doctorId.firstName} {record.doctorId.lastName}
                    </span>
               ),
          },
          {
               title: "Phone",
               dataIndex: "phone",
               render: (text, record) => <span>{record.doctorId.phone}</span>,
          },
          {
               title: "Date and time",
               dataIndex: "date",
               render: (text, record) => (
                    <span>
                         {moment(record.date).format("DD-MM-YYYY")}
                         {moment(record.time).format("HH-mm")}
                    </span>
               ),
          },
          {
               title: "Status",
               dataIndex: "date",
               render: (text, record) => (
                    <span>
                         {moment(record.date).format("DD-MM-YYYY")}
                         {moment(record.time).format("HH-mm")}
                    </span>
               ),
          },
     ];
     return (
          <Layout>
               <h4 className="text-center ">Appointment List</h4>
          </Layout>
     );
};

export default Appointments;
