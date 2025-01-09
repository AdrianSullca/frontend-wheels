import { ActionFunctionArgs, json, LoaderFunction } from "@remix-run/node";
import { getUserByToken, requireAuth } from "../data/auth.server";
import AnnouncementFormUpdate from "../components/announcements/AnnouncementFormUpdate";
import {
  getAnnouncementById,
  getBrands,
  updateAnnouncement,
  validateErrorsFormAnnouncementUpdate,
} from "../data/announcement.server";
import { useLoaderData } from "@remix-run/react";
import { getUserAnnouncements } from "../data/user.server";
import { Announcement } from "../types/interfaces";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authToken = await requireAuth(request);
  const userAuth = await getUserByToken(request);

  const userAnnouncements = await getUserAnnouncements(authToken, userAuth.id);
  const announcementIds = userAnnouncements.map(
    (announcement: Announcement) => announcement.id
  );

  const { id } = params;
  const announcementId = Number(id);

  if (!announcementIds.includes(announcementId)) {
    throw json(
      { error: "You are not authorized to access this announcement." },
      { status: 403 }
    );
  }

  const announcement = await getAnnouncementById(authToken, announcementId);
  const brands = await getBrands();
  const vehicleTypes = ["Sport", "Sedan", "Van", "Other"];
  const years = Array.from({ length: 25 }, (_, i) => 2000 + i);

  return json({ announcement, brands, vehicleTypes, years });
};

export async function action({ params, request }: ActionFunctionArgs) {
  const authToken = await requireAuth(request);
  const formData = await request.formData();

  const errors = validateErrorsFormAnnouncementUpdate(formData);

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const { id } = params;
  const announcementId = Number(id);

  await updateAnnouncement(authToken, announcementId, formData);

  return json({ message: "Announcement successfully updated" });
}

export function ErrorBoundary() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-black">Not authorized</h1>
        <p className="text-black mt-4">
          No permission to edit this announcemet
        </p>
      </div>
    </div>
  );
}

export default function AnnouncementUpdatePage() {
  const { announcement } = useLoaderData<typeof loader>();

  return (
    <div>
      <AnnouncementFormUpdate announcement={announcement} />
    </div>
  );
}
