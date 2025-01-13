import { ActionFunctionArgs, json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { getUserByToken, requireAuth } from "../data/auth.server";
import { useLoaderData } from "@remix-run/react";
import UserProfile from "../components/user/UserProfile";
import {
  getUserAnnouncements,
  getUserInfo,
  getUserReviews,
} from "../data/user.server";
import { addReview, updateReview, deleteReview } from "../data/reviews.server";

export const meta: MetaFunction = () => {
  return [
    { title: "User profile" },
    { name: "description", content: "User profile view" },
  ];
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const authToken = await requireAuth(request);
  const authUser = await getUserByToken(request);
  const { id } = params;
  const userId = Number(id);
  const userInfo = await getUserInfo(authToken, userId);
  const reviews = await getUserReviews(authToken, userId);
  const announcements = await getUserAnnouncements(authToken, userId);

  return json({ userInfo, announcements, reviews, authUser });
};

export async function action({ request }: ActionFunctionArgs) {
  const authToken = await requireAuth(request);
  const formData = await request.formData();
  console.log(formData);

  if (request.method == "DELETE") {
    try {
      const result = await deleteReview(authToken, formData);
      if (!result.success) {
        return json({ success: false, errors: result.errors }, { status: 400 });
      }
      return json({ success: true, message: result.data.message });
    } catch (error) {
      return json({ error: "Failed to delete review" });
    }
  }

  if (request.method == "PATCH") {
    try {
      const result = await updateReview(authToken, formData);
      if (!result.success) {
        return json({ success: false, errors: result.errors }, { status: 400 });
      }
      return json({ success: true, message: result.data.message });
    } catch (error) {
      return json({ error: "Failed to delete review" });
    }
  }

  if (request.method == "POST") {
    try {
      const result = await addReview(authToken, formData);
      if (!result.success) {
        return json({ success: false, errors: result.errors }, { status: 400 });
      }
      return json({ success: true, message: result.data.message });
    } catch (error) {
      return json({ error: "Failed to add review" });
    }
  }
}

export default function UserProfilePage() {
  const { userInfo, announcements, reviews, authUser } =
    useLoaderData<typeof loader>();
  return (
    <UserProfile
      authUser={authUser}
      userInfo={userInfo}
      announcements={announcements}
      reviews={reviews}
    />
  );
}
