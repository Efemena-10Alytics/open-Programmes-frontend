import React from "react";
import { useField } from "formik";

interface SelectInputProps {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  containerClassNames?: string;
  labelClassNames?: string;
  disabled?: boolean;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  containerClassNames = "",
  labelClassNames = "",
  disabled = false,
  required = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    helpers.setValue(event.target.value);
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <div className={`flex flex-col ${containerClassNames}`}>
      {label && (
        <label
          htmlFor={name}
          className={`pb-1 text-[#6D6D6D] text-[12px] font-semibold ${labelClassNames}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          id={name}
          {...field}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`
            bg-[#F7F7F7] border-2 border-[#0000001A] rounded-[10px] w-full 
            text-[#6D6D6D] px-5 py-3 text-[13px] appearance-none
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${meta.touched && meta.error ? "border-red-500" : ""}
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Dropdown arrow icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>

      {meta.touched && meta.error && (
        <div className="mt-1 text-red-500 text-xs">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectInput;