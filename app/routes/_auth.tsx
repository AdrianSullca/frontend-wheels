import { Outlet } from "@remix-run/react";
import Header from "../components/layout/Header";

export default function AuthLayout(): JSX.Element {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-custom-body">
        <Outlet />
      </main>
      <Header />
    </>
  );
}
