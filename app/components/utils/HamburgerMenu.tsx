import { Link } from "@remix-run/react";
import { useState } from "react";

interface HamburgerMenuProps {
  userId: number;
}

export default function HamburgerMenu({ userId }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <svg
        className="w-6 h-6 text-gray-800 md:hidden dark:text-white cursor-pointer"
        onClick={toggleMenu}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="M5 7h14M5 12h14M5 17h14"
        />
      </svg>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform  duration-300 ease-in-out sm:hidden z-50`}
      >
        <div className="flex justify-end p-4">
          <svg
            className="mr-1 w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
            onClick={toggleMenu}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>
        <ul className="flex flex-col items-center justify-center">
          <Link
            to={`/user/${userId}/profile`}
            onClick={toggleMenu}
            className="hover:bg-gray-100 text-center w-full py-3 transition duration-200"
          >
            <li className="text-black">Profile</li>
          </Link>
          <Link
            to={`/user/${userId}/chats`}
            onClick={toggleMenu}
            className="hover:bg-gray-100 text-center w-full py-3 transition duration-200"
          >
            <li className="text-black">Chats</li>
          </Link>
          <Link
            to={`/user/favorites`}
            onClick={toggleMenu}
            className="hover:bg-gray-100 text-center w-full py-3 transition duration-200"
          >
            <li className="text-black">Favorites</li>
          </Link>
          <Link
            to={`/user/${userId}/transactions`}
            onClick={toggleMenu}
            className="hover:bg-gray-100 text-center w-full py-3 transition duration-200"
          >
            <li className="text-black">Transactions</li>
          </Link>
          <Link
            to={`/user/${userId}/settings`}
            onClick={toggleMenu}
            className="hover:bg-gray-100 text-center w-full py-3 transition duration-200"
          >
            <li className="text-black">Settings</li>
          </Link>
          <Link
            to="/logout"
            onClick={toggleMenu}
            className="hover:bg-gray-100 text-center w-full py-3 transition duration-200"
          >
            <li className="text-black">Sign out</li>
          </Link>
        </ul>
      </div>
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 bg-black opacity-50 sm:hidden z-40 cursor-pointer"
          onClick={toggleMenu}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleMenu();
            }
          }}
        />
      )}
    </div>
  );
}
