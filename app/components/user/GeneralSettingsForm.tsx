import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { User } from "../../types/interfaces";
import { useRef, useState } from "react";

interface ActionData {
  errors?: {
    [key: string]: string | undefined;
  };
  message?: string;
}

export default function GeneralSettingsForm() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { authUser } = useLoaderData<{ authUser: User }>();
  const [formData, setFormData] = useState({
    name: authUser.name,
    email: authUser.email,
    phone_number: authUser.phone_number,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Form
      method="post"
      className="bg-white p-6 rounded-lg shadow-md text-black"
      encType="multipart/form-data"
    >
      <input type="hidden" name="_method" value="PATCH" />
      <input type="hidden" name="actionType" value="generalSettings" />
      <p className="font-medium text-custom-orange">General information</p>
      <div className="mt-1 flex flex-col gap-3">
        <div className="grid sm:grid-cols-[2fr,1fr] gap-5">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="focus:ring-0 rounded-lg"
                name="name"
              />
              {actionData?.errors?.name && (
                <p className="text-red-500">{actionData.errors.name}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Your email"
                className="focus:ring-0 rounded-lg"
                name="email"
              />
              {actionData?.errors?.email && (
                <p className="text-red-500">{actionData.errors.email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">Phone number</label>
              <input
                type="number"
                onChange={handleChange}
                value={formData.phone_number}
                placeholder="Your phone number"
                className="focus:ring-0 rounded-lg"
                name="phone_number"
              />
              {actionData?.errors?.phone_number && (
                <p className="text-red-500">{actionData.errors.phone_number}</p>
              )}
            </div>
          </div>
          <div className="hidden mt-6 sm:flex flex-col items-center">
            <img
              src={previewImage || authUser.profile_picture_path}
              alt="user avatar"
              className="w-[120px] h-[120px] rounded-full object-contain"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              name="new_profile_picture"
              accept="image/*"
            />
            <button
              type="button"
              onClick={handleImageClick}
              className="py-1 w-[150px] mt-2 text-center bg-custom-orange text-white rounded-lg"
            >
              Update Photo
            </button>
          </div>
        </div>

        <div className="space-y-1 sm:hidden">
          <label htmlFor="picture">Profile picture</label>
          <img
            src={authUser.profile_picture_path}
            alt="user avatar"
            className="w-[120px] mt-6"
          />
        </div>
        <button
          type="submit"
          className={`w-[200px] mt-2 py-2 text-white rounded-lg transition duration-300 ${
            isSubmitting
              ? "bg-gray-400 "
              : "bg-custom-gray hover:bg-custom-gray-hover"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
        {actionData?.message && (
          <p className="text-green-500">{actionData.message}</p>
        )}
      </div>
    </Form>
  );
}
