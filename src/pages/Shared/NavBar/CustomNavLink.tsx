import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
      }
      onClick={onClick}
    >
      {label}
    </NavLink>
);
  
export default CustomNavLink;