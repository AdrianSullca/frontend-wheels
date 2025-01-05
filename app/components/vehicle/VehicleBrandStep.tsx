import { useLoaderData } from "@remix-run/react";

interface VehicleBrandStepProps {
  formData: { vehicleType?: string; brand?: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VehicleBrandStep({
  formData,
  onChange,
}: VehicleBrandStepProps) {
  const { brands } = useLoaderData<{ brands: string[] }>();

  return (
    <div className="max-w-[1250px] mx-auto px-10">
      <p className="text-2xl py-4 text-center">
        Select the brand of your vehicle
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand: string) => (
          <div key={brand} className="block max-w-[300px]">
            <label
              className={`block p-6 rounded-lg shadow text-center cursor-pointer bg-white 
            ${
              formData.brand === brand.toLowerCase()
                ? "outline outline-2 outline-black bg-white"
                : ""
            }`}
            >
              <input
                type="radio"
                name="brand"
                value={brand.toLowerCase()}
                onChange={onChange}
                checked={formData.brand === brand.toLowerCase()}
                className="hidden"
              />
              <span className="">{brand}</span>
            </label>
          </div>
        ))}
        <div className="block max-w-sm">
          <label
            className={`block p-6 rounded-lg shadow text-center cursor-pointer bg-white 
            ${
              formData.brand === "other"
                ? "outline outline-2 outline-black bg-white"
                : ""
            }`}
          >
            <input
              type="radio"
              name="brand"
              value="other"
              onChange={onChange}
              checked={formData.brand === "other"}
              className="hidden"
            />
            <span className="">OTHER</span>
          </label>
        </div>
      </div>
    </div>
  );
}
