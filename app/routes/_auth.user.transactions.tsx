import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { getUserByToken, requireAuth } from "../data/auth.server";
import TransactionsList from "../components/transactions/TransactionsList";
import { getUserTransactions } from "../data/transaction.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Transactions list" },
    { name: "description", content: "User transactions list" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const authToken = await requireAuth(request);
  const authUser = await getUserByToken(request);
  const transactions = await getUserTransactions(authToken);
  console.log(transactions);
  return json({ transactions, authUser });
};

export default function UserTransactionsPage() {
  return (
    <div className="max-w-[1400px] flex flex-col gap-4 mx-auto text-black px-10 pt-6">
      <TransactionsList />
    </div>
  );
}
