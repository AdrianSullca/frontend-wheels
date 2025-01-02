import { NavLink } from "@remix-run/react";
import Logo from "../../utils/Logo";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between bg-white py-3 px-4">
      <Logo />

      <nav>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/auth?mode=login">
              <button className="text-black border border-custom-gray px-5 py-2 rounded-xl transition-all duration-300 hover:border-custom-gray-hover hover:text-custom-gray-hover transition-colors">
                <span className="font-medium">Sign in</span>
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">
              <button className="text-white flex items-center space-x-2 border border-custom-gray bg-custom-gray px-5 py-2 rounded-xl transition-all duration-300 hover:bg-custom-gray-hover hover:border-custom-gray-hover transition-colors">
                <img src="../../../public/add.svg" alt="" />
                <span className="">Sell</span>
              </button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
