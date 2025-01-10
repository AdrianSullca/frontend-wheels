import { Form, useActionData, useNavigation } from "@remix-run/react";

interface ActionData {
  errors?: {
    [key: string]: string | undefined;
  };
  message?: string;
}

export default function SecuritySettingsForm() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method="post"
      className="bg-white p-6 rounded-lg shadow-md text-black"
    >
      <input type="hidden" name="_method" value="PATCH" />
      <input type="hidden" name="actionType" value="securitySettings" />
      <p className="font-medium text-custom-orange">Security settings</p>
      <div className="mt-1 flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="email">Current password</label>
          <input
            type="password"
            placeholder="Current password"
            className="focus:ring-0 rounded-lg"
            name="current_password"
          />
          {actionData?.errors?.current_password && (
            <p className="text-red-500">{actionData.errors.current_password}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">New password</label>
          <input
            type="password"
            placeholder="Password"
            className="focus:ring-0 rounded-lg"
            name="new_password"
          />
          {actionData?.errors?.new_password && (
            <p className="text-red-500">{actionData.errors.new_password}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Confirm password</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="focus:ring-0 rounded-lg"
            name="password_confirmation"
          />
          {actionData?.errors?.password_confirmation && (
            <p className="text-red-500">
              {actionData.errors.password_confirmation}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`w-[200px] mt-2 py-2 text-white rounded-lg transition duration-300 ${
            isSubmitting
              ? "bg-gray-400 "
              : "bg-custom-gray hover:bg-custom-gray-hover"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </Form>
  );
}
