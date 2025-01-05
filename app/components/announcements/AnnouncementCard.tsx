import { Link } from "@remix-run/react";
import { Carousel } from "flowbite-react";
import { Announcement } from "../../types/interfaces";

interface AnnouncementCardProps {
  announcement: Announcement;
  key: number;
}

export default function AnnouncementCard({
  announcement,
}: AnnouncementCardProps) {
  return (
    <div className="block rounded-xl max-w-[480px] mx-auto w-full">
      <div className="aspect-square overflow-hidden rounded-xl relative group">
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
                <Link
                  to={`/announcements/${announcement.id}/details`}
                  className="h-full w-full"
                >
                  <img
                    src={url}
                    alt={`${announcement.title} - img ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </Link>
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

      <Link
        to={`/announcements/${announcement.id}/details`}
        className="block pt-3"
      >
        <p className="text-black line-clamp-1">{announcement.title}</p>
        <p className="text-gray-600">{announcement.user.name}</p>
        <p className="text-gray-600 font-bold pt-1">
          {Number(announcement.price).toFixed(2)} €
        </p>
      </Link>
    </div>
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
