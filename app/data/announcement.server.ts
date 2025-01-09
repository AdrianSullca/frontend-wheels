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

export async function getAnnouncementById(
  authToken: string,
  announcementId: number
) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/announcements/${announcementId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data.announcement;
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

export async function getBrands() {
  // Obtener las marcas de vehiculos
  const responseBrands = await axios.get(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const brandsData = responseBrands.data.Results.slice(0, 31); // Obtener solo los 31 primeros
  // Mapear las marcas por su nombre
  const brands = brandsData.map(
    (brand: { MakeName: string }) => brand.MakeName
  );
  return brands; // Devolver las marcas
}

export async function updateAnnouncement(
  authToken: string,
  announcementId: number,
  formData: FormData
) {
  formData.append("_method", "PATCH");
  console.log(formData);
  try {
    const response = await axios.post(
      `http://localhost:8000/api/announcements/${announcementId}`,
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

    if (response.status !== 200) {
      throw new Error(
        response.data.message || "Error al actualizar el anuncio"
      );
    }

    return response
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

export function validateErrorsFormAnnouncementUpdate(formData: FormData) {
  const errors: { [key: string]: string } = {};

  if (!formData.get("title")) {
    errors.title = "Title is required";
  }
  if (!formData.get("description")) {
    errors.description = "Description is required";
  }
  if (!formData.get("price")) {
    errors.price = "Price is required";
  }

  if (!formData.get("year")) {
    errors.year = "Year is required";
  }

  if (!formData.get("model")) {
    errors.model = "Model is required";
  }

  if (!formData.get("kilometers")) {
    errors.kilometers = "Kilometers is required";
  }

  if (!formData.get("vehicleType")) {
    errors.vehicleType = "Vehicle type is required";
  }

  const oldPhotos = formData.get("oldPhotos");
  const newPhotos = formData.getAll("newPhotos[]");

  const hasValidNewPhotos = newPhotos.some(
    (file) => file instanceof File && file.size > 0 && file.name !== ""
  );

  if (!oldPhotos || oldPhotos === "[]" && !hasValidNewPhotos) {
    errors.photos = "At least one photo is required";
  }

  return errors;
}
