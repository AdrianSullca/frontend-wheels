import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-white text-black py-9">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Wheels. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
