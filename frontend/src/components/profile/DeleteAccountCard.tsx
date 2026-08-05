import { Trash2, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DeleteAccountCard() {
  return (
    <Card className="border-danger/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger/10">
            <Trash2 size={20} className="text-danger" />
          </div>
          <div>
            <CardTitle className="text-danger">Delete Account</CardTitle>
            <CardDescription>
              Permanently remove your account and all associated data.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-start gap-3 rounded-xl bg-danger/5 p-4">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-danger" />
          <div>
            <p className="text-sm font-medium text-danger">Warning</p>
            <p className="mt-1 text-sm text-text-secondary">
              This action is irreversible. Once you delete your account, all your data including
              donation history, appointments, and personal information will be permanently
              removed. Please proceed with caution.
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full gap-2 border border-danger/20 bg-danger/5 text-danger hover:bg-danger/10 hover:text-danger"
          disabled
          title="Account deletion is not implemented on the backend yet"
        >
          <Trash2 size={16} />
          Delete My Account
        </Button>

        <p className="mt-3 text-center text-xs text-text-muted">
          Account deletion is not available yet — the backend does not expose a
          delete endpoint for donor accounts.
        </p>
      </CardContent>
    </Card>
  );
}
