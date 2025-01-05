import { Link } from "@remix-run/react";
import { TextLogoWheelsLink } from "../../utils/IconsAndLogo";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white py-3 px-4 text-white border-b z-50">
      <div className="flex items-center justify-between max-w-[1705px] mx-auto">
        <TextLogoWheelsLink />

        <nav>
          <ul className="flex gap-3">
            <li className="">
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
            <li>
              <Link to="/auth?mode=login">
                <button className="text-black border border-custom-gray px-5 py-1 rounded-lg transition-all duration-300 hover:border-custom-gray-hover hover:text-custom-gray-hover transition-colors">
                  <span className="font-medium">Sign in</span>
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}