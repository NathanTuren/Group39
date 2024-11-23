import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdOutlineSpaceDashboard, MdHistory, MdEvent } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import '../../app.css';

const Sidebar = (role) => {
  const commonMenus = [
      { name: "Dashboard", link: "/userDashboard", icon: MdOutlineSpaceDashboard },
      { name: "Notifications", link: "/notifications", icon: IoNotificationsOutline },
      { name: "User Settings", link: "/accountSettings", icon: RiSettings4Line },
      { name: "Logout", link: "/", icon: AiOutlineUser, margin: true },
  ];
  role="admin";
  const roleSpecificMenus = role === "admin"
      ? [
        { name: "Volunteer History", link: "/volunteerHistoryAdmin", icon: MdHistory },
        { name: "Event Management", link: "/eventManagement", icon: MdEvent},]
      : [{ name: "My History", link: "/volunteerHistory", icon: MdHistory }];

  const menus = [...roleSpecificMenus, ...commonMenus];

    const [open, setOpen] = useState(true);

    return (
        <section className="flex gap-6">
      <div
        className={`bg-white min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-900 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenu
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
    )
}

export default Sidebar;