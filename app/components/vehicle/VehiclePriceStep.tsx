import { useState } from "react";
import { RangeSlider } from "flowbite-react";

interface VehiclePriceStepProps {
  formData: { vehicleType?: string; brand?: string; price?: number };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VehiclePriceStep({
  formData,
  onChange,
}: VehiclePriceStepProps) {
  const [price, setPrice] = useState<number>(formData?.price || 0);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setPrice(newValue);
    onChange(e);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= 0 && newValue <= 99999) {
      setPrice(newValue);
      onChange(e);
    }
  };

  return (
    <div>
      <p className="text-2xl pt-4 pb-24 text-center">
        Assign a price to your vehicle
      </p>
      <div className="max-w-[1250px] mx-auto min-h-[294px]">
        <div className="flex justify-center mb-4">
          <div className="relative max-w-[80px]">
            <input
              type="number"
              name="price"
              min={0}
              max={99999}
              value={price}
              onChange={handleInputChange}
              className="bg-custom-body focus:ring-0 rounded-lg border border-gray-200 text-black p-2 w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
              €
            </span>
          </div>
        </div>

        <div className="max-w-[650px] px-10 mx-auto">
          <RangeSlider
            id="md-range"
            name="price"
            sizing="md"
            min={0}
            max={99999}
            value={price}
            onChange={handleRangeChange}
          />
        </div>
      </div>
    </div>
  );
}
