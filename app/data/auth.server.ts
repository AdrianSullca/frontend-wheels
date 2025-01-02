import axios, { isAxiosError } from "axios";
import { LoginFormData, RegisterFormData } from "../types/interfaces";
import { json, redirect } from "@remix-run/react";
import { createCookieSessionStorage } from "@remix-run/node";

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

async function createUserSession(authToken: string) {
  const session = await sessionStorage.getSession();
  session.set("authToken", authToken);
  console.log("Sesión creada con token:", authToken);
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
      return await createUserSession(response.data.token);
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
