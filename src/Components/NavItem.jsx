import { NavLink } from "react-router";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "text-primary font-semibold underline"
        : "text-gray-700 hover:text-primary"
    }
  >
    {children}
  </NavLink>
);

export default NavItem;
