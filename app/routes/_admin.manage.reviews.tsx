import { ActionFunctionArgs, json, LoaderFunction, MetaFunction } from "@remix-run/node";
import ReviewsList from "../components/reviews/ReviewsList";
import { getUserByToken, requireAuth } from "../data/auth.server";
import { getAllReviews, deleteReview } from "../data/admin.server";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Manage reviews" },
    { name: "description", content: "Review management view" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const authToken = await requireAuth(request);
  const userAuth = await getUserByToken(request);
  if (userAuth.admin == 0) {
    throw new Response("You do not have permission to access this page", {
      status: 403,
    });
  }
  const result = await getAllReviews(authToken);
  if (!result.success) {
    throw new Error(result.error);
  }
  const reviews = result.data.reviews;

  return json({ reviews });
};

export async function action({ request }: ActionFunctionArgs) {
  const authToken = await requireAuth(request);
  const formData = await request.formData();

  if (request.method === "DELETE") {
    try {
        console.log(formData)
      const result = await deleteReview(authToken, formData);
      if (!result.success) {
        throw new Error(result.error);
      }

      return json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
      return json({ error: "Failure to review delete" }, { status: 500 });
    }
  }
}

export default function ManageReviewsPage() {
  return (
    <div className="max-w-[1250px] px-7 mx-auto pt-7">
      <ReviewsList />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 403) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-custom-body">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black">{error.status}</h1>
            <p className="text-black">{error.data}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-body">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-black">Something went wrong!</h1>
        <p className="text-black">Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
  );
}
