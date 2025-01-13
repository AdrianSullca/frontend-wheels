import { ActionFunctionArgs, json, LoaderFunction, MetaFunction } from "@remix-run/node";
import UsersList from "../components/user/UsersList";
import { getUserByToken, requireAuth } from "../data/auth.server";
import { deleteUser, getAllUsers, updateUser, createUser } from "../data/admin.server";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Manage users" },
    { name: "description", content: "User management view" },
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
  const result = await getAllUsers(authToken);
  if (!result.success) {
    throw new Error(result.error);
  }
  const users = result.data.users;

  return json({ users });
};

export async function action({ request }: ActionFunctionArgs) {
  const authToken = await requireAuth(request);
  const formData = await request.formData();

  if (request.method === "DELETE") {
    try {
      const result = await deleteUser(authToken, formData);
      if (!result.success) {
        throw new Error(result.error);
      }

      return json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      return json({ error: "Failure to user delete" }, { status: 500 });
    }
  }

  if (request.method === "PATCH") {
    try {
      const result = await updateUser(authToken, formData);
      if (!result.success) {
        throw new Error(result.error);
      }

      return json({ success: true, message: "User updated successfully" });
    } catch (error) {
      return json({ error: "Failure to user update" }, { status: 500 });
    }
  }

  if (request.method === "POST") {
    try {
      const result = await createUser(authToken, formData);
      if (!result.success) {
        throw new Error(result.error);
      }
      return json({ success: true, message: "User created successfully" });
    } catch (error) {
      return json({ error: "Failure to user create" }, { status: 500 });
    }
  }
}

export default function ManageUsersPage() {
  return (
    <div className="max-w-[1250px] px-7 mx-auto pt-7">
      <UsersList />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log("Tipo de error:", typeof error, error);

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
