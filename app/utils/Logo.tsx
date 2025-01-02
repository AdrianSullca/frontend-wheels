import { Link } from "@remix-run/react";
import React from "react";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <img
        src="../../../public/wheels-text-logo.png"
        alt="Logo"
        className="w-32 h-auto"
      />
    </Link>
  );
};

export default Logo;
