"use client";
import React from "react";
import { Tabbars } from "../components/tabbar";
import { StickyScroll } from "./components/StickyScroll";

const Page = () => {
  // สร้างข้อมูลสำหรับแต่ละแท็บ
  const tab1Content = [
    { title: "Item 1", description: "Description for Item 1" },
    { title: "Item 2", description: "Description for Item 2" },
    { title: "Item 3", description: "Description for Item 3" },
    { title: "Item 4", description: "Description for Item 4" },
    { title: "Item 5", description: "Description for Item 5" },
  ];

  // สร้างข้อมูล tabs
  const tabs = [
    {
      title: "Tab 1",
      value: "tab1",
      content: <StickyScroll content={tab1Content} />,
    },
    {
      title: "Tab 2",
      value: "tab2",
      content: <StickyScroll content={tab1Content} />,
    },
    {
      title: "Tab 3",
      value: "tab3",
      content: <StickyScroll content={tab1Content} />,
    },
  ];

  return (
    <div>
      {/* ส่ง props ไปยัง <Tabs /> */}
      <Tabbars
        tabs={tabs}
        containerClassName="your-container-class"
        activeTabClassName="your-active-tab-class"
        tabClassName="your-tab-class"
        contentClassName="your-content-class"
      />
    </div>
  );
};

export default Page;
