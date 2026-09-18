"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/auth/PasswordInput";
import HospitalAuthHeader from "./HospitalAuthHeader";

import { HospitalLogInSchemaType } from "@/lib/validations/hospital";
import { useAuth } from "@/lib/auth-context";
import { loginHospital } from "@/services/auth.services";
import { getErrorMessage } from "@/lib/error";

export default function HospitalLoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<HospitalLogInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: HospitalLogInSchemaType) => {
    try {
      // A failed login must surface the real API error (wrong password,
      // backend unreachable) instead of faking a session with "demo-token",
      // which is not a real JWT and makes every later request 401.
      const response = await loginHospital(data);

      login(
        {
          id: response.data.hospital.id,
          name: response.data.hospital.name,
          email: data.email,
        },
        "hospital",
        response.data.accessToken,
      );

      toast.success(response.data.message ?? "Hospital login successful");

      form.reset();

      router.push("/hospital/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error, "something went wrong"));
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <HospitalAuthHeader
        title="Hospital Login"
        description="Sign in to your hospital account"
      />

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email Address"
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
        {form.formState.isSubmitting ? "Logging In..." : "Login"}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link
          href="/hospital/register"
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Register Hospital
        </Link>
      </p>
    </form>
  );
}
