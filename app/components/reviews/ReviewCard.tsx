import { Review } from "../../types/interfaces";
import { Rating } from "flowbite-react";
import { formatDate } from "../../utils/helpers";
import { Link } from "@remix-run/react";
interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="py-4 bg-white rounded-lg">
      <div className="flex items-center gap-4">
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
          width="35"
          className="rounded-full"
        />
        <div>
          <Link to={`/user/${review.valuator.id}/profile`}>
            <p className="mx-auto text-black">{review.valuator.name}</p>
          </Link>
          <p className="text-sm text-gray-500">
            Published on {formatDate(review.created_at)}
          </p>
        </div>
      </div>

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
