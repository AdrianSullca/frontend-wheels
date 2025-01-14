import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { requireAuth } from "../data/auth.server";
import axios from "axios";
import AnnouncementCard from "../components/announcements/AnnouncementCard";
import { Announcement } from "../types/interfaces";
import { getBrands } from "../data/announcement.server";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Announcements" },
    { name: "description", content: "View all announcements" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

  const authToken = await requireAuth(request);

  const response = await axios.get("http://localhost:8000/api/announcements", {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  const announcements = response.data.announcements as Announcement[];
  const brands = await getBrands();

  const startIndex = (page - 1) * pageSize;
  const paginatedAnnouncements = announcements.slice(
    startIndex,
    startIndex + pageSize
  );

  return json({
    announcements: paginatedAnnouncements,
    brands,
    total: announcements.length,
    page,
    pageSize,
  });
};

export default function AnnouncementsPage() {
  const { announcements, brands, total, page, pageSize } =
    useLoaderData<typeof loader>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredAnnouncements = announcements.filter(
    (announcement: Announcement) => {
      const matchesSearch = announcement.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand
        ? announcement.brand?.toLowerCase() === selectedBrand.toLowerCase()
        : true;
      return matchesSearch && matchesBrand;
    }
  );

  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: newPage.toString(),
      pageSize: pageSize.toString(),
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="pt-8 announcements-container max-w-[1780px] mx-auto">
          <div className="mx-5 mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-black focus:ring-0 p-2 border rounded-md"
            />

            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full sm:w-1/4 text-black p-2 focus:ring-0 border rounded-md"
            >
              <option value="">All Brands</option>
              {brands.map((brand: string) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mx-5">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement: Announcement) => (
                <AnnouncementCard
                  announcement={announcement}
                  key={announcement.id}
                />
              ))
            ) : (
              <p className="text-black text-center col-start-1 col-end-7">
                No announcements available.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center py-6 space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="py-2 px-4 bg-white text-black rounded-lg border border-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-black">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="py-2 px-4 bg-custom-gray rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
