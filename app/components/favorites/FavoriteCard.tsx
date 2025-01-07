import { Link, useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";

interface FavoriteCardProps {
  favorite: {
    id: number;
    userId: number;
    announcement: {
      id: number;
      photoUrl: string;
      title: string;
      brand: string;
      user_name: string;
      user_id: number;
    };
  };
}

export default function FavoriteCard({ favorite }: FavoriteCardProps) {
  const fetcher = useFetcher();

  const handleToggleFavorite = () => {
    fetcher.submit(
      { announcementId: favorite.announcement.id },
      {
        method: "POST",
        action: "/user/favorites",
      }
    );
  };

  return (
    <motion.li
      initial="hidden"
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      layoutId={String(favorite.id)}
    >
      <Link to={`/announcements/${favorite.announcement.id}/details`}>
        <div className="flex gap-6 px-6 py-3 bg-white rounded-lg shadow-sm">
          <div className="flex items-center max-w-[100px] h-[70px] rounded-md">
            <img
              src={favorite.announcement.photoUrl}
              alt={`${favorite.announcement.title} - img`}
              className="object-contain overflow-hidden"
            />
          </div>
          <div className="flex justify-between w-full items-center rounded-lg">
            <div className="flex flex-col">
              <p className="line-clamp-1">{favorite.announcement.title}</p>
              <p className="hidden sm:block">
                <span className="text-gray-500">Brand: </span>
                {favorite.announcement.brand}
              </p>
              <p className="hidden sm:block">
                <span className="text-gray-500">Published by: </span>
                {favorite.announcement.user_name}
              </p>
            </div>
            <button
              onClick={(event) => {
                event.preventDefault();
                handleToggleFavorite();
              }}
            >
              <svg
                fill="red"
                stroke="red"
                width="24"
                height="24"
                strokeWidth="1.4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
