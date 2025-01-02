import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

interface Messages {
  responsePetition?: {
    message?: string;
  };
  unexpectedError?: {
    message: string;
  };
}
export default function LoginForm() {
  const actionData = useActionData<Messages>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <div className="flex justify-center items-center">
      <Form
        method="post"
        className="flex flex-col gap-5 bg-white p-8 rounded-lg shadow-md max-w-[570px] w-full"
      >
        <input type="hidden" name="mode" value="login" />
        <div>
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
          <p className="text-gray-400 pt-2">
            Start looking for your car. Don’t have an account?{" "}
            <Link to="?mode=register">
              <span className="text-custom-orange font-medium">Sign up.</span>
            </Link>
          </p>
        </div>
        {actionData?.responsePetition && (
          <span className="text-red-500">
            {actionData.responsePetition.message}
          </span>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="emailOrPhone" className="text-gray-700">
            Email or phone number
          </label>
          <input
            type="email"
            name="email"
            className={`bg-white rounded-lg border ${
              actionData?.responsePetition?.message
                ? "border-red-500"
                : "border-gray-200"
            } text-black p-2 w-full`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            className={`bg-white rounded-lg border ${
              actionData?.responsePetition?.message
                ? "border-red-500"
                : "border-gray-200"
            } text-black p-2 w-full`}
          />
        </div>
        <div className="flex items-center gap-2">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button className="flex items-center justify-center gap-2 border border-gray-200 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 48 48"
            fill="red"
          >
            <path d="M24 9.5c3.7 0 6.8 1.4 9.2 3.8l6.9-6.9C35.9 2.5 30.2 0 24 0 14.7 0 6.8 5.5 2.8 13.3l7.9 6.2C12.4 12.1 17.7 9.5 24 9.5z" />
            <path
              d="M46.6 24.5c0-1.7-.1-3.5-.4-5.1H24v9.7h12.7c-.6 3.4-2.7 6.3-5.7 8.2l7.8 6c4.5-4.1 7.8-10.2 7.8-18.8z"
              fill="#4285F4"
            />
            <path
              d="M10.7 26.6c-.4-1.2-.6-2.6-.6-4s.2-2.7.6-4L2.8 12.3C1 15.8 0 19.8 0 24c0 4.2 1 8.2 2.8 11.7l7.9-6.2z"
              fill="#FBBC05"
            />
            <path
              d="M24 48c6.5 0 11.9-2.1 15.9-5.7l-7.8-6c-2.1 1.4-4.9 2.2-8.1 2.2-6.3 0-11.6-3.6-14.2-8.9l-7.9 6.2C6.8 42.5 14.7 48 24 48z"
              fill="#34A853"
            />
          </svg>
          Sign in with Google
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-200 bg-red-100 rounded focus:ring-2 focus:ring-blue-500 checked:bg-blue-500"
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <p className="text-custom-orange">Forgot password?</p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-custom-gray text-white py-2 rounded-lg transition-all duration-300 hover:bg-custom-gray-hover ${
            isSubmitting && "opacity-50 pointer-events-none"
          }`}
        >
          {isSubmitting ? "Signing in..." : "Sign in to your account"}
        </button>
      </Form>
    </div>
  );
}
