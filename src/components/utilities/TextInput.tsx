import React, { useState } from "react";
import { useField } from "formik";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";

interface InputProps {
  label?: string;
  labelClassNames?: string;
  name: string;
  placeholder?: string;
  type: string;
  inputClassNames: string;
  containerClassNames: string;
  icon?: string;
  showPasswordToggle?: boolean;
}

const TextInput: React.FC<InputProps> = ({
  label,
  labelClassNames,
  inputClassNames,
  containerClassNames,
  icon,
  showPasswordToggle = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const errorInputClassNames = "bg-[#FFE8E8] text-[#FF0000]";
  const errorContainerClassNames = "border-red-500 bg-[#FFE8E8]";
  const finalContainerClassNames = `${containerClassNames} ${
    meta.touched && meta.error ? errorContainerClassNames : ""
  }`;
  const finalInputClassNames = `${inputClassNames} ${
    meta.touched && meta.error ? errorInputClassNames : ""
  }`;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {label && (
        <label className={labelClassNames} htmlFor={props.name}>
          {label}
        </label>
      )}
      <div className={`${finalContainerClassNames} relative`}>
        {icon && <img src={icon} alt="" />}
        <input
          className={finalInputClassNames}
          {...field}
          {...props}
          type={showPassword ? "text" : props.type}
        />
        {showPasswordToggle && props.type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <HiOutlineEye size={19} />
            ) : (
              <HiOutlineEyeSlash size={19} />
            )}
          </button>
        )}
      </div>
      <span className="text-xs text-[#FF0000] block mb-3">
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      </span>
    </>
  );
};

export default TextInput;
