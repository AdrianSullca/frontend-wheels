import axios, { isAxiosError } from "axios";
import { LoginFormData, RegisterFormData } from "../types/interfaces";
import { json, redirect } from "@remix-run/react";
import { createCookieSessionStorage } from "@remix-run/node";

export async function requireAuth(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  if (!authToken) {
    throw redirect("/auth?mode=login");
  }

  return authToken;
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "authToken",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  },
});

async function createUserSession(authToken: string, admin: boolean) {
  const session = await sessionStorage.getSession();
  session.set("authToken", authToken);
  if (admin) {
    return redirect("/manage/users", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  return redirect("/announcements", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function login({ email, password }: LoginFormData) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      const admin = Boolean(response.data.user.admin);
      return await createUserSession(response.data.token, admin);
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 401 || status === 403) {
        return json(
          { responsePetition: { message: data.message } },
          { status: status }
        );
      }
    }
    return json(
      { unexpectedError: { message: "An unexpected error occurred." } },
      { status: 500 }
    );
  }
}

export async function logout(request: Request) {
  await axios.post("http://localhost:8000/api/logout", null, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await requireAuth(request)}`,
    },
    withCredentials: true,
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  session.unset("authToken");
  return redirect("/auth?mode=login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function getUserByToken(request: Request) {
  const response = await axios.get("http://localhost:8000/api/user", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await requireAuth(request)}`,
    },
    withCredentials: true,
  });
  return response.data.user;
}

export async function register({
  name,
  email,
  password,
  password_confirmation,
  phone_number,
}: RegisterFormData) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/register",
      {
        name,
        email,
        password,
        password_confirmation,
        phone_number,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return json(
      { responsePetition: { message: response.data.message } },
      { status: response.status }
    );
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 422) {
        const validationServerErrors = Object.keys(data.errors).reduce(
          (acc: { [key: string]: string }, key) => {
            acc[key] = data.errors[key][0];
            return acc;
          },
          {}
        );
        return json(
          {
            validationErrors: validationServerErrors,
          },
          { status }
        );
      }
    }
    return json(
      { unexpectedError: { message: "An unexpected error occurred." } },
      { status: 500 }
    );
  }
}
