import { Link } from "@remix-run/react";
import { Dropdown } from "flowbite-react";
import { LogoutIcon, TextLogoWheelsLink } from "../../utils/IconsAndLogo";
import { User } from "../../types/interfaces";
import HamburgerMenuAdmin from "../utils/HamburgerMenuAdmin";

interface AuthHeaderProps {
  user: User;
}

export default function AdminHeader({ user }: AuthHeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full bg-white py-3 px-4 text-white border-b z-50">
      <div className="flex items-center justify-between max-w-[1705px] mx-auto">
        <TextLogoWheelsLink />

        <nav>
          <ul className="flex gap-1">
            <li className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-md hidden sm:block">
              <Link to="/manage/users">
                <span className="text-black px-3">Manage users</span>
              </Link>
            </li>
            <li className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-md hidden sm:block">
              <Link to="/manage/announcements">
                <span className="text-black px-3">Manage announcements</span>
              </Link>
            </li>
            <li className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-md hidden sm:block">
              <Link to="/manage/reviews">
                <span className="text-black px-3">Manage reviews</span>
              </Link>
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
                <Link to="/logout">
                  <Dropdown.Item icon={LogoutIcon}>
                    <span className="ml-1">Sign out</span>
                  </Dropdown.Item>
                </Link>
              </Dropdown>
            </li>
            <li className="sm:hidden hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-md">
              <HamburgerMenuAdmin />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
