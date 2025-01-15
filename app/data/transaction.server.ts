import axios, { AxiosError } from "axios";
import { Transaction } from "../types/interfaces";
import { getAnnouncementById } from "./announcement.server";
import { getUserInfo } from "./user.server";

export async function addTransaction(authToken: string, formData: FormData) {
  const announcementId = formData.get("announcementId");
  formData.delete("announcementId");

  try {
    const response = await axios.post(
      `http://localhost:8000/api/transactions/${announcementId}/create`,
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
      message?: string;
    }>;

    return {
      success: false,
      errors: axiosError.response?.data?.errors || {
        general:
          axiosError.response?.data?.message || "An unexpected error occurred",
      },
    };
  }
}

export function validationFormData(formData: FormData) {
  const errors: { [key: string]: string } = {};

  const fullName = formData.get("full_name")?.toString() || "";
  if (!fullName) {
    errors.full_name = "Full name is required.";
  } else if (/\d/.test(fullName)) {
    errors.full_name = "Full name should not contain numbers.";
  }

  const cardNumber = formData.get("card_number")?.toString() || "";
  if (!cardNumber) {
    errors.card_number = "Card number is required.";
  } else if (!/^[0-9]{13,19}$/.test(cardNumber)) {
    errors.card_number = "Card number must be between 13 and 19 digits.";
  }

  const cardExpiration = formData.get("card_expiration")?.toString() || "";
  if (!cardExpiration) {
    errors.card_expiration = "Card expiration date is required.";
  } else if (!/^(0[1-9]|1[0-2])\/(\d{4})$/.test(cardExpiration)) {
    errors.card_expiration = "Card expiration must be in MM/YYYY format.";
  } else {
    const [month, year] = cardExpiration.split("/").map(Number);
    const expirationDate = new Date(year, month - 1);
    const currentDate = new Date();
    if (expirationDate <= currentDate) {
      errors.card_expiration = "Card expiration must be a future date.";
    }
  }

  const cardCvv = formData.get("card_cvv")?.toString() || "";
  if (!cardCvv) {
    errors.card_cvv = "CVV is required.";
  } else if (!/^[0-9]{3}$/.test(cardCvv)) {
    errors.card_cvv = "CVV must be 3 digits.";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export async function getUserTransactions(authToken: string) {
  try {
    const response = await axios.get(`http://localhost:8000/api/transactions`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const transactionsData = response.data.transactions;

    const transactions = await Promise.all(
      transactionsData.map(async (transaction: Transaction) => {
        const announcement = await getAnnouncementById(
          authToken,
          transaction.announcement_id
        );
        const userInfo = await getUserInfo(authToken, announcement.user_id);
        return {
          id: transaction.id,
          buyer_id: transaction.buyer_id,
          buyer_name: userInfo.user.name,
          seller_id: transaction.seller_id,
          final_price: transaction.final_price,
          card_number: transaction.card_number,
          announcement: {
            id: announcement.id,
            photoUrl: announcement.photoUrls[0],
            title: announcement.title,
          },
        };
      })
    );

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}
