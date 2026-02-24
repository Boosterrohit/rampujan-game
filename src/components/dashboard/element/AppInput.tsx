import React, { useState } from "react"
import { ErrorMessage, useField } from "formik"
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface AppInputProps {
    id: string;
    label?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    value: string;
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    className?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isForm?: boolean;
}

const AppInput = ({
 id,
  label = '',
  placeholder = '',
  type = 'text',
  name = '',
  value,
  disabled = false,
  required = false,
  readonly = false,
  className,
  onBlur,
  onChange,
  onFocus,
  isForm = true,
}: AppInputProps) => {
  const [field, meta] = useField(name)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisible) => !prevVisible)
  }

  const inputType = type === "password" ? (isPasswordVisible ? "text" : "password") : type
  const inputProps =
  isForm && name ? { ...field } : { value, onChange, onBlur };
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id}>
          {label}
          {required ? <sup className="text-red-500 text-base">*</sup> : ""}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          {...inputProps}
          type={inputType}
          value={value}
          readOnly={readonly}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${className} 
            ${type === "password" ? "pr-10" : ""}
            ${meta.touched && meta.error ? "border-2 border-red-500 bg-transparent outline-none w-full p-2 rounded-md" : "border-2 border-white/35 bg-transparent text-white w-full p-2 outline-none rounded-md"}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isPasswordVisible ? <EyeIcon size={20}/> : <EyeOffIcon size={20}/>}
          </button>
        )}
      </div>
      {isForm && <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />}
    </div>
  )
}

export default AppInput

