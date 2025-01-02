import { redirect, LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sessionStorage } from "../data/auth.server";
import axios from "axios";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");
  console.log(authToken);
  if (!authToken) {
    return redirect("/auth?mode=login");
  }

  const response = await axios.get("http://localhost:8000/api/announcements", {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  console.log(response.data);

  // Aquí puedes cargar los datos necesarios para la página de anuncios
  return json({ message: "Bienvenido a la página de anuncios" });
};

export default function Announcements() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-black">Anuncios</h1>
      <p>{data.message}</p>
    </div>
  );
}
