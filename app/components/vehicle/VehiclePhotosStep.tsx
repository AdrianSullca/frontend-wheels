// app/components/vehicle/VehiclePhotosStep.tsx
import { useState } from "react";
import { FileInput, Label } from "flowbite-react";

interface VehiclePhotosStepProps {
  formData: {
    photos: File[];
  };
  onAddPhoto: (files: FileList) => void;
  onRemovePhoto: (index: number) => void;
}

export function VehiclePhotosStep({
  formData,
  onAddPhoto,
  onRemovePhoto,
}: VehiclePhotosStepProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    formData.photos.map((photo) => URL.createObjectURL(photo))
  );

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddPhoto(e.target.files);
      const urls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls((prev) => [...prev, ...urls]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    onRemovePhoto(index);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-[705px] mx-auto px-10 md:px-0">
      <p className="text-2xl py-4 text-center">Add photos of your vehicle</p>
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
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2l2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG, AVIF or GIF
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="hidden"
          />
        </Label>
      </div>
      <div className="flex gap-4 mt-4 flex-wrap justify-center">
        {previewUrls.length === 0 && (
          <div className="max-w-[102px] w-full aspect-square rounded-lg border-2 border-gray-300 flex items-center justify-center">
            <svg
              className="w-9 h-9 text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
          </div>
        )}
        {previewUrls.map((url, index) => (
          <div
            key={index}
            className="relative group max-w-[102px] w-full aspect-square rounded-lg overflow-hidden border-2 border-gray-300"
            role="button"
            tabIndex={0}
            onClick={() => handleRemovePhoto(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRemovePhoto(index);
              }
            }}
          >
            <img
              src={url}
              alt={`preview-${index}`}
              className="object-contain w-full h-full group-hover:bg-gray-500 transition duration-200"
            />

            <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
      </div>
    </div>
  );
}