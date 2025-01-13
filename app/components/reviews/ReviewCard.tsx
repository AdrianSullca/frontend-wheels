import { Review, User } from "../../types/interfaces";
import { Rating, Button, Modal } from "flowbite-react";
import { formatDate } from "../../utils/helpers";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface ReviewCardProps {
  review: Review;
}
interface FetcherData {
  errors?: {
    [key: string]: string | undefined;
  };
  message?: string;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { authUser } = useLoaderData<{ authUser: User }>();

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [updateRating, setUpdateRating] = useState(Number(review.rating));
  const [updateComment, setUpdateComment] = useState(review.comment);
  const [hoverRating, setHoverRating] = useState(0);

  const fetcherDelete = useFetcher<FetcherData>();
  const fetcherUpdate = useFetcher<FetcherData>();

  const handleUpdateReview = () => {
    fetcherUpdate.submit(
      {
        reviewId: review.id,
        rating: updateRating.toString(),
        comment: updateComment,
      },
      {
        method: "PATCH",
        action: `/user/${review.rated_user_id}/profile`,
      }
    );
    setOpenModalUpdate(false);
  };

  const handleDeleteReview = () => {
    fetcherDelete.submit(
      { reviewId: review.id },
      {
        method: "DELETE",
        action: `/user/${review.rated_user_id}/profile`,
      }
    );
    setOpenModalDelete(false);
  };

  return (
    <div className="py-4 bg-white rounded-lg">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <img
            src={review.valuator.profile_picture_path}
            alt="..."
            width="35"
            className="rounded-full"
          />
          <div>
            <Link to={`/user/${review.valuator.id}/profile`}>
              <p className="mx-auto text-black">
                {review.valuator.id == authUser.id
                  ? "You"
                  : review.valuator.name}
              </p>
            </Link>
            <p className="text-sm text-gray-500">
              Published on {formatDate(review.created_at)}
            </p>
          </div>
        </div>
        {review.valuator.id == authUser.id ? (
          <div className="flex gap-2 flex-col sm:flex-row">
            <button
              className="flex items-center text-sm gap-2 border rounded-lg border-gray-300 text-black px-3 py-1"
              onClick={() => setOpenModalUpdate(true)}
            >
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
              </svg>
              <span className="hidden sm:block">Edit</span>
            </button>
            <button
              className="flex items-center gap-2 text-sm border rounded-lg border-gray-300 text-black px-3 py-1"
              onClick={() => setOpenModalDelete(true)}
            >
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
              <span className="hidden sm:block">Delete</span>
            </button>
          </div>
        ) : (
          ""
        )}
        {review.rated_user_id == authUser.id ? (
          <div className="flex gap-2 flex-col sm:flex-row">
            <button
              className="flex items-center gap-2 text-sm border rounded-lg border-gray-300 text-black px-3 py-1"
              onClick={() => setOpenModalDelete(true)}
            >
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
              <span className="hidden sm:block">Delete</span>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <Modal
        show={openModalDelete}
        size="md"
        onClose={() => setOpenModalDelete(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this review?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  handleDeleteReview();
                  setOpenModalDelete(false);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openModalUpdate}
        size="md"
        onClose={() => setOpenModalUpdate(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-medium text-gray-700 dark:text-gray-400">
              Update your review
            </h3>
            <div className="flex justify-center gap-1 mb-3">
              <Rating>
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <Rating.Star
                    key={starValue}
                    className={`cursor-pointer ${
                      starValue <= (hoverRating || updateRating || 1)
                        ? "text-custom-gray"
                        : "text-gray-300"
                    }`}
                    filled={starValue <= (hoverRating || updateRating)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUpdateRating(starValue)}
                  />
                ))}
              </Rating>
            </div>
            <textarea
              rows={3}
              className="mb-4 w-full border border-gray-300 rounded-lg focus:ring-0 focus:border-gray-400 text-black"
              placeholder="Write your review here..."
              value={updateComment}
              onChange={(e) => setUpdateComment(e.target.value)}
            />
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={handleUpdateReview}
                disabled={updateRating === 0 || updateComment.trim() === ""}
              >
                Update review
              </Button>
              <Button color="gray" onClick={() => setOpenModalUpdate(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="mt-1 flex">
        <Rating>
          {[...Array(5)].map((_, index) => (
            <Rating.Star
              key={index}
              className={
                index < Number(review.rating) ? "text-black" : "text-gray-300"
              }
            />
          ))}
        </Rating>
        <span className="pl-2">{review.rating}</span>
      </div>
      <div>{review.comment}</div>
    </div>
  );
}
