import { useState, useEffect } from "react";
import { Announcement } from "../../types/interfaces";
import AnnouncementCard from "./AnnouncementCard";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementsAccordionProps {
  announcements: Announcement[];
}

export default function AnnouncementsAccordion({
  announcements,
}: AnnouncementsAccordionProps) {
  const [showMore, setShowMore] = useState(false);
  const [initialVisibleCount, setInitialVisibleCount] = useState(3); // Establecer 6 por defecto

  // Cambiar el numero de elementos visibles segun el tamaño de la ventana
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth > 1127) {
        setInitialVisibleCount(3);
      }
      if (window.innerWidth < 1127) {
        setInitialVisibleCount(4);
      }
      if (window.innerWidth < 950) {
        setInitialVisibleCount(2);
      }
      if (window.innerWidth < 550) {
        setInitialVisibleCount(1);
      }
    };

    updateVisibleCount();
    // Añadir el evento de redimensionado
    window.addEventListener("resize", updateVisibleCount);

    // Limpiar el evento de redimensionado cuando el componente se desmonta
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const totalVisibleCount = showMore
    ? announcements.length
    : initialVisibleCount;

  return (
    <>
      <motion.div
        layout
        className="bg-white rounded-lg shadow-sm text-black p-6"
      >
        <motion.h1 layout className="font-medium text-custom-orange text-lg">
          Announcements
        </motion.h1>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3"
        >
          {announcements.length > 0 ? (
            announcements.slice(0, totalVisibleCount).map((announcement) => (
              <motion.div
                key={announcement.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <AnnouncementCard announcement={announcement} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-start-1 col-end-2 sm:col-end-3 md:col-end-4 pb-4">
              The user has not published any advertisement
            </p>
          )}

          {}
        </motion.div>

        {announcements.length > 0 ? (
          <AnimatePresence>
            <motion.button
              hidden={announcements.length <= initialVisibleCount}
              onClick={() => setShowMore(!showMore)}
              className={`mt-4 py-1 px-7 rounded-lg transition duration-300 ${
                showMore
                  ? "bg-white text-custom-gray border border-custom-gray hover:text-gray-500 hover:border-gray-500"
                  : "bg-custom-gray text-white border border-custom-gray hover:bg-custom-gray-hover"
              }`}
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
