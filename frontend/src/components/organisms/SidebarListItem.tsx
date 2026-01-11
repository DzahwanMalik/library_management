import { NavLink } from "react-router";
import type { SidebarIcon } from "../../types/sidebarIcon.type";

const SidebarListItem = ({ label, icon, path }: SidebarIcon) => {
  const Icon = icon;

  return (
    <li className="relative">
      <NavLink
        to={path}
        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
        data-tip={label}
      >
        <Icon className="my-1.5 inline-block size-4" />
        <span className="is-drawer-close:hidden whitespace-nowrap">
          {label}
        </span>
      </NavLink>
    </li>
  );
};

export default SidebarListItem;
