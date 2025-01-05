import { Carousel } from "flowbite-react";

interface AnnouncementCardProps {
  key: number;
  title: string;
  price: number;
  user_name: string;
  brand: string;
  photoUrls: string[];
}

export default function AnnouncementCard({
  title,
  price,
  user_name,
  photoUrls,
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
          {photoUrls.length > 0 ? (
            photoUrls.map((url, index) => (
              <div key={index} className="relative h-full w-full">
                <img
                  src={url}
                  alt={`${title} - img ${index + 1}`}
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
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {photoUrls.map((_, index) => (
            <span
              key={index}
              className="w-1.5 h-1.5 bg-white rounded-full opacity-50"
            ></span>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-black line-clamp-1">{title}</p>
        <p className="text-gray-600">{user_name}</p>
        <p className="text-gray-600 font-bold pt-1">{price.toFixed(2)} €</p>
      </div>
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
