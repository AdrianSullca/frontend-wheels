import { ActionFunctionArgs, json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { requireAuth } from "../data/auth.server";
import { useLoaderData } from "@remix-run/react";
import { getUserFavorites, toggleFavorite } from "../data/favorites.server";
import FavoritesList from "../components/favorites/FavoritesList";

export const meta: MetaFunction = () => {
  return [
    { title: "Favorites list" },
    { name: "description", content: "User favorites list" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const authToken = await requireAuth(request);
  const favorites = await getUserFavorites(authToken);
  return json({ favorites });
};

export async function action({ request }: ActionFunctionArgs) {
  const authToken = await requireAuth(request);
  const formData = await request.formData();
  const announcementId = formData.get("announcementId");

  try {
    await toggleFavorite(authToken, Number(announcementId));
    return json({ success: true });
  } catch (error) {
    return json({ error: "Failed to remove favorite" }, { status: 500 });
  }
}

export default function UserFavoritesPage() {
  const { favorites } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-[1400px] flex flex-col gap-4 mx-auto text-black px-10 pt-6">
      <FavoritesList favorites={favorites} />
    </div>
  );
}
