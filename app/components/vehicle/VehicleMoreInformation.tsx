import axios from "axios";
import { useState } from "react";
import { Model } from "../../types/interfaces";

interface VehicleMoreInformationStepProps {
  formData: {
    vehicleType?: string;
    brand?: string;
    kilometers?: string;
    year?: string;
    model?: string;
    title?: string;
    description?: string;
  };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export function VehicleMoreInformation({
  formData,
  onChange,
}: VehicleMoreInformationStepProps) {
  const [selectedYear, setSelectedYear] = useState(formData.year || "");
  const [selectedModel, setSelectedModel] = useState(formData.model || "");
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const years = Array.from({ length: 25 }, (_, i) => 2000 + i);

  const getModelsByYear = async (year: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${formData.brand}/modelyear/${year}?format=json`
      );
      const data = response.data;
      const uniqueModels = Array.from(
        new Set(data.Results.map((model: Model) => model.Model_Name))
      ).map((name) => {
        return data.Results.find((model: Model) => model.Model_Name === name);
      });
      setModels(uniqueModels);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year);
    setSelectedModel("");
    if (year) {
      getModelsByYear(year);
    } else {
      setModels([]);
    }
    onChange(e);
  };

  const handleModelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSelectedModel(e.target.value);
    onChange(e);
  };

  return (
    <div className="max-w-[650px] mx-auto px-10">
      <p className="text-2xl py-4 text-center">
        Add more information about your vehicle
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              disabled
              name=""
              id=""
              value={
                formData.brand
                  ? formData.brand.charAt(0).toUpperCase() +
                    formData.brand.slice(1)
                  : ""
              }
              className="bg-white focus:ring-0 rounded-lg border border-gray-200 text-black p-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="kilometers">Kilometers</label>
            <input
              type="number"
              name="kilometers"
              id="kilometers"
              value={formData.kilometers || ""}
              onChange={onChange}
              placeholder="Vehicle kilometers"
              min="0"
              className="bg-white focus:ring-0 rounded-lg border border-gray-200 text-black p-2 w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={formData.year?.toString() || selectedYear}
              onChange={handleYearChange}
              className="bg-white focus:ring-0 rounded-lg border border-gray-200 text-black p-2 w-full"
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="model" className="">
              Model
            </label>
            <select
              id="model"
              name="model"
              value={formData.model || selectedModel}
              onChange={handleModelChange}
              hidden={formData.brand == "other"}
              disabled={!formData.year || loading }
              className="bg-white focus:ring-0 rounded-lg border border-gray-200 text-black p-2 w-full"
            >
              <option value="">
                {loading
                  ? "Loading models..."
                  : selectedYear
                  ? "Select a model"
                  : "Select a year first"}
              </option>
              {models.map((model) => (
                <option key={model.Model_ID} value={model.Model_Name}>
                  {model.Model_Name}
                </option>
              ))}
            </select>
            <input
              type="text"
              id="model"
              name="model"
              value={selectedModel}
              onChange={handleModelChange}
              hidden={formData.brand != "other"}
              className="bg-white focus:ring-0 rounded-lg border border-gray-200 text-black p-2 w-full"
              placeholder="Select the model of your vehicle"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title || ""}
            onChange={onChange}
            placeholder="Add a title for the announcement"
            className="bg-white focus:ring-0 rounded-lg border border-gray-200 text-black p-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description || ""}
            onChange={onChange}
            rows={3}
            placeholder="Add a description for the announcement"
            className="bg-white focus:ring-0 rounded-lg border border-gray-200 text-black p-2 w-full resize-none"
          />
        </div>
      </div>
    </div>
  );
}
