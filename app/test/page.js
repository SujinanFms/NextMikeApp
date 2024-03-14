"use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function Page() {
//   const [message, setMessage] = useState("");
//   const [text, setText] = useState("");
//   const [description, setDescription] = useState("");

// function getContentInfo() {
//   axios
//     .get("http://localhost:8080/items", { crossdomain: true })
//     .then((response) => {
//       console.log("response", response);
//       setText(response.data.id);
//       setDescription(response.data.name);
//     })
//     .catch((error) => {
//       console.error("Error fetching content:", error);
//     });
// }


//   function clearContent() {
//     setText("");
//     setDescription("");
//   }

//   return (
//     <div>
//       <button onClick={getContentInfo}>Click show text</button>&nbsp;&nbsp;
//       <button onClick={clearContent}>Clear</button>
//       <h1>{text}</h1>
//       <h4>{": " + description}</h4>
//     </div>
//   );
// }

// pages/index.js


import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';

const Home = () => {
  const [apiResponse, setApiResponse] = React.useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const onFinish = async (values) => {
       // Get the API URL from the environment variable
    
    // Generate a unique ID (you can use a library like uuid for this)
    const id = 1; // replace this with your actual method to generate an ID
  
    // Add the generated id to the values
    const updatedValues = { ...values, id };
  
    console.log("updatedValues", updatedValues);
  
    // Now you can make the API call with the updated values
    try {
      const response = await axios.post(`${apiUrl}/api/submitForm`, updatedValues);
      if (response.status === 200) {
        const result = response.data;
        setApiResponse(result);
      } else {
        console.error('Failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button  type="default"  htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {apiResponse && (
        <div style={{ marginTop: '20px' }}>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;


