import { json } from "@remix-run/react";
import axios, { AxiosError } from "axios";

export async function uploadAnnouncement(
    authToken: string,
    formData: FormData
  ) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/announcements/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        }
      );
  
      if (response.status !== 201) {
        throw new Error(response.data.message || "Error al crear el anuncio");
      }
  
      return json(
        { responsePetition: { message: response.data.message } },
        { status: response.status }
      );
    } catch (error) {
      const axiosError = error as AxiosError;
  
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        "An unexpected error occurred.";
  
      return json(
        { unexpectedError: { message: errorMessage } },
        { status: axiosError.response?.status || 500 }
      );
    }
  }
  