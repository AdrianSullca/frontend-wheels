import { Link } from "@remix-run/react";
import { Dropdown } from "flowbite-react";
import HamburgerMenu from "../utils/HamburgerMenu";

import {
  ProfileIcon,
  TransactionsIcon,
  SettingsIcon,
  LogoutIcon,
  TextLogoWheelsLink,
} from "../../utils/IconsAndLogo";
import { User } from "../../types/interfaces";

interface AuthHeaderProps {
  user: User;
}

export default function AuthHeader({ user }: AuthHeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full bg-white py-3 px-4 text-white border-b z-50">
      <div className="flex items-center justify-between max-w-[1705px] mx-auto">
        <TextLogoWheelsLink />

        <nav>
          <ul className="flex gap-1">
            <li className="pr-3 hidden sm:block">
              <Link to="/announcements/upload">
                <button className="text-white flex items-center space-x-2 border border-custom-gray bg-custom-gray px-4 py-1 rounded-lg transition-all duration-300 hover:bg-custom-gray-hover hover:border-custom-gray-hover transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="18"
                    height="18"
                    strokeWidth="1.7"
                  >
                    <path d="M12 5l0 14"></path> <path d="M5 12l14 0"></path>{" "}
                  </svg>
                  <span className="text-md">Sell</span>
                </button>
              </Link>
            </li>
            <li className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-md hidden sm:block">
              <Link to="/user/favorites">
                <svg
                  fill="none"
                  stroke="black"
                  width="24"
                  height="24"
                  strokeWidth="1.4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z" />
                </svg>
              </Link>
            </li>
            <li className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-md hidden sm:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24"
                height="24"
                strokeWidth="1.4"
              >
                <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1"></path>
              </svg>
            </li>
            <li className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-md hidden sm:block">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <svg
                    className="w-[25px] h-[25px] text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                }
              >
                <Dropdown.Header>
                  <span className="block truncate text-sm font-medium">
                    {user ? user.name : "User"}
                  </span>
                </Dropdown.Header>
                <Link to={`/user/${user.id}/profile`} className="w-full">
                  <Dropdown.Item icon={ProfileIcon}>
                    <span className="ml-1">Profile</span>
                  </Dropdown.Item>
                </Link>
                <Dropdown.Item icon={TransactionsIcon}>
                  <span className="ml-1">Transactions</span>
                </Dropdown.Item>
                <Link to={"/user/settings"}>
                  <Dropdown.Item icon={SettingsIcon}>
                    <span className="ml-1">Settings</span>
                  </Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Link to="/logout">
                  <Dropdown.Item icon={LogoutIcon}>
                    <span className="ml-1">Sign out</span>
                  </Dropdown.Item>
                </Link>
              </Dropdown>
            </li>
            <li className="sm:hidden hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-md">
              <HamburgerMenu userId={user.id} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
