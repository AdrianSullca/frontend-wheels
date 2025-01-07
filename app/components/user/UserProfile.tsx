import { Announcement, Review, UserInfo } from "../../types/interfaces";
import AnnouncementAccordion from "../announcements/AnnouncementsAccordion";
import ReviewAccordion from "../reviews/ReviewAccordion";

interface UserProfileProps {
  announcements: Announcement[];
  userInfo: UserInfo;
  reviews: Review[];
}

import { motion } from "framer-motion";

export default function UserProfile({
  userInfo,
  announcements,
  reviews,
}: UserProfileProps) {
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
                src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                alt="..."
                width="100"
                className="rounded-full"
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
            <div className="w-full space-y-2">
              <button className="shadow-md py-1 w-full border border-custom-gray rounded-md text-custom-gray hover:border-custom-gray-hover hover:text-custom-gray-hover transition-all duration-300">
                <p>Send a message</p>
              </button>
              <button className="shadow-md py-1 w-full border border-custom-gray rounded-md text-custom-gray hover:border-custom-gray-hover hover:text-custom-gray-hover transition-all duration-300">
                <p>Leave a review</p>
              </button>
            </div>
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
