import { json, LoaderFunction } from "@remix-run/node";
import { requireAuth } from "../data/auth.server";
import { useLoaderData } from "@remix-run/react";
import UserProfile from "../components/user/UserProfile";
import { getUserAnnouncements, getUserInfo, getUserReviews } from "../data/user.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const authToken = await requireAuth(request);
  const { id } = params;
  const userId = Number(id);
  const userInfo = await getUserInfo(authToken, userId);
  const reviews = await getUserReviews(authToken, userId);
  const announcements = await getUserAnnouncements(authToken, userId)

  return json({ userInfo, announcements, reviews });
};

export default function UserProfilePage() {
  const { userInfo, announcements, reviews } = useLoaderData<typeof loader>();
  return (
    <UserProfile
      userInfo={userInfo}
      announcements={announcements}
      reviews={reviews}
    />
  );
}
