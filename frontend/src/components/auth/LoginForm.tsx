"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

import { LogInSchema, LogInSchemaType } from "@/lib/validations/auth";
import { loginUser } from "@/services/auth.services";

export default function LogInForm() {
  const router = useRouter();

  const form = useForm<LogInSchemaType>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LogInSchemaType) => {
    try {
      const response = await loginUser(data);

      toast.success(response.message);

      form.reset();

      router.push("/me");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

        <p className="text-sm text-neutral-400">Sign in to your account</p>
      </div>

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          {...form.register("email")}
        />

        {form.formState.errors.email && (
          <p className="text-sm text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <PasswordInput
          placeholder="Password"
          autoComplete="current-password"
          {...form.register("password")}
        />

        {form.formState.errors.password && (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Logging In..." : "Log In"}
      </Button>
    </form>
  );
}
