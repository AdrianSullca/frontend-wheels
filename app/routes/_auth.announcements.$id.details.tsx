import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import {
  redirect,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { getUserByToken, requireAuth } from "../data/auth.server";
import AnnouncementDetails from "../components/announcements/AnnouncementDetails";
import {
  getAnnouncementById,
  deleteAnnouncement,
} from "../data/announcement.server";
import { toggleFavorite } from "../data/favorites.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  try {
    const authToken = await requireAuth(request);
    const { id } = params;
    const announcementId = Number(id);
    const announcement = await getAnnouncementById(authToken, announcementId);
    const userAuth = await getUserByToken(request);
    return json({ announcement, userAuth });
  } catch (error) {
    if (error instanceof Error) {
      throw new Response(error.message || "An unexpected error occurred", {
        status: 404,
      });
    } else {
      throw new Response("An unexpected error occurred", {
        status: 404,
      });
    }
  }
};

export async function action({ request }: ActionFunctionArgs) {
  const authToken = await requireAuth(request);
  const authUser = await getUserByToken(request);
  const formData = await request.formData();

  if (request.method === "POST") {
    const announcementId = formData.get("announcementId");
    try {
      const isFavorite = await toggleFavorite(
        authToken,
        Number(announcementId)
      );
      return json({ success: true, isFavorite });
    } catch (error) {
      return json({ error: "Failure to change favorite" }, { status: 500 });
    }
  }

  if (request.method === "DELETE") {
    console.log("entramos al delete");
    const announcementId = formData.get("announcementId");
    try {
      const status = await deleteAnnouncement(
        authToken,
        Number(announcementId),
        authUser
      );
      if (status == 200) {
        return redirect(`/user/${authUser.id}/profile`);
      } else {
        return json(
          { error: "Error deleting announcement" },
          { status: status }
        );
      }
    } catch (error) {
      return json({ error: "Error deleting announcement" }, { status: 500 });
    }
  }
}

export default function AnnouncementDetailsPage() {
  const { announcement, announcementesAll, userAuth } =
    useLoaderData<typeof loader>();

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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-custom-body">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">{error.status}</h1>
          <p className="text-black">{error.data}</p>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-custom-body">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Uh oh ...</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return <h1>Unknown Error</h1>;
}
