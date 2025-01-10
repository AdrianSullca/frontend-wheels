import axios, { AxiosError } from "axios";

export async function getUserInfo(authToken: string, userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/profile/${userId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    // IMPLEMENTAR GESTION DE ERROR
  }
}

export async function getUserAnnouncements(authToken: string, userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/profile/${userId}/announcements`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data.announcements;
  } catch (error) {
    // IMPLEMENTAR GESTION DE ERROR
  }
}

export async function getUserReviews(authToken: string, userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/profile/${userId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data.reviews;
  } catch (error) {
    // IMPLEMENTAR GESTION DE ERROR
  }
}

export async function updateUserInformation(
  authToken: string,
  formData: FormData
) {
  formData.append("_method", "PATCH");
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/updateGeneralInformation",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
    // console.log("Error response:", axiosError.response?.data);
    return {
      success: false,
      errors: axiosError.response?.data?.errors || {
        general: "An unexpected error occurred",
      },
    };
  }
}

export async function updateUserSecurity(
  authToken: string,
  formData: FormData
) {
  console.log(formData);
  try {
    const response = await axios.patch(
      "http://localhost:8000/api/user/updateSecurity",
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
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<{
      errors?: { [key: string]: string };
    }>;
    console.log("Error response:", axiosError.response?.data);
    return {
      success: false,
      errors: axiosError.response?.data?.errors || {
        general: "An unexpected error occurred",
      },
    };
  }
}
