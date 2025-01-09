import { Announcement, Model } from "../../types/interfaces";
import { motion } from "framer-motion";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FileInput, Label } from "flowbite-react";

interface ActionData {
  errors?: {
    [key: string]: string | undefined;
  };
  message?: string;
}

interface AnnouncementFormUpdateProps {
  announcement: Announcement;
}

export default function AnnouncementFormUpdate({
  announcement,
}: AnnouncementFormUpdateProps) {
  const actionData = useActionData<ActionData>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const { brands, vehicleTypes, years } = useLoaderData<{
    brands: string[];
    vehicleTypes: string[];
    years: string[];
  }>();

  const [oldPhotos, setOldPhotos] = useState<string[]>([
    ...announcement.photoUrls,
  ]);

  const [newPhotosUrl, setNewPhotosUrl] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    title: announcement.title,
    state: announcement.state,
    description: announcement.description,
    price: announcement.price,
    brand: announcement.brand,
    year: announcement.year,
    model: announcement.model,
    kilometers: announcement.kilometers,
    vehicleType: announcement.vehicleType,
    oldPhotos: [...announcement.photoUrls],
  });

  const syncFileInput = () => {
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      newPhotos.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  useEffect(() => {
    syncFileInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPhotos]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRemoveOldPhoto = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setOldPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewPhoto = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setNewPhotos((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setNewPhotosUrl((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

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

  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewPhotos((prevFiles) => [...prevFiles, ...filesArray]); // Agregar nuevas fotos al estado

      // Mostrar vista previa de las imagenes
      const newUrls = filesArray.map((file) => URL.createObjectURL(file));
      setNewPhotosUrl((prevUrls) => [...prevUrls, ...newUrls]); // Almacenar las URLs de las nuevas fotos

      e.target.value = ""; // Limpiar el input después de agregar
    }
  };

  useEffect(() => {
    if (formData.year && formData.brand != "other") {
      getModelsByYear(formData.year);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.year, formData.brand]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}
      layout
    >
      <Form
        method="POST"
        encType="multipart/form-data"
        className="flex flex-col max-w-[1100px] mx-auto text-black py-5"
      >
        <input
          ref={fileInputRef}
          type="file"
          name="newPhotos[]"
          accept="image/*"
          multiple
          hidden
        />
        <input type="hidden" name="_method" value="PATCH" />
        <div className="bg-white p-6 w-full rounded-lg shadow-sm space-y-4">
          {actionData?.message && (
            <p className="text-green-500">{actionData.message}</p>
          )}
          <div>
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <h2 className="font-semibold text-custom-orange mb-2 text-lg">
                  Title
                </h2>
                <input
                  type="text"
                  value={formData.title}
                  name="title"
                  className="focus:ring-0  text-black w-full rounded-lg"
                  onChange={handleChange}
                />
                {actionData?.errors?.title && (
                  <p className="text-red-500">{actionData.errors.title}</p>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-custom-orange mb-2 text-lg">
                  State
                </h2>
                <select
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="focus:ring-0 rounded-lg w-[170px]"
                >
                  <option value="active" key="active">
                    Active
                  </option>
                  <option value="inactive" key="inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>
            <h2 className="font-semibold text-custom-orange mb-2 text-lg mt-4">
              Photos of your vehicle
            </h2>
            <div className="flex gap-2 flex-wrap">
              <div className="flex w-full items-center justify-center">
                <Label
                  htmlFor="dropzone-file"
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <FileInput
                    id="dropzone-file"
                    accept="image/*"
                    multiple
                    onChange={handleAddPhotos}
                    className="hidden"
                  />
                </Label>
              </div>
              {oldPhotos.map((url, index) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  key={index}
                  className="relative group max-w-[102px] w-full aspect-square rounded-lg overflow-hidden border-2 border-gray-300 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => handleRemoveOldPhoto(index, e)}
                >
                  <img
                    src={url}
                    alt={`preview-${index}`}
                    className="object-cover w-full h-full transition duration-200 group-hover:brightness-50"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {newPhotosUrl.map((url, index) => (
                <div
                  key={index}
                  className="relative group max-w-[102px] w-full aspect-square rounded-lg overflow-hidden border-2 border-gray-300 cursor-pointer"
                >
                  <img
                    src={url}
                    alt={`new-preview-${index}`}
                    className="object-cover w-full h-full transition duration-200 group-hover:brightness-50"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={(e) => handleRemoveNewPhoto(index, e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <input
                type="hidden"
                name="oldPhotos"
                value={JSON.stringify(oldPhotos)}
              />
            </div>
            {actionData?.errors?.photos && (
              <p className="text-red-500">{actionData.errors.photos}</p>
            )}
          </div>
        </div>

        <div className="gap-6 mt-5">
          <div className="flex flex-col items-center gap-6 col-start-1 col-end-2">
            <div className="bg-white p-6 w-full rounded-lg shadow-sm space-y-4">
              <div>
                <h2 className="font-semibold text-custom-orange mb-2 text-lg">
                  Description
                </h2>
                <textarea
                  className="focus:ring-0 rounded-lg w-full h-[70px] resize-none"
                  value={formData.description}
                  name="description"
                  onChange={handleChange}
                />
                {actionData?.errors?.description && (
                  <p className="text-red-500">
                    {actionData.errors.description}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-custom-orange mb-2 text-lg">
                  Vehicle Details
                </h2>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Price</td>
                      <td className="py-2 text-right relative">
                        <input
                          type="number"
                          className="focus:ring-0 rounded-lg w-[170px] pr-10"
                          value={formData.price}
                          name="price"
                          onChange={handleChange}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black">
                          €
                        </span>
                        {actionData?.errors?.price && (
                          <p className="text-red-500">
                            {actionData.errors.price}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Body type</td>
                      <td className="py-2 text-right">
                        <select
                          name="vehicleType"
                          id="vehicleType"
                          value={formData.vehicleType}
                          className="focus:ring-0 rounded-lg w-[170px]"
                          onChange={handleChange}
                        >
                          <option value="">Select body type</option>
                          {vehicleTypes.map((vehicleType) => (
                            <option
                              key={vehicleType.toLowerCase()}
                              value={vehicleType.toLowerCase()}
                            >
                              {vehicleType}
                            </option>
                          ))}
                        </select>
                        {actionData?.errors?.vehicleType && (
                          <p className="text-red-500">
                            {actionData.errors.vehicleType}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Brand</td>
                      <td className="py-2 text-right">
                        <select
                          name="brand"
                          id="brand"
                          value={formData.brand}
                          onChange={(e) => {
                            handleChange(e);
                            setModels([]);
                          }}
                          className="focus:ring-0 rounded-lg w-[170px]"
                        >
                          <option value="">Select a brand</option>
                          {brands.map((brand) => (
                            <option
                              key={brand.toLowerCase()}
                              value={brand.toLowerCase()}
                            >
                              {brand}
                            </option>
                          ))}
                          <option value="other" key="other">
                            Other
                          </option>
                        </select>
                        {actionData?.errors?.brand && (
                          <p className="text-red-500">
                            {actionData.errors.brand}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Year</td>
                      <td className="py-2 text-right">
                        <select
                          id="year"
                          name="year"
                          value={formData.year?.toString()}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          className="focus:ring-0 rounded-lg w-[170px]"
                        >
                          <option value="">Select a year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        {actionData?.errors?.year && (
                          <p className="text-red-500">
                            {actionData.errors.year}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Model</td>
                      <td className="py-2 text-right">
                        {formData.brand != "other" ? (
                          <select
                            name="model"
                            id="model"
                            value={formData.model}
                            onChange={handleChange}
                            disabled={
                              !formData.year || !formData.brand || loading
                            }
                            className="focus:ring-0 rounded-lg w-[170px]"
                          >
                            <option value="">
                              {loading
                                ? "Loading models..."
                                : !formData.brand
                                ? "Select a brand"
                                : !formData.year
                                ? "Select a year"
                                : "Select a model"}
                            </option>
                            {models.map((model) => (
                              <option
                                key={model.Model_ID}
                                value={model.Model_Name}
                              >
                                {model.Model_Name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            name="model"
                            id="model"
                            className="focus:ring-0 rounded-lg w-[170px]"
                            placeholder="Vehicle model"
                          />
                        )}
                        {actionData?.errors?.model && (
                          <p className="text-red-500">
                            {actionData.errors.model}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Kilometers</td>
                      <td className="py-2 text-right relative">
                        <input
                          type="text"
                          className="focus:ring-0 rounded-lg w-[170px] pr-10"
                          value={formData.kilometers}
                          name="kilometers"
                          onChange={handleChange}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black">
                          km
                        </span>
                        {actionData?.errors?.kilometers && (
                          <p className="text-red-500">
                            {actionData.errors.kilometers}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Doors</td>
                      <td className="py-2 text-right">2</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Seats</td>
                      <td className="py-2 text-right">4</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Color</td>
                      <td className="py-2 text-right">White</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col sm:flex-row gap-2 ">
          <button
            type="submit"
            className="bg-custom-gray hover:bg-custom-gray-hover text-white py-2 px-5 rounded-lg w-full sm:order-2"
          >
            Save changes
          </button>
          <button className="w-full rounded-lg border border-custom-gray-hover py-2 px-5 hover:text-custom-gray-hover sm:order-1">
            Back
          </button>
        </div>
      </Form>
    </motion.div>
  );
}
