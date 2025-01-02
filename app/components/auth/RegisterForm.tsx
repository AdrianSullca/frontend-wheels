import { Form, useNavigation, Link, useActionData } from "@remix-run/react";
import InputField from "../utils/InputField";
/* import { setupValidation } from "./formValidation";
import { useEffect } from "react"; */

interface Messages {
  validationErrors: {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    phone_number?: string;
  };
  responsePetition?: {
    message?: string;
    messageError?: {
      name?: string;
      email?: string;
      password?: string;
      password_confirmation?: string;
      phone_number?: string;
    };
  };
  unexpectedError?: {
    message: string;
  };
}

export default function RegisterForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const actionData = useActionData<Messages>();

  //AGREGAR VERIFICACION EN TIEMPO REAL
  /* useEffect(() => {
    setupValidation();
  }, []); */

  const fields = [
    {
      name: "name",
      label: "Name and Surname (This is what other users will see)",
      type: "text",
    },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    {
      name: "password_confirmation",
      label: "Confirm Password",
      type: "password",
    },
    { name: "phone_number", label: "Phone Number", type: "text" },
  ];

  return (
    <div className="flex justify-center items-center">
      <Form
        method="post"
        className="flex flex-col gap-5 bg-white p-8 rounded-lg shadow-md max-w-[570px] w-full"
      >
        <input type="hidden" name="mode" value="register" />
        <h1 className="text-3xl font-bold">Create an account</h1>

        {actionData?.unexpectedError && (
          <span className="text-red-500">
            {actionData.unexpectedError.message}
          </span>
        )}
        {actionData?.responsePetition && (
          <span className="text-custom-orange">
            {actionData.responsePetition.message}
          </span>
        )}

        {fields.map((field) => (
          <div className="flex flex-col gap-1" key={field.name}>
            <InputField
              id={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              error={
                actionData?.validationErrors?.[field.name as keyof typeof actionData.validationErrors] ||
                actionData?.responsePetition?.messageError?.[field.name as keyof typeof actionData.responsePetition.messageError]
              }
            />
          </div>
        ))}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-200 bg-red-100 rounded focus:ring-2 focus:ring-blue-500 checked:bg-blue-500"
            />
            <label htmlFor="remember">
              I accept the{" "}
              <span className="text-custom-orange">Terms and Conditions</span>
            </label>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          className={`bg-custom-gray text-white py-2 rounded-lg transition-all duration-300 hover:bg-custom-gray-hover ${
            isSubmitting && "opacity-50 pointer-events-none"
          }`}
        >
          {isSubmitting ? "Processing request..." : "Create an account"}
        </button>

        <p>
          Already have an account?{" "}
          <span className="text-custom-orange font-medium">
            <Link to={`?mode=login`}>Sign in</Link>
          </span>
        </p>
      </Form>
    </div>
  );
}