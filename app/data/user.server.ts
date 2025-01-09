import axios from "axios";

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