"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/lib/validations/auth";
import { changePassword } from "@/services/auth.services";
import { getErrorMessage } from "@/lib/error";

export default function SecuritySettings() {
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      await changePassword(data);

      toast.success("Password changed successfully");

      form.reset();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to change password"));
    }
  };

  const passwordInputClass =
    "h-10 rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40 w-full";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your account password to keep your donor account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
              Current Password
            </label>
            <Input
              type="password"
              placeholder="Enter current password"
              className={passwordInputClass}
              autoComplete="current-password"
              {...form.register("currentPassword")}
            />
            {form.formState.errors.currentPassword && (
              <p className="mt-1 text-sm text-danger">
                {form.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
              New Password
            </label>
            <Input
              type="password"
              placeholder="Enter new password"
              className={passwordInputClass}
              autoComplete="new-password"
              {...form.register("newPassword")}
            />
            {form.formState.errors.newPassword && (
              <p className="mt-1 text-sm text-danger">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
              Confirm New Password
            </label>
            <Input
              type="password"
              placeholder="Confirm new password"
              className={passwordInputClass}
              autoComplete="new-password"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="mt-1 text-sm text-danger">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="gap-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
