"use client";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Space, Avatar, Drawer } from "antd";
import { isMobile, isMobileOnly } from "react-device-detect";
import Link from "next/link";
const { Header, Sider, Content } = Layout;
const Navbar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setCollapsed(isMobile);

  //     const handleResize = () => {
  //       setCollapsed(isMobile);
  //     };

  //     window.addEventListener("resize", handleResize);

  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCollapsed(isMobile);
      const handleResize = () => {
        setCollapsed(isMobile);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  //RegisterForm
  const items = [
    getItem(<Link href={`/test`}>Navigation One</Link>, "1", <MailOutlined />),
    getItem(
      <Link href={`/getData`}>Navigation Two</Link>,
      "2",
      <CalendarOutlined />
    ),
    getItem("Navigation Two", "sub1", <AppstoreOutlined />, [
      getItem(<Link href={`/deletePage`}>Option 3</Link>, "3"),
      getItem(<Link href={`/register/registerform`}>Option 4</Link>, "4"),
      getItem("Submenu", "sub1-2", null, [
        getItem("Option 5", "5"),
        getItem("Option 6", "6"),
      ]),
    ]),
    getItem("Navigation Three", "sub2", <SettingOutlined />, [
      getItem(<Link href={`/headpage`}>Option 7</Link>, "7"),
      getItem("Option 8", "8"),
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
    ]),
    getItem(
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design
      </a>,
      "link",
      <LinkOutlined />
    ),
  ];

  // const items = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  //   (icon, index) => {
  //     const key = String(index + 1);
  //     return {
  //       key: `sub${key}`,
  //       icon: React.createElement(icon),

  //       label: `subnav ${key}`,
  //       children: new Array(4).fill(null).map((_, j) => {
  //         const subKey = index * 4 + j + 1;
  //         return {
  //           key: subKey,
  //           label: (
  //             <Link href={`/test`} key={subKey}>
  //               {`option${subKey}`}
  //             </Link>
  //           ),
  //         };
  //       }),
  //     };
  //   }
  // );

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout style={{ height: "100dvh" }}>
      {/*ไม่แสดง Sider  Mobile */}
      {isMobile && collapsed ? null : (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo-vertical" />
          <Space wrap size={16}>
            <Avatar
              shape="square"
              size={48}
              icon={<UserOutlined />}
              className="m-2"
            />
            {!collapsed && (
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#ffffff",
                  width: 100,
                }}
              >
                Firstname L.
              </div>
            )}
          </Space>

          {/* <Drawer
            placement="left"
            title="Basic Drawer"
            onClose={onClose}
            open={collapsed}
          >
              <Menu
            //   style={{ height: "100dvh" }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
          </Drawer> */}

          <Menu
            //   style={{ height: "100dvh" }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
      )}

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            // onClick={showDrawer}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto", // เพิ่ม overflow เพื่อให้มีการเลื่อน
           // maxHeight: "500px", // ระบุความสูงสูงสุดที่ต้องการ
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Navbar;

// return (
//     <>
//       <Layout>
//         {isMobile && !collapsed ? (
//           <Layout>
//             <Header
//               style={{
//                 padding: 0,
//                 background: colorBgContainer,
//               }}
//             >
//               <Button
//                 type="text"
//                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//                 onClick={() => setCollapsed(!collapsed)}
//                 style={{
//                   fontSize: "16px",
//                   width: 64,
//                   height: 64,
//                 }}
//               />
//               <Space wrap>
//                 <Avatar
//                   shape="square"
//                   size={48}
//                   icon={<UserOutlined />}
//                   className="m-2"
//                 />
//                 {!collapsed && (
//                   <p
//                     style={{
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       color: "#ffffff",
//                       width: 100,
//                     }}
//                   >
//                     Firstname L.
//                   </p>
//                 )}
//               </Space>
//             </Header>
//             <Content
//               style={{
//                 margin: "24px 16px",
//                 padding: 24,
//                 minHeight: 280,
//                 background: colorBgContainer,
//                 borderRadius: borderRadiusLG,
//               }}
//             >
//               {children}
//             </Content>
//           </Layout>
//         ) : (
//           <>
//             {" "}
//             <Sider trigger={null} collapsible collapsed={collapsed}>
//               {/* Sider content */}
//               <div className="logo-vertical" />
//               <Space wrap>
//                 <Avatar
//                   shape="square"
//                   size={48}
//                   icon={<UserOutlined />}
//                   className="m-2"
//                 />
//                 {!collapsed && (
//                   <p
//                     style={{
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       color: "#ffffff",
//                       width: 100,
//                     }}
//                   >
//                     Firstname L.
//                   </p>
//                 )}
//               </Space>
//               <Menu
//                 style={{ height: "100vh" }}
//                 theme="dark"
//                 mode="inline"
//                 defaultSelectedKeys={["1"]}
//                 items={items}
//               />
//             </Sider>
//             <Layout>
//               <Header
//                 style={{
//                   padding: 0,
//                   background: colorBgContainer,
//                 }}
//               >
//                 <Button
//                   type="text"
//                   icon={
//                     collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
//                   }
//                   onClick={() => setCollapsed(!collapsed)}
//                   style={{
//                     fontSize: "16px",
//                     width: 64,
//                     height: 64,
//                   }}
//                 />
//               </Header>
//               <Content
//                 style={{
//                   margin: "24px 16px",
//                   padding: 24,
//                   minHeight: 280,
//                   background: colorBgContainer,
//                   borderRadius: borderRadiusLG,
//                 }}
//               >
//                 {children}
//               </Content>
//             </Layout>
//           </>
//         )}
//       </Layout>
//     </>
//   );
