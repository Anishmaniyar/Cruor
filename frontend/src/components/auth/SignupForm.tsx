"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

import { signUpSchema, SignUpSchemaType } from "@/lib/validations/auth";

import { registerUser } from "@/services/auth.services";

export default function SignupForm() {
  const router = useRouter();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      gender: "male",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const response = await registerUser(data);

      toast.success(response.message);

      form.reset();

      router.push("/login");
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
      {/* Heading */}

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>

        <p className="text-sm text-neutral-400">
          Join VitalDrops and save lives.
        </p>
      </div>

      {/* Full Name */}

      <div className="space-y-2">
        <Input
          placeholder="Full Name"
          autoComplete="name"
          {...form.register("name")}
        />

        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}

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

      {/* Phone */}

      <div className="space-y-2">
        <Input
          placeholder="Phone Number"
          autoComplete="tel"
          {...form.register("phoneNo")}
        />

        {form.formState.errors.phoneNo && (
          <p className="text-sm text-red-500">
            {form.formState.errors.phoneNo.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div className="space-y-2">
        <PasswordInput
          placeholder="Password"
          autoComplete="new-password"
          {...form.register("password")}
        />

        {form.formState.errors.password && (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Gender */}

      <div className="space-y-2">
        <select
          {...form.register("gender")}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all focus:border-white/20 focus:ring-2 focus:ring-white/10"
        >
          <option value="male" className="bg-neutral-900">
            Male
          </option>

          <option value="female" className="bg-neutral-900">
            Female
          </option>

          <option value="other" className="bg-neutral-900">
            Other
          </option>
        </select>

        {form.formState.errors.gender && (
          <p className="text-sm text-red-500">
            {form.formState.errors.gender.message}
          </p>
        )}
      </div>

      {/* Button */}

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
