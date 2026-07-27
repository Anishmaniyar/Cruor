"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

import { LogInSchema, LogInSchemaType } from "@/lib/validations/auth";
import { useAuth } from "@/lib/auth-context";

import { loginUser } from "@/services/auth.services";

export default function LogInForm() {
  const router = useRouter();
  const { login } = useAuth();

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

      login(
        {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
        },
        "donor",
      );

      toast.success("Login successful");

      form.reset();

      router.push("/dashboard");
    } catch (error: any) {
      const message = error.response?.data?.message || "something went wrong";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Welcome Back
        </h1>
        <p className="text-sm text-text-secondary">Sign in to your account</p>
      </div>

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          {...form.register("email")}
        />

        {form.formState.errors.email && (
          <p className="text-sm text-danger">
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
          <p className="text-sm text-danger">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Logging In..." : "Log In"}
      </Button>
    </form>
  );
}
