import { Outlet, useLoaderData } from "@remix-run/react";
import AuthHeader from "../components/layout/AuthHeader";
import { LoaderFunction } from "@remix-run/node";
import { getUserByToken } from "../data/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserByToken(request);
  return Response.json({ user });
};

export default function AuthLayout(): JSX.Element {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <AuthHeader user={user} />
      <main className="min-h-screen bg-custom-body mt-[57px]">
        <Outlet />
      </main>
      <AuthHeader user={user} />
    </>
  );
}
