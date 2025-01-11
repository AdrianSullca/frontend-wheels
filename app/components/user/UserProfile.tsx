import { Announcement, Review, User, UserInfo } from "../../types/interfaces";
import AnnouncementAccordion from "../announcements/AnnouncementsAccordion";
import { useFetcher } from "@remix-run/react";
import ReviewAccordion from "../reviews/ReviewAccordion";
import { useState } from "react";
import { Button, Modal, Rating } from "flowbite-react";
interface UserProfileProps {
  announcements: Announcement[];
  authUser: User;
  userInfo: UserInfo;
  reviews: Review[];
}

import { motion } from "framer-motion";

interface ActionData {
  errors?: {
    [key: string]: string | undefined;
  };
  message?: string;
}

export default function UserProfile({
  userInfo,
  authUser,
  announcements,
  reviews,
}: UserProfileProps) {
  
  const fetcher = useFetcher<ActionData>();
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleAddReview = () => {
    fetcher.submit(
      { userId: userInfo.user.id, rating: rating.toString(), comment },
      {
        method: "POST",
        action: `/user/${userInfo.user.id}/profile`,
      }
    );
    setRating(1);
    setComment("");
    setOpenModal(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto text-black px-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        exit={{ opacity: 0 }}
        layout
        className="grid md:grid-cols-[auto,1fr] mx-auto gap-6"
      >
        <div className="col-start-1 col-end-2">
          <div className="max-w-[800px] sticky top-20 space-y-4">
            <div className="flex flex-col items-center text-black gap-4 bg-white px-6 py-6 w-full rounded-lg shadow-md">
              <img
                src={userInfo.user.profile_picture_path}
                alt="user avatar"
                className="rounded-full object-contain w-[140px] h-[140px]"
              />
              <div className="text-center">
                <p className="text-2xl font-medium">{userInfo.user.name}</p>
                <p>{userInfo.user.email}</p>
                <p>{userInfo.user.phone_number}</p>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col items-center">
                  <p className="font-medium text-custom-orange">Reviews</p>
                  <p>{userInfo.stats.reviews_count}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-medium text-custom-orange">Ads</p>
                  <p>{userInfo.stats.announcements_count}</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-medium text-custom-orange">Favorites</p>
                  <p>{userInfo.stats.total_favorites}</p>
                </div>
              </div>
            </div>
            {userInfo.user.id === authUser.id ? (
              ""
            ) : (
              <div className="w-full space-y-2">
                <button className="shadow-md py-1 w-full border border-custom-gray rounded-md text-custom-gray hover:border-custom-gray-hover hover:text-custom-gray-hover transition-all duration-300">
                  <p>Send a message</p>
                </button>
                <button
                  onClick={() => setOpenModal(true)}
                  className="shadow-md py-1 w-full border border-custom-gray rounded-md text-custom-gray hover:border-custom-gray-hover hover:text-custom-gray-hover transition-all duration-300"
                >
                  <p>Leave a review</p>
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
                      <h3 className="mb-4 text-lg font-medium text-gray-700">
                        Leave a Review
                      </h3>

                      <div className="flex justify-center gap-1 mb-4">
                        <Rating>
                          {Array.from({ length: 5 }, (_, index) => {
                            const starValue = index + 1;
                            return (
                              <Rating.Star
                                key={index}
                                className={`cursor-pointer ${
                                  starValue <= (hoverRating || rating || 1)
                                    ? "text-custom-gray"
                                    : "text-gray-300"
                                }`}
                                onClick={() => setRating(starValue)}
                                onMouseEnter={() => setHoverRating(starValue)}
                                onMouseLeave={() => setHoverRating(0)}
                              />
                            );
                          })}
                        </Rating>
                      </div>

                      <textarea
                        name="comment"
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg focus:ring-0 focus:border-gray-400 text-black"
                        placeholder="Write your review here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />

                      <div className="flex justify-center gap-4 mt-4">
                        <Button
                          color="success"
                          onClick={handleAddReview}
                          disabled={
                            rating === 0 || rating > 5 || comment.trim() === ""
                          }
                        >
                          Add Review
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => setOpenModal(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            )}
            {fetcher.data?.message && (
              <p className="text-green-500">{fetcher.data.message}</p>
            )}
          </div>
        </div>
        <div className="col-start-1 col-end-2 md:col-start-2 md:col-end-3 flex flex-col gap-6 md:mt-6">
          <AnnouncementAccordion announcements={announcements} />
          <ReviewAccordion reviews={reviews} />
        </div>
      </motion.div>
    </div>
  );
}
