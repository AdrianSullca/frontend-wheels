import { ActionFunctionArgs, json, LoaderFunction } from "@remix-run/node";
import Settings from "../components/user/Settings";
import { getUserByToken, requireAuth } from "../data/auth.server";
import { updateUserInformation, updateUserSecurity } from "../data/user.server";

export async function action({ request }: ActionFunctionArgs) {
  const authToken = await requireAuth(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  formData.delete("actionType");

  if (actionType === "generalSettings") {
    const emptyFile = formData.get("new_profile_picture");
    if (emptyFile instanceof File && emptyFile.size === 0) {
      formData.delete("new_profile_picture");
    }
    const result = await updateUserInformation(authToken, formData);
    console.log(formData);

    if (!result.success) {
      return json({ success: false, errors: result.errors }, { status: 400 });
    }

    return json({ success: true, message: result.data.message });
  }

  if (actionType == "securitySettings") {
    const result = await updateUserSecurity(authToken, formData);

    if (!result.success) {
      return json({ success: false, errors: result.errors }, { status: 400 });
    }

    return json({ success: true, message: result.data.message });
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const authUser = await getUserByToken(request);
  console.log(authUser);
  return json({ authUser });
};

export default function UserProfilePage() {
  return (
    <div className="max-w-[1400px] mx-auto text-black px-10">
      <Settings />
    </div>
  );
}
