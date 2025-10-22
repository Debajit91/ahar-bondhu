import { NavLink } from "react-router";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "font-bold underline"
        : "text-gray-700 hover:text-semibold"
    }
  >
    {children}
  </NavLink>
);

export default NavItem;
