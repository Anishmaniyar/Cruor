"use client";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchemaType } from "@/lib/validations/auth";
import { registerUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNo: "",
      gender: "male",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const response = await registerUser(data);
      toast.success(response.message);

      form.reset();

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input type="text" placeholder="Full Name" {...form.register("name")} />

      <p className="text-sm text-red-500">
        {form.formState.errors.name?.message}
      </p>

      <Input placeholder="Email" {...form.register("email")} />
      <p className="text-sm text-red-500">
        {form.formState.errors.email?.message}
      </p>

      <Input type="tel" placeholder="Phone No." {...form.register("phoneNo")} />

      <p className="text-sm text-red-500">
        {form.formState.errors.phoneNo?.message}
      </p>

      <PasswordInput placeholder="Password" {...form.register("password")} />

      <p className="text-sm text-red-500">
        {form.formState.errors.password?.message}
      </p>

      <Controller
        name="gender"
        control={form.control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value ?? "male"}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <p className="text-sm text-red-500">
        {form.formState.errors.gender?.message}
      </p>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Creating Account..." : "Register"}
      </Button>
    </form>
  );
}
