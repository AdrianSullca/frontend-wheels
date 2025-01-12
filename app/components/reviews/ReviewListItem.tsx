import { Table, Button, Modal, TextInput, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Review } from "../../types/interfaces";
import { useState } from "react";

interface ReviewListItemProps {
  review: Review;
  onDelete: (userId: string) => void;
}

export default function UserListItem({
  review,
  onDelete,
}: ReviewListItemProps) {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalShow, setOpenModalShow] = useState(false);

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {review.valuator.email}
      </Table.Cell>
      <Table.Cell>{review.rated_user.email}</Table.Cell>
      <Table.Cell>{review.comment}</Table.Cell>
      <Table.Cell>{review.rating}</Table.Cell>
      <Table.Cell className="flex gap-4 justify-end">
        <button onClick={() => setOpenModalShow(true)}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
        <button onClick={() => setOpenModalDelete(true)}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
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
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </Table.Cell>

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
              Are you sure to remove this review?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  onDelete(String(review.id));
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
        show={openModalShow}
        size="md"
        onClose={() => setOpenModalShow(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Review by {review.valuator.name}
            </h3>
            <div>
              <label htmlFor="rated_user" className="text-black">
                Rated user
              </label>
              <TextInput
                id="rated_user"
                placeholder="Rated user"
                value={review.rated_user.name}
              />
            </div>
            <div>
              <label htmlFor="name" className="text-black">
                Comment
              </label>
              <Textarea
                id="name"
                placeholder="Comment"
                value={review.comment}
              />
            </div>
            <div>
              <label htmlFor="rating" className="text-black">
                Rating
              </label>
              <TextInput
                id="rating"
                placeholder="rating"
                value={review.rating}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  onDelete(String(review.id));
                  setOpenModalShow(false);
                }}
              >
                Delete
              </Button>
              <Button color="gray" onClick={() => setOpenModalShow(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Table.Row>
  );
}
