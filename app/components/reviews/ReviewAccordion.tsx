import { useState } from "react";
import { Review } from "../../types/interfaces";
import ReviewCard from "./ReviewCard";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewAccordionProps {
  reviews: Review[];
}

export default function ReviewAccordion({ reviews }: ReviewAccordionProps) {
  const [showMore, setShowMore] = useState(false);
  const [initialVisibleCount] = useState(1);

  const totalVisibleCount = showMore ? reviews.length : initialVisibleCount;

  return (
    <>
      <motion.div
        layout
        className="bg-white rounded-lg shadow-sm text-black p-6"
      >
        <motion.h1
          layout
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-medium text-custom-orange text-lg"
        >
          Reviews
        </motion.h1>

        <motion.div layout className="">
          {reviews.length > 0 ? (
            reviews.slice(0, totalVisibleCount).map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-start-1 col-end-2 sm:col-end-3 md:col-end-4 pb-4">
              No reviews
            </p>
          )}

          {}
        </motion.div>

        {reviews.length > 0 ? (
          <AnimatePresence>
            <motion.button
              hidden={reviews.length <= initialVisibleCount}
              onClick={() => setShowMore(!showMore)}
              className={`mt-4 py-1 px-7 rounded-lg transition duration-300 ${
                showMore
                  ? "bg-white text-custom-gray border border-custom-gray hover:text-gray-500 hover:border-gray-500"
                  : "bg-custom-gray text-white border border-custom-gray hover:bg-custom-gray-hover"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
              layout
            >
              {showMore ? "Show Less" : "Show More"}
            </motion.button>
          </AnimatePresence>
        ) : (
          ""
        )}
      </motion.div>
    </>
  );
}
