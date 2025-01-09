import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserByToken, requireAuth } from "../data/auth.server";
import AnnouncementDetails from "../components/announcements/AnnouncementDetails";
import { getAnnouncementById } from "../data/announcement.server";
import { toggleFavorite } from "../data/favorites.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authToken = await requireAuth(request);
  const { id } = params;
  const announcementId = Number(id);
  const announcement = await getAnnouncementById(authToken, announcementId);
  const userAuth = await getUserByToken(request);
  console.log(announcement)
  console.log(userAuth)
  return json({ announcement, userAuth });
};

export async function action({ request }: ActionFunctionArgs) {
  const authToken = await requireAuth(request);
  const formData = await request.formData();
  const announcementId = formData.get("announcementId");

  try {
    const isFavorite = await toggleFavorite(authToken, Number(announcementId));
    console.log(isFavorite);
    return json({ success: true, isFavorite });
  } catch (error) {
    return json({ error: "Failure to change favorite" }, { status: 500 });
  }
}

export default function AnnouncementDetailsPage() {
  const { announcement, announcementesAll, userAuth } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <AnnouncementDetails
        announcement={announcement}
        userAuth={userAuth}
        sameBrandAnnouncements={announcementesAll}
      />
    </div>
  );
}
