import {
  ActionFunctionArgs,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import AnnouncementForm from "../components/announcements/AnnouncementForm";
import { getUserByToken, requireAuth } from "../data/auth.server";
import { getBrands, uploadAnnouncement } from "../data/announcement.server";

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
      await uploadAnnouncement(authToken, formData);
      const authUser = await getUserByToken(request);
      return redirect(`/user/${authUser.id}/profile`);
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
