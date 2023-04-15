import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, TimePicker } from "antd";

const ApplyDoctor = () => {
     const handleFinish = (values) => {
          console.log(values);
     };
     return (
          <Layout>
               <h4 className="text-center">Apply Doctor</h4>
               <Form layout="vertical" onFinish={handleFinish} className="m-3">
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
                                   name="lastname"
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
                                   <Input type="text" placeholder="Phone" />
                              </Form.Item>
                         </Col>
                         <Col xs={24} md={24} lg={8}>
                              <Form.Item
                                   label="Email"
                                   name="email"
                                   required
                                   rules={[{ required: true }]}
                              >
                                   <Input type="text" placeholder="Email " />
                              </Form.Item>
                         </Col>
                         <Col xs={24} md={24} lg={8}>
                              <Form.Item
                                   label="Website"
                                   name="website"
                                   required
                                   rules={[{ required: true }]}
                              >
                                   <Input type="text" placeholder="Website" />
                              </Form.Item>
                         </Col>
                         <Col xs={24} md={24} lg={8}>
                              <Form.Item
                                   label="Address"
                                   name="address"
                                   required
                                   rules={[{ required: true }]}
                              >
                                   <Input type="text" placeholder="Address" />
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
                                   <TimePicker.RangePicker format={"HH:mm"} />
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
                         {/* <Col xs={24} md={24} lg={8}>
                              <Form.Item
                                   label="Address"
                                   name="address"
                                   required
                                   rules={[{ required: true }]}
                              >
                                   <Input type="text" placeholder="Address" />
                              </Form.Item>
                         </Col> */}
                    </Row>
               </Form>
          </Layout>
     );
};

export default ApplyDoctor;
