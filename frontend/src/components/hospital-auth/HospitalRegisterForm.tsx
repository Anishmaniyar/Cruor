"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/auth/PasswordInput";
import HospitalAuthHeader from "./HospitalAuthHeader";

import {
  hospitalSignUpSchema,
  HospitalSignUpSchemaType,
} from "@/lib/validations/hospital";
import { useAuth } from "@/lib/auth-context";
import { registerHospital } from "@/services/auth.services";
import { getErrorMessage } from "@/lib/error";

export default function HospitalRegisterForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const form = useForm<HospitalSignUpSchemaType>({
    resolver: zodResolver(hospitalSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNo: "",
      registrationId: "",
    },
  });

  const onSubmit = async (data: HospitalSignUpSchemaType) => {
    try {
      const response = await registerHospital(data);

      signup(
        {
          id: response.data.hospital.id,
          name: response.data.hospital.name,
          email: response.data.hospital.email,
        },
        "hospital",
        response.data.accessToken,
      );

      toast.success("Hospital account created successfully");

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
        title="Register Your Hospital"
        description="Create a hospital account to join the network"
      />

      <div className="space-y-2">
        <Input
          placeholder="Hospital Name"
          autoComplete="organization"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-danger">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

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
        <Input
          type="tel"
          placeholder="Phone Number"
          autoComplete="tel"
          {...form.register("phoneNo")}
        />
        {form.formState.errors.phoneNo && (
          <p className="text-sm text-danger">
            {form.formState.errors.phoneNo.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Registration ID"
          autoComplete="off"
          {...form.register("registrationId")}
        />
        {form.formState.errors.registrationId && (
          <p className="text-sm text-danger">
            {form.formState.errors.registrationId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <PasswordInput
          placeholder="Password"
          autoComplete="new-password"
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
        {form.formState.isSubmitting
          ? "Creating Account..."
          : "Create Hospital Account"}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          href="/hospital/login"
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
