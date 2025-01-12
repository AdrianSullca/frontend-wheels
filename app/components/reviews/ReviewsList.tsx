import { useLoaderData, useFetcher } from "@remix-run/react";
import ReviewListItem from "./ReviewListItem";
import { Review } from "../../types/interfaces";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function UsersList() {
  const { reviews } = useLoaderData<{ reviews: Review[] }>();
  const deleteFetcher = useFetcher();

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const handleMessage = (newMessage: string, type: "success" | "error") => {
    setMessage(newMessage);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const handleDelete = (reviewId: string) => {
    deleteFetcher.submit(
      { reviewId },
      { method: "DELETE", action: "/manage/reviews" }
    );
  };

  useEffect(() => {
    if (deleteFetcher.state === "idle" && deleteFetcher.data) {
      const data = deleteFetcher.data as { success: boolean; message: string };
      const { success, message } = data;
      if (success) {
        handleMessage(message, "success");
      } else {
        handleMessage("Failed to delete user", "error");
      }
    }
  }, [deleteFetcher.state, deleteFetcher.data]);

  return (
    <div className="overflow-x-auto">
      {message && (
        <div
          className={`mb-4 p-3 text-center rounded ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Valuator (email)</Table.HeadCell>
          <Table.HeadCell>Rated (email)</Table.HeadCell>
          <Table.HeadCell>Comment</Table.HeadCell>
          <Table.HeadCell>Rating</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {reviews.map((review: Review) => (
            <ReviewListItem
              key={review.id}
              review={review}
              onDelete={handleDelete}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
