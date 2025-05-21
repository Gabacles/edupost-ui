import { useState } from "react";
import { Input } from "@/components/shared/input";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface FormInputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  maxLength,
  className,
  registration,
  error,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const errorStyle = "border-red-500";

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <Input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={cn(className, "pr-10", error && errorStyle)}
          maxLength={maxLength}
          {...registration}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <LuEyeClosed size={18} /> : <LuEye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-sm mt-1 block">{error.message}</span>
      )}
    </div>
  );
}
