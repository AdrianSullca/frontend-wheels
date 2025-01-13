import { Outlet } from "@remix-run/react";
import Header from "../components/layout/Header";
import { LinksFunction } from "@remix-run/node";
import Footer from "../components/layout/Footer";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/wheels-w-logo.png",
      type: "image/png",
    },
  ];
};

export default function GuestLayout(): JSX.Element {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-custom-body">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
