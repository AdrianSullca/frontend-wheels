interface VehicleTypeStepProps {
  formData: { vehicleType?: string; brand?: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VehicleTypeStep({ formData, onChange }: VehicleTypeStepProps) {
  return (
    <div className="max-w-[1250px] mx-auto px-10">
      <p className="text-2xl py-4 text-center">Select your vehicle type</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="block max-w-[490px] mx-auto">
          <label
            className={`block p-6 rounded-lg shadow text-center cursor-pointer 
              ${
                formData.vehicleType === "sport"
                  ? "outline outline-2 outline-black bg-white"
                  : "bg-white"
              }`}
          >
            <input
              type="radio"
              name="vehicleType"
              value="sport"
              onChange={onChange}
              checked={formData.vehicleType === "sport"}
              className="hidden"
            />
            <img
              src="/sport-icon.png"
              alt="Sport"
              className="w-full object-contain h-[200px] mb-2"
            />
            <span>SPORT</span>
          </label>
        </div>

        <div className="block max-w-[490px] mx-auto">
          <label
            className={`block p-6 rounded-lg shadow text-center cursor-pointer 
              ${
                formData.vehicleType === "sedan"
                  ? "outline outline-2 outline-black bg-white"
                  : "bg-white"
              }`}
          >
            <input
              type="radio"
              name="vehicleType"
              value="sedan"
              onChange={onChange}
              checked={formData.vehicleType === "sedan"}
              className="hidden"
            />
            <img
              src="/sedan-icon.png"
              alt="Sedan"
              className="w-full h-[200px] object-contain mb-2"
            />
            <span>SEDAN</span>
          </label>
        </div>

        <div className="block max-w-[490px]  mx-auto">
          <label
            className={`block p-6 rounded-lg shadow text-center cursor-pointer 
      ${
        formData.vehicleType === "van"
          ? "outline outline-2 outline-black bg-white"
          : "bg-white"
      }`}
          >
            <input
              type="radio"
              name="vehicleType"
              value="van"
              onChange={onChange}
              checked={formData.vehicleType === "van"}
              className="hidden"
            />
            <img
              src="/van-icon.png"
              alt="Van"
              className="w-full object-contain h-[200px] mb-2"
            />
            <span>VAN</span>
          </label>
        </div>

        <div className="block max-w-[490px] mx-auto">
          <label
            className={`block p-6 rounded-lg shadow text-center cursor-pointer 
              ${
                formData.vehicleType === "other"
                  ? "outline outline-2 outline-black bg-white"
                  : "bg-white"
              }`}
          >
            <input
              type="radio"
              name="vehicleType"
              value="other"
              onChange={onChange}
              checked={formData.vehicleType === "other"}
              className="hidden"
            />
            <img
              src="/other-icon.png"
              alt="Other"
              className="w-full object-contain h-[200px] mb-2"
            />
            <span>OTHER</span>
          </label>
        </div>
      </div>
    </div>
  );
}
