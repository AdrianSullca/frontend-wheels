// app/components/announcements/AnnouncementForm.tsx
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { VehicleBrandStep } from "../vehicle/VehicleBrandStep";
import { VehicleTypeStep } from "../vehicle/VehicleTypeStep";
import { VehicleMoreInformation } from "../vehicle/VehicleMoreInformation";
import { VehiclePhotosStep } from "../vehicle/VehiclePhotosStep";
import { VehiclePriceStep } from "../vehicle/VehiclePriceStep";

interface formData {
  vehicleType: string;
  brand: string;
  year: string;
  price: number;
  model: string;
  title: string;
  description: string;
  kilometers: string;
  photos: File[];
}

interface ActionData {
  step?: number;
  formData?: formData;
}

export default function AnnouncementForm() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [step, setStep] = useState<number>(actionData?.step || 1);
  const [formData, setFormData] = useState<formData>({
    vehicleType: actionData?.formData?.vehicleType || "",
    brand: actionData?.formData?.brand || "",
    year: actionData?.formData?.year || "",
    price: actionData?.formData?.price || 0,
    model: actionData?.formData?.model || "",
    title: actionData?.formData?.title || "",
    description: actionData?.formData?.description || "",
    kilometers: actionData?.formData?.kilometers || "",
    photos: [],
  });

  const isNextButtonDisabled = () => {
    if (step === 1) {
      return !formData.vehicleType;
    } else if (step === 2) {
      return !formData.brand;
    } else if (step === 3) {
      console.log(formData);
      return (
        !formData.year ||
        !formData.model ||
        !formData.title ||
        !formData.description ||
        !formData.kilometers
      );
    } else if (step === 4) {
      return formData.photos.length === 0;
    } else if (step === 5) {
      return formData.price == 0 ? true : false;
    }
    return true;
  };

  useEffect(() => {
    if (actionData?.step) {
      setStep(actionData.step);
    }
    if (actionData?.formData) {
      setFormData((prev) => ({ ...prev, ...actionData.formData }));
    }
  }, [actionData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPhoto = (files: FileList) => {
    const newPhotos = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
    }));
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const syncFileInput = () => {
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      formData.photos.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  useEffect(() => {
    syncFileInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.photos]);

  const renderStep = () => {
    let StepComponent;
    switch (step) {
      case 1:
        StepComponent = VehicleTypeStep;
        break;
      case 2:
        StepComponent = VehicleBrandStep;
        break;
      case 3:
        StepComponent = VehicleMoreInformation;
        break;
      case 4:
        StepComponent = VehiclePhotosStep;
        break;
      case 5:
        StepComponent = VehiclePriceStep;
        break;
      default:
        return <div>An error has occurred</div>;
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2 }}
        >
          <StepComponent
            formData={formData}
            onChange={handleInputChange}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
          />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <Form method="post" encType="multipart/form-data">
      <input type="hidden" name="step" value={step} />
      {renderStep()}

      <div className="flex justify-center py-6 gap-4">
        <button
          type="submit"
          name="action"
          value="prev"
          disabled={step === 1 || navigation.state === "submitting"}
          className={`${
            step === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black"
          } shadow-sm px-5 py-2 rounded-xl transition-colors duration-600 flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="18"
            height="18"
            strokeWidth="2"
          >
            <path d="M15 6l-6 6l6 6"></path>
          </svg>
          <span className="pr-2">Prev</span>
        </button>
        {step < 5 ? (
          <button
            type="submit"
            name="action"
            value="next"
            className={`shadow-sm px-5 py-2 rounded-xl transition-colors duration-300 ease-in-out flex items-center justify-center ${
              !isNextButtonDisabled()
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }`}
            disabled={
              isNextButtonDisabled() || navigation.state === "submitting"
            }
          >
            <span className="pl-2">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="18"
              height="18"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            name="action"
            value="submit"
            className={`shadow-sm px-5 py-2 rounded-xl transition-colors duration-300 ease-in-out px-3 ${
              !isNextButtonDisabled()
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }`}
            disabled={
              isNextButtonDisabled() || navigation.state === "submitting"
            }
          >
            Upload announcement
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        name="photos[]"
        accept="image/*"
        multiple
        hidden
      />

      {Object.entries(formData).map(
        ([key, value]) =>
          key !== "photos" && (
            <input
              key={key}
              type="hidden"
              name={key}
              value={key === "price" ? value.toString() : (value as string)}
            />
          )
      )}
      
      <input type="hidden" name="state" value="active" />
    </Form>
  );
}
