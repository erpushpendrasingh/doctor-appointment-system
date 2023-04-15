import React from "react";
import Layout from "../components/Layout";
import { Form } from "antd";

const ApplyDoctor = () => {
     const handleFinish = () => {};
     return (
          <Layout>
               <h1 className="text-center">Apply Doctor</h1>
               <Form layout="vertical" onFinish={handleFinish}></Form>
          </Layout>
     );
};

export default ApplyDoctor;
