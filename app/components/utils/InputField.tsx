import React from "react";

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  error,
}) => {
  return (
    <>
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        className={`bg-white rounded-lg border ${error ? "border-red-500" : "border-gray-200"} text-black p-2 w-full`}
      />
      {error && <span className="text-red-500">{error}</span>}
    </>
  );
};

export default InputField;
