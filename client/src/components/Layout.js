import React from "react";
import "../styles/LayoutStyles.css";
import { Badge, Image, message } from "antd";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Layout = ({ children }) => {
     const navigate = useNavigate();
     const location = useLocation();
     const { user } = useSelector((state) => state.user);
     const handleLogout = () => {
          localStorage.clear();
          message.success("Logout Successfully");
          navigate("/login");
     };
     //rendring menu list
     const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;
     return (
          <div className="main">
               <div className="layout">
                    <div className="sidebar">
                         <div className="logo">
                              <Image src="./appLogo.png" alt="logo.img" />
                              <hr />
                         </div>
                         <div className="menu">
                              {SidebarMenu?.map((menu, index) => {
                                   const isActive =
                                        location.pathname === menu.path;
                                   return (
                                        <div
                                             key={index}
                                             className={`menu-item ${
                                                  isActive && "active"
                                             }`}
                                        >
                                             <i className={menu.icon}></i>
                                             <Link to={menu.path}>
                                                  {menu.name}
                                             </Link>
                                        </div>
                                   );
                              })}
                              <div
                                   className={`menu-item `}
                                   onClick={handleLogout}
                              >
                                   <i className="fa-sharp fa-solid fa-right-from-bracket"></i>
                                   <Link to={"/login"}>Logout</Link>
                              </div>
                         </div>
                    </div>
                    <div className="content">
                         <div className="header">
                              <div className="header-content">
                                   <Badge
                                        count={
                                             user && user?.notifacation.length
                                        }
                                   >
                                        <i className="fa-sharp fa-solid fa-bell"></i>
                                   </Badge>
                                   <Link to={"/profile"}>{user?.name}</Link>
                              </div>
                         </div>
                         <div className="body">{children}</div>
                    </div>
               </div>
          </div>
     );
};

export default Layout;
