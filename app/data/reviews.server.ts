import axios, { AxiosError } from "axios";

export async function addReview(authToken: string, formData: FormData) {
  const userId = formData.get("userId");
  formData.delete("userId");
  try {
    const response = await axios.post(
      `http://localhost:8000/api/reviews/${userId}/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<{
      errors?: { [key: string]: string };
    }>;

    return {
      success: false,
      errors: axiosError.response?.data?.errors || {
        general: "An unexpected error occurred",
      },
    };
  }
}

export async function updateReview(authToken: string, formData: FormData) {
  const reviewId = formData.get("reviewId");
  formData.delete("reviewId");
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/reviews/${reviewId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<{
      errors?: { [key: string]: string };
    }>;

    return {
      success: false,
      errors: axiosError.response?.data?.errors || {
        general: "An unexpected error occurred",
      },
    };
  }
}

export async function deleteReview(authToken: string, formData: FormData) {
  const reviewId = formData.get("reviewId");
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<{
      errors?: { [key: string]: string };
    }>;

    return {
      success: false,
      errors: axiosError.response?.data?.errors || {
        general: "An unexpected error occurred",
      },
    };
  }
}
