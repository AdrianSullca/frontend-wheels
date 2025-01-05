import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "../data/auth.server";
import AnnouncementDetails from "../components/announcements/AnnouncementDetails";
import axios from "axios";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authToken = await requireAuth(request);
  const { id } = params;

  const response = await axios.get(
    `http://localhost:8000/api/announcements/${id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    }
  );

  const announcement = response.data.announcement;

  return json({ announcement });
};

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
