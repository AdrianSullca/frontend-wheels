import axios from "axios";
import { getAnnouncementById } from "./announcement.server";
import { Favorite } from "../types/interfaces";

export async function getUserFavorites(authToken: string) {
  try {
    const response = await axios.get(`http://localhost:8000/api/favorites`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const favoritesData = response.data.favorites;

    const favorites = await Promise.all(
      favoritesData.map(async (favorite: Favorite) => {
        const announcement = await getAnnouncementById(
          authToken,
          favorite.announcement_id
        );
        return {
          id: favorite.id,
          userId: favorite.user_id,
          announcement: {
            id: announcement.id,
            // photoUrl: announcement.photoUrls[0],
            photoUrl:
              "https://res.cloudinary.com/dxvjedi2n/image/upload/v1735251175/announcement-1-2_d8xpmo.jpg",
            title: announcement.title,
            user_name: announcement.user.name,
            user_id: announcement.user.id,
          },
        };
      })
    );

    return favorites;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
}

export async function toggleFavorite(
  authToken: string,
  announcementId: number
) {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/favorites/${announcementId}/toggle`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data.favorite;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
