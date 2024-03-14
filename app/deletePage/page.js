"use client";
import React, { useState, useEffect } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import axios from "axios";

const { Column, ColumnGroup } = Table;

const pages = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getData`);
        // console.log("response", response);
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //   console.log("data", data);

  const confirm = async (record) => {
    console.log(record.id);

    try {
      const response = await axios.delete(`${apiUrl}/api/deleteData`, {
        data: { id: record.id },
      });
      if (response.status === 200) {
        message.success("Click on Yes");
        window.location.reload();
      } else {
        console.error("Failed:", response.statusText);
        message.error("ไม่สำเร็จ", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <Table dataSource={data} rowKey="id">
      <Column title="id" dataIndex="id" key="id" />
      <ColumnGroup title="Name">
        <Column title="username" dataIndex="username" key="username" />
        <Column title="password" dataIndex="password" key="password" />
      </ColumnGroup>

      <Column
        title="remember"
        dataIndex="remember"
        render={(remember) => (remember ? "Yes" : "No")}
      />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            {/* <a>Invite {record.lastName}</a>      */}
            {/* <a>Delete</a> */}

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => confirm(record)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
  );
};

export default pages;
