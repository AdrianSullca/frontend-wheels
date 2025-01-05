import { ActionFunctionArgs, json, LoaderFunction } from "@remix-run/node";
import AnnouncementForm from "../components/announcements/AnnouncementForm";
import { requireAuth } from "../data/auth.server";
import { uploadAnnouncement } from "../data/announcement.server";
import axios from "axios";

export const loader: LoaderFunction = async ({ request }) => {
  // Comprobar si el usuario está autenticado
  await requireAuth(request);
  // Obtener las marcas de vehiculos
  const brands = await getBrands();
  return json({ brands });
};

export async function action({ request }: ActionFunctionArgs) {
  console.log("Request", request);
  const authToken = await requireAuth(request);
  const formData = await request.formData();
  console.log("form data console log", formData);

  const step = formData.get("step");
  const action = formData.get("action");
  const files = formData.getAll("photos[]");
  console.log("Archivos recibidos photos:", files);

  switch (action) {
    case "next":
      return json({
        step: parseInt(step as string) + 1,
        formData: Object.fromEntries(formData),
      });
    case "prev":
      return json({
        step: Math.max(1, parseInt(step as string) - 1),
        formData: Object.fromEntries(formData),
      });
    case "submit": {
      console.log(
        "Formulario enviado console log submit:",
        Object.fromEntries(formData)
      );
      const result = await uploadAnnouncement(authToken, formData);
      console.log(result);
      return json(result);
    }

    default:
      return json({ errors: { _form: "Acción no válida" } });
  }
}

export default function UploadPage() {
  return (
    <div className="max-w-[1780px] mx-auto text-black">
      <AnnouncementForm />
    </div>
  );
}

export const getBrands = async () => {
  // Obtener las marcas de vehiculos
  const responseBrands = await axios.get(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const brandsData = responseBrands.data.Results.slice(0, 31); // Obtener solo los 31 primeros
  // Mapear las marcas por su nombre
  const brands = brandsData.map(
    (brand: { MakeName: string }) => brand.MakeName
  );
  return brands; // Devolver las marcas
};
