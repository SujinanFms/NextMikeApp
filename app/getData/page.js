"use client";
import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";

const pages = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    id: 1,
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/getData`, {
          credentials: "include",
        });

        // console.log("response", response);

        if (response.ok) {
          const result = await response.json();
          // console.log("result", result);
          setData(result[0]);
        } else {
          console.error("Server returned an error:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("handleInputChange", name, value, e.target);
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/updateData`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });

      if (response.ok) {
        // Data updated successfully
        console.log("Data updated successfully");
      } else {
        // Handle update failure
        console.error("Failed to update data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Data from Server:</h2>
      {data && (
        <div>
          <p>Username: {data.username}</p>
          <p>Password: {data.password}</p>
          <p>Remember: {data.remember.toString()}</p>
        </div>
      )}

      <form style={{ marginTop: 10 }} onSubmit={handleUpdate}>
        <label>
          Username:
          <Input
            type="text"
            name="username"
            value={updatedData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <Input
            type="password"
            name="password"
            value={updatedData.password}
            onChange={handleInputChange}
          />
        </label>

        <Button style={{ marginTop: 10 }} type="default" htmlType="submit">
          Update Data
        </Button>
      </form>
    </div>
  );
};

export default pages;
