import React from "react";
import { Controller } from "react-hook-form";

interface CustomFormFieldProps {
  fieldType: string;
  control: any;
  name: string;
  label: string;
  placeholder?: string;
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  fieldType,
  control,
  name,
  label,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-white font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type={fieldType === "password" ? "password" : "text"}
            placeholder={placeholder}
            className="pl-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            {...field}
          />
        )}
      />
    </div>
  );
};

export default CustomFormField;
