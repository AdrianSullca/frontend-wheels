import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "../data/auth.server";
import axios from "axios";
import AnnouncementCard from "../components/announcements/AnnouncementCard";
import { Announcement } from "../types/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  const authToken = await requireAuth(request);

  const response = await axios.get("http://localhost:8000/api/announcements", {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  const announcements = response.data.announcements as Announcement[];

  return json({ announcements });
};

export default function AnnouncementsPage() {
  const { announcements } = useLoaderData<typeof loader>();
  return (
    <div className="announcements-container max-w-[1780px] mx-auto">
      <h1>Anuncios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mx-5 sm:mx-7 md:mx-10 gap-6 grid-rows-4">
        {announcements && announcements.length > 0 ? (
          announcements.map((announcement: Announcement) => (
            <AnnouncementCard announcement={announcement} key={announcement.id} />
          ))
        ) : (
          <p>No announcements available.</p>
        )}
      </div>
    </div>
  );
}
