import { Outlet } from "react-router";
import Navbar from "../components/organisms/Navbar";
import SidebarListItem from "../components/organisms/SidebarListItem";
import { sidebarIcon } from "../constants/sidebarIcons";
import { useState } from "react";

const MainLayout = () => {
  const [theme, setTheme] = useState<string>("light");

  return (
    <div className="drawer lg:drawer-open" data-theme={theme}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <Navbar setTheme={setTheme} />
        {/* Page content here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {sidebarIcon.map((item) => (
              <SidebarListItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                path={item.path}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
