"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

import { LogInSchemaType } from "@/lib/validations/auth";
import { useAuth } from "@/lib/auth-context";

import { loginUser } from "@/services/auth.services";
import { getErrorMessage } from "@/lib/error";

export default function LogInForm() {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<LogInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LogInSchemaType) => {
    try {
      // A failed login must surface the real API error (wrong password,
      // backend unreachable) instead of faking a session with "demo-token",
      // which is not a real JWT and makes every later request 401.
      const response = await loginUser(data);

      login(
        {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
        },
        "donor",
        response.data.accessToken,
      );

      toast.success("Login successful");

      form.reset();

      router.push("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error, "something went wrong"));
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-text-primary">
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
