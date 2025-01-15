import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { User } from "../../types/interfaces";

interface TransactionListItemProps {
  transaction: {
    id: number;
    buyer_id: number;
    buyer_name: string;
    seller_id: number;
    final_price: string;
    card_number: string;
    announcement: {
      id: number;
      photoUrl: string;
      title: string;
    };
  };
}

export default function FavoriteCard({
  transaction,
}: TransactionListItemProps) {
  const { authUser } = useLoaderData<{ authUser: User }>();

  const isPurchase = transaction.buyer_id === authUser.id;

  const priceSign = isPurchase ? "-" : "+";
  const buttonBorderColor = isPurchase
    ? "border-red-500 text-red-500"
    : "border-green-500 text-green-500";
  const buttonText = isPurchase ? "Purchase" : "Sale";

  return (
    <motion.li
      initial="hidden"
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      layoutId={String(transaction.id)}
    >
      <div className="flex items-center gap-6 px-6 py-3 bg-white rounded-lg shadow-sm">
        <img
          src={transaction.announcement.photoUrl}
          alt={transaction.announcement.title}
          className="max-w-[100px] object-contain overflow-hidden rounded-lg"
        />
        <div className="flex justify-between w-full">
          <div>
            <p className="text-gray-500">Title of announcement</p>
            <p>{transaction.announcement.title}</p>
          </div>
          <div>
            <p className="text-gray-500">Seller</p>
            <p>{transaction.buyer_name}</p>
          </div>
          <div>
            <p className="text-gray-500">Payment card</p>
            <p>*** {transaction.card_number.slice(-4)}</p>
          </div>
          <div>
            <p className="text-gray-500">Price</p>
            <p>
              {priceSign} {transaction.final_price} €
            </p>
          </div>
          <div>
            <button
              className={`px-4 py-2 rounded-lg ${buttonBorderColor} border-2`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
