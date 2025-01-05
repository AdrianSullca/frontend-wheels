import { LoaderFunction } from "@remix-run/node";
import { logout } from "../data/auth.server"; // Ajusta la ruta según tu estructura de archivos

export const loader: LoaderFunction = async ({ request }) => {
  return await logout(request);
};

export default function Logout() {
  return null; // Esta ruta no renderiza nada, solo maneja la logica de logout
}