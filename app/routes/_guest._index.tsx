import { redirect } from "@remix-run/react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { sessionStorage } from "../data/auth.server";

export const meta: MetaFunction = () => {
  return [{ title: "Wheels" }, { name: "description", content: "Home page" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  if (authToken) {
    return redirect("/announcements");
  }

  return null;
};

export default function HomePage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/home.jpg)" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center md:items-start md:justify-center bg-black bg-opacity-50 text-white px-6">
        <div className="text-center md:text-left max-w-lg md:pl-9">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Renew your car or sell yours!
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Find the best deals to buy or sell vehicles.
          </p>
          <button
            onClick={() => (window.location.href = "/auth?mode=login")}
            className="px-10 py-3 bg-white text-black hover:text-gray-600 font-semibold rounded-lg shadow-md"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
