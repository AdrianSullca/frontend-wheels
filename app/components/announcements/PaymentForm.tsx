import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Announcement } from "../../types/interfaces";

interface ActionData {
  errors?: {
    [key: string]: string | undefined;
  };
}

export default function PaymentForm() {
  const { announcement } = useLoaderData<{ announcement: Announcement }>();
  const actionData = useActionData<ActionData>();
  return (
    <Form method="post" className="text-black py-6 mx-5">
      <h1 className="text-2xl">Payment</h1>
      <div className="grid gap-6 pt-3">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="flex flex-col justify-around gap-4 w-full">
              <div className="flex flex-col gap-1">
                <label htmlFor="fullName" className="line-clamp-1">
                  Full name (as displayed on card)*
                </label>
                <input
                  placeholder="Full name"
                  type="text"
                  name="full_name"
                  id="fullName"
                  className="rounded-lg focus:ring-0"
                />
                {actionData?.errors?.full_name && (
                  <p className="text-red-500">{actionData.errors.full_name}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="cardNumber">Card number*</label>
                <input
                  placeholder="xxxx - xxxx - xxxx - xxxx"
                  name="card_number"
                  type="text"
                  id="cardNumber"
                  className="rounded-lg focus:ring-0"
                />
                {actionData?.errors?.card_number && (
                  <p className="text-red-500">
                    {actionData.errors.card_number}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-around w-full gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="cardExpiration">Card expiration*</label>
                <input
                  placeholder="mm/YYYY"
                  name="card_expiration"
                  type="text"
                  id="cardExpiration"
                  className="rounded-lg focus:ring-0"
                />
                {actionData?.errors?.card_expiration && (
                  <p className="text-red-500">
                    {actionData.errors.card_expiration}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="cvv">CVV*</label>
                <input
                  placeholder="123"
                  name="card_cvv"
                  type="text"
                  id="cvv"
                  className="rounded-lg focus:ring-0"
                />
                {actionData?.errors?.card_cvv && (
                  <p className="text-red-500">{actionData.errors.card_cvv}</p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-custom-gray text-white py-2 rounded-lg hover:bg-custom-gray-hover"
          >
            Pay now
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-2">
          <h1 className="text-xl font-semibold">
            {announcement.brand} - {announcement.model}
          </h1>
          <div className="flex justify-between">
            <p className="text-gray-600">Base price</p>
            <p className="">{announcement.price} €</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">VAT (21%)</p>
            <p className="">
              {(Number(announcement.price) * 0.21).toFixed(2)} €
            </p>
          </div>
          <div className="flex justify-between text-custom-orange">
            <p>Discount</p>
            <p className="font-medium">
              -{(Number(announcement.price) * 0.21).toFixed(2)} €
            </p>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p className="">{announcement.price} €</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-8">
          <img
            className="h-8 w-auto dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
            alt=""
          />
          <img
            className="hidden h-8 w-auto dark:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
            alt=""
          />
          <img
            className="h-8 w-auto dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
            alt=""
          />
          <img
            className="hidden h-8 w-auto dark:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
            alt=""
          />
          <img
            className="h-8 w-auto dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
            alt=""
          />
          <img
            className="hidden h-8 w-auto dark:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
            alt=""
          />
        </div>
      </div>
      <input
        type="hidden"
        name="announcementId"
        value={announcement.id}
        id=""
      />
    </Form>
  );
}
