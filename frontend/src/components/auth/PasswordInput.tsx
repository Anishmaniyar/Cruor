"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

type PasswordInputProps = React.ComponentProps<"input">;

export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
      />

      <button
        type="button"
        onClick={togglePasswordVisiblity}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
