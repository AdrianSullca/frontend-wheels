import FavoriteCard from "./FavoriteCard";
import { motion, AnimatePresence } from "framer-motion";

interface FavoriteProp {
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
}

interface FavoritesListProps {
  favorites: FavoriteProp[];
}

export default function FavoritesList({ favorites }: FavoritesListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}
      className="pb-6"
      layout
    >
      <h1 className="font-medium text-lg pb-4">Favorites list</h1>
      <motion.ul className="space-y-4">
        <AnimatePresence>
          {favorites.map((favorite) => (
            <FavoriteCard key={favorite.id} favorite={favorite} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
}
