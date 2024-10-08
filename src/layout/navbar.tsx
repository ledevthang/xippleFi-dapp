import { APP_ROUTE } from "@/types";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <ul className="flex cursor-pointer items-center gap-7 font-semibold text-white">
      <NavLink
        to={APP_ROUTE.HOME}
        className={({ isActive }) => (isActive ? "text-[#69e2db]" : "")}
      >
        <li className="hover:text-[#69e2db]">LENDING</li>
      </NavLink>
      <NavLink
        to={APP_ROUTE.STAKE}
        className={({ isActive }) => (isActive ? "text-[#69e2db]" : "")}
      >
        <li className="hover:text-[#69e2db]">STAKE</li>
      </NavLink>
      <NavLink
        to={APP_ROUTE.SWAP}
        className={({ isActive }) => (isActive ? "text-[#69e2db]" : "")}
      >
        <li className="hover:text-[#69e2db]">SWAP</li>
      </NavLink>
    </ul>
  );
}

export default Navbar;
