import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table } from "antd";

const User = () => {
     const [users, setUsers] = useState([]);
     const getUsers = async () => {
          try {
               const res = await axios.get("/api/v1/admin/getAllUsers", {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem(
                              "token"
                         )}`,
                    },
               });
               if (res.data.success) {
                    setUsers(res.data.data);
               }
          } catch (error) {}
     };
     useState(() => {
          getUsers();
     }, []);
     const columns = [
          {
               title: "Name",
               dataIndex: "name",
          },
          {
               title: "Email",
               dataIndex: "email",
          },
          {
               title: "Doctor",
               dataIndex: "isDoctor",
               render: (text, record) => (
                    <span> {record.isDoctor ? "Yes" : "No"}</span>
               ),
          },
          {
               title: "Actions",
               dataIndex: "action",
               render: (text, record) => (
                    <div className="d-flex">
                         <button className="btn btn-danger">Block</button>
                    </div>
               ),
          },
     ];
     return (
          <Layout>
               <h4 className="text-center m-2">User List</h4>
               <Table columns={columns} dataSource={users} />
          </Layout>
     );
};

export default User;
