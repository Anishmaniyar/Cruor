"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

import { BLOOD_GROUPS, signUpSchema, SignUpSchemaType } from "@/lib/validations/auth";
import { useAuth } from "@/lib/auth-context";
import { registerUser } from "@/services/auth.services";
import { getErrorMessage } from "@/lib/error";

const selectClassName =
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40";

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      gender: "male",
      bloodGroup: undefined,
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const response = await registerUser(data);

      signup(
        {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
        },
        "donor",
        response.data.accessToken,
      );

      toast.success("Account created successfully");

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
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Create Account
        </h1>
        <p className="text-sm text-text-secondary">
          Join VitalDrops and save lives.
        </p>
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Full Name"
          autoComplete="name"
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
        <Input
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

      <div className="space-y-2">
        <Input
          type="date"
          placeholder="Date of Birth"
          {...form.register("dateOfBirth")}
        />
        {form.formState.errors.dateOfBirth && (
          <p className="text-sm text-danger">
            {form.formState.errors.dateOfBirth.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <select
          {...form.register("bloodGroup")}
          className={selectClassName}
        >
          <option value="" className="bg-surface text-text-primary">
            Select Blood Group
          </option>
          {BLOOD_GROUPS.map((bg) => (
            <option key={bg} value={bg} className="bg-surface text-text-primary">
              {bg}
            </option>
          ))}
        </select>
        {form.formState.errors.bloodGroup && (
          <p className="text-sm text-danger">
            {form.formState.errors.bloodGroup.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <select
          {...form.register("gender")}
          className={selectClassName}
        >
          <option value="male" className="bg-surface text-text-primary">
            Male
          </option>
          <option value="female" className="bg-surface text-text-primary">
            Female
          </option>
          <option value="other" className="bg-surface text-text-primary">
            Other
          </option>
        </select>
        {form.formState.errors.gender && (
          <p className="text-sm text-danger">
            {form.formState.errors.gender.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
