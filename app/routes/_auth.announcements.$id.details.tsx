import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "../data/auth.server";
import AnnouncementDetails from "../components/announcements/AnnouncementDetails";
import { getAnnouncementById } from "../data/announcement.server";
import { toggleFavorite } from "../data/favorites.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authToken = await requireAuth(request);
  const { id } = params;
  const announcementId = Number(id);
  const announcement = await getAnnouncementById(authToken, announcementId);
  
  return json({ announcement });
};

export async function action({ request }: ActionFunctionArgs) {
  const authToken = await requireAuth(request);
  const formData = await request.formData();
  const announcementId = formData.get("announcementId");

  try {
    const isFavorite = await toggleFavorite(authToken, Number(announcementId));
    console.log(isFavorite)
    return json({ success: true, isFavorite });
  } catch (error) {
    return json({ error: "Failure to change favorite" }, { status: 500 });
  }
}

export default function AnnouncementDetailsPage() {
  const { announcement, announcementesAll } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <AnnouncementDetails
        announcement={announcement}
        sameBrandAnnouncements={announcementesAll}
      />
    </div>
  );
}
