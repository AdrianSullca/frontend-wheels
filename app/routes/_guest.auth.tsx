import { json, redirect, useSearchParams } from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { validateRegisterFormData } from "../data/validations.server";
import { login, register, sessionStorage } from "../data/auth.server";
import { LoginFormData, RegisterFormData } from "../types/interfaces";

export const meta: MetaFunction = () => {
  return [
    { title: "Auth form" },
    { name: "description", content: "Registration or login form view" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  if (authToken) {
    return redirect("/announcements");
  }

  return null;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const mode = formData.get("mode") as string;
  // MODE REGISTER
  if (mode == "register") {
    const registerFormData: RegisterFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      password_confirmation: formData.get("password_confirmation") as string,
      phone_number: formData.get("phone_number") as string,
    };
    // DEVOLVER SI HAY ERRORES DE VALIDACION DE FORMULARIO
    const validationErrors = validateRegisterFormData(registerFormData);
    if (validationErrors) return json({ validationErrors }, { status: 400 });
    // DEVOLVER SI HAY ERRORES O MENSAJES DE SERVIDOR
    const responseRegisterServidor = await register(registerFormData);
    return responseRegisterServidor;
  } else if (mode == "login") {
    const loginFormData: LoginFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    return await login(loginFormData);
  }
}

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  return (
    <div className="min-h-screen bg-custom-body mt-[57px] text-black">
      <div className="flex justify-center max-w-[1400px] mx-auto">
        <div className="w-full lg:ml-10 my-12">
          {mode === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
        <div className="w-full justify-center my-20 hidden lg:flex">
          <img
            src="/wheels-logo.png"
            alt="free-wheels-logo"
            className="w-[400px] h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
