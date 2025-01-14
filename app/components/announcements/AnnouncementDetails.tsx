import { Announcement, User } from "../../types/interfaces";
import { Link, useFetcher } from "@remix-run/react";
import { formatDate } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Modal, Carousel } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface AnnouncementDetailsProps {
  announcement: Announcement;
  userAuth: User;
  sameBrandAnnouncements: Announcement[];
}

interface FetcherData {
  success: number;
  isFavorite: boolean;
}

export default function AnnouncementDetails({
  announcement,
  userAuth,
}: AnnouncementDetailsProps) {
  const fetcher = useFetcher();
  const fetcherDelete = useFetcher();
  const [isFavorite, setIsFavorite] = useState(
    announcement.isFavorite || false
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (fetcher.data && (fetcher.data as FetcherData).success) {
      setIsFavorite((fetcher.data as FetcherData).isFavorite);
    }
  }, [fetcher.data]);

  const handleToggleFavorite = () => {
    fetcher.submit(
      { announcementId: announcement.id },
      {
        method: "POST",
        action: `/announcements/${announcement.id}/details`,
      }
    );
  };

  const handleDelete = () => {
    fetcherDelete.submit(
      { announcementId: announcement.id },
      {
        method: "DELETE",
        action: `/announcements/${announcement.id}/details`,
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}
      layout
      className="flex flex-col max-w-[1100px] mx-auto text-black py-5 px-5"
    >
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-2xl font-bold">{announcement.title}</h1>
        {announcement.user_id == userAuth.id ? (
          <div className="flex gap-2">
            <Link
              to={`/announcements/${announcement.id}/update`}
              className={`flex gap-2 p-1 px-3 rounded-md border transition-all duration-300`}
            >
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
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
              </svg>
              <span>Edit announcement</span>
            </Link>

            <button
              onClick={() => setOpenModal(true)}
              className={`flex gap-2 p-1 px-3 rounded-md border transition-all duration-300`}
              disabled={fetcherDelete.state === "submitting"}
            >
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
              <span>
                {fetcherDelete.state === "submitting"
                  ? "Deleting..."
                  : "Delete"}
              </span>
            </button>
            <Modal
              show={openModal}
              size="md"
              onClose={() => setOpenModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this announcement?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      onClick={() => {
                        handleDelete();
                        setOpenModal(false);
                      }}
                    >
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        ) : (
          <button
            onClick={handleToggleFavorite}
            className={`flex gap-2 p-1 px-3 rounded-md border transition-all duration-300 ${
              isFavorite ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <svg
              fill={isFavorite ? "red" : "none"}
              stroke={isFavorite ? "red" : "black"}
              width="24"
              height="24"
              strokeWidth="1.4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z" />
            </svg>
            <span className="hidden md:block">{isFavorite ? "Remove favorite" : "Save as favorite"}</span>
          </button>
        )}
      </div>
      <div className="aspect-[16/9] overflow-hidden rounded-xl relative group max-h-[450px]">
        <Carousel
          slide={false}
          className="h-full"
          indicators={false}
          leftControl={<ChevronLeft />}
          rightControl={<ChevronRight />}
        >
          {announcement.photoUrls.length > 0 ? (
            announcement.photoUrls.map((url, index) => (
              <div key={index} className="relative h-full w-full">
                <img
                  src={url}
                  alt={`${announcement.title} - img ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="relative h-full w-full">
              <img
                src="/path/to/default-image.jpg"
                alt="Default"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </Carousel>
      </div>
      <div className="grid md:grid-cols-[1fr,auto] gap-6 mt-5">
        <div className="flex flex-col items-center gap-6 col-start-1 col-end-2">
          <Link className="w-full" to={`/user/${announcement.user_id}/profile`}>
            <div className="flex items-center gap-4 bg-white px-6 py-4 w-full rounded-lg shadow-sm">
              <img
                src={announcement.user.profile_picture_path}
                alt="user avatar"
                width="35"
                className="rounded-full"
              />
              <div>
                <p className="text-black">
                  Annunciator:{" "}
                  {announcement.user_id == userAuth.id
                    ? "You"
                    : announcement.user.name}
                </p>
                <p className="text-sm text-gray-500">
                  Registered on {formatDate(announcement.user.created_at)}
                </p>
              </div>
            </div>
          </Link>
          <div className="bg-white p-6 w-full rounded-lg shadow-sm space-y-4">
            <div>
              <h2 className="font-semibold text-custom-orange mb-2 text-lg">
                Description
              </h2>
              <p>{announcement.description}</p>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold text-custom-orange mb-2 text-lg">
                Vehicle Details
              </h2>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Brand</td>
                    <td className="py-2 text-right">{announcement.brand}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Model</td>
                    <td className="py-2 text-right">{announcement.model}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Year</td>
                    <td className="py-2 text-right">{announcement.year}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Kilometers</td>
                    <td className="py-2 text-right">
                      {announcement.kilometers} km
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Body type</td>
                    <td className="py-2 text-right">Sedan</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Doors</td>
                    <td className="py-2 text-right">2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Seats</td>
                    <td className="py-2 text-right">4</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Color</td>
                    <td className="py-2 text-right">White</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="hidden md:block col-start-2 col-end-3 h-auto">
          <div className="bg-white shadow-md rounded-lg w-full max-w-md h-auto sticky top-20 p-6 col-start-2 col-end-3 h-auto">
            <h1 className="text-xl font-semibold mb-4 text-center">
              {announcement.brand} - {announcement.model}
            </h1>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Base price</p>
                <p className="">{announcement.price} €</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">VAT (21%)</p>
                <p className="">
                  {(Number(announcement.price) * 0.21).toFixed(2)} €
                </p>
              </div>
              <div className="flex justify-between items-center text-custom-orange">
                <p>Discount</p>
                <p className="font-medium">
                  -{(Number(announcement.price) * 0.21).toFixed(2)} €
                </p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center text-lg font-semibold">
                <p>Total</p>
                <p>{announcement.price} €</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button
                disabled={announcement.user_id == userAuth.id}
                className={`border border-gray-300 py-2 px-4 w-full rounded-lg shadow-sm text-black 
    transition-all duration-300 ${
      announcement.user_id == userAuth.id
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "hover:text-custom-gray-hover"
    }`}
              >
                Send a message
              </button>
              <button
                disabled={announcement.user_id == userAuth.id}
                className={`py-2 px-4 w-full rounded-lg shadow-md text-white 
    transition-all duration-300 ${
      announcement.user_id == userAuth.id
        ? "bg-gray-300 text-gray-400 cursor-not-allowed"
        : "bg-custom-orange hover:bg-custom-orange-hover"
    }`}
              >
                Buy now
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Price includes VAT
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-auto mt-6 md:hidden">
        <div className="bg-white shadow-md rounded-lg w-full h-auto sticky top-20 p-6 w-full h-auto">
          <h1 className="text-xl font-semibold mb-4 text-center">
            {announcement.brand} - {announcement.model}
          </h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Base price</p>
              <p className="">{announcement.price} €</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">VAT (21%)</p>
              <p className="">
                {(Number(announcement.price) * 0.21).toFixed(2)} €
              </p>
            </div>
            <div className="flex justify-between items-center text-custom-orange">
              <p>Discount</p>
              <p className="font-medium">
                -{(Number(announcement.price) * 0.21).toFixed(2)} €
              </p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center text-lg font-semibold">
              <p>Total</p>
              <p>{announcement.price} €</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <button
              disabled={announcement.user_id == userAuth.id}
              className={`border border-gray-300 py-2 px-4 w-full rounded-lg shadow-sm text-black 
    transition-all duration-300 ${
      announcement.user_id == userAuth.id
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "hover:text-custom-gray-hover"
    }`}
            >
              Send a message
            </button>
            <button
              disabled={announcement.user_id == userAuth.id}
              className={`py-2 px-4 w-full rounded-lg shadow-md text-white 
    transition-all duration-300 ${
      announcement.user_id == userAuth.id
        ? "bg-gray-300 text-gray-400 cursor-not-allowed"
        : "bg-custom-orange hover:bg-custom-orange-hover"
    }`}
            >
              Buy now
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Price includes VAT
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ChevronLeft() {
  return (
    <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="18"
        height="18"
        strokeWidth="2"
      >
        <path d="M15 6l-6 6l6 6"></path>{" "}
      </svg>
    </button>
  );
}

function ChevronRight() {
  return (
    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="18"
        height="18"
        strokeWidth="2"
      >
        <path d="M9 18l6-6-6-6"></path>{" "}
      </svg>
    </button>
  );
}
