"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  placeholder,
  type,
  required,
  register,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        className="w-full rounded-full bg-neutral-100 px-4 py-2 font-light text-dark placeholder:text-gray-600 focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
