"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  error: FieldErrors;
  disabled?: boolean;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  register,
  required,
  error,
  disabled,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-dark"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `form-input block w-full rounded-md border-none text-sm leading-6 text-dark ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 focus:ring-2 focus:ring-inset lg:text-base lg:leading-none focus:ring-main`,
            error[id] && "focus:ring-rose-500",
            disabled && "cursor-default opacity-50",
          )}
        />
        {setShowPassword && (
          <button
            onClick={() => setShowPassword!(!showPassword)}
            type="button"
            className="absolute right-3 top-[30%]"
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
