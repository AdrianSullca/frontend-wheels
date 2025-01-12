import axios from "axios";

export async function getAllUsers(authToken: string) {
  try {
    const response = await axios.get("http://localhost:8000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getAllReviews(authToken: string) {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/reviews",
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
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deleteReview(authToken: string, formData: FormData) {
  const reviewId = formData.get("reviewId");
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/admin/review/${reviewId}`,
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
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getAllAnnouncements(authToken: string) {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/announcements",
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
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deleteUser(authToken: string, formData: FormData) {
  const userId = formData.get("userId");
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/admin/user/${userId}`,
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
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateUser(authToken: string, formData: FormData) {
  const userId = formData.get("id");
  console.log(userId);
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/admin/user/${userId}`,
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
    console.log(error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function createUser(authToken: string, formData: FormData) {
  try {
    console.log(formData);
    const response = await axios.post(
      `http://localhost:8000/api/admin/user/create`,
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
    console.log(error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
