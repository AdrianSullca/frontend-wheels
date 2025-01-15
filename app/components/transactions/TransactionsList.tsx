import { useLoaderData } from "@remix-run/react";
import TransactionListItem from "./TransactionListItem";
import { motion, AnimatePresence } from "framer-motion";

interface Transaction {
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
}

export default function TransactionsList() {
  const { transactions } = useLoaderData<{ transactions: Transaction[] }>();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}
      className="pb-6"
      layout
    >
      <h1 className="font-medium text-lg pb-4">Transactions list</h1>
      <motion.ul className="space-y-4">
        <AnimatePresence>
          {transactions.map((transaction) => (
            <TransactionListItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
}
