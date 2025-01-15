import {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
  json,
} from "@remix-run/node";
import {
  useRouteError,
  isRouteErrorResponse,
  redirect,
} from "@remix-run/react";
import { getUserByToken, requireAuth } from "../data/auth.server";
import { getAnnouncementById } from "../data/announcement.server";
import PaymentForm from "../components/announcements/PaymentForm";
import { addTransaction, validationFormData } from "../data/transaction.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Transaction" },
    { name: "description", content: "Payment form" },
  ];
};

export const loader: LoaderFunction = async ({ params, request }) => {
  try {
    const authToken = await requireAuth(request);
    const { id } = params;
    const userAuth = await getUserByToken(request);
    const announcementId = Number(id);
    const announcement = await getAnnouncementById(authToken, announcementId);
    if (userAuth.id === announcement.user_id) {
      throw new Response("You cannot purchase your own announcement.", {
        status: 403,
      });
    }
    if (announcement.state !== "active") {
      throw new Response(
        "The announcement is not active and cannot be purchased.",
        {
          status: 403,
        }
      );
    }

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
  const errors = validationFormData(formData);
  if (errors) {
    return json({ errors: errors }, { status: 422 });
  }

  const result = await addTransaction(authToken, formData);
  console.log(result.errors);
  if (!result.success) {
    return json({ errors: result.errors }, { status: 422 });
  }

  return redirect(`/user/${authUser.id}/profile`);
}

export default function AnnouncementDetailsPage() {
  return (
    <div className="max-w-[800px] mx-auto text-black">
      <PaymentForm />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log("Tipo de error:", typeof error, error);
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
