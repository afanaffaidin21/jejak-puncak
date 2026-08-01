"use client";

import { LogOut, Trash2 } from "lucide-react";
import { useState } from "react";

import { logoutAction } from "@/app/login/actions";
import { deleteAccountAction } from "@/app/profile/actions";
import { FormFeedback } from "@/components/profile/form-feedback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/analytics";

export function AccountSection() {
  const [confirmation, setConfirmation] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    status: "error" | "success" | null;
  }>({ message: "", status: null });

  const logout = async () => {
    trackEvent("logout_click", { source: "profile" });
    setIsLoggingOut(true);
    try {
      const result = await logoutAction();
      if (result.success) {
        window.location.replace("/");
        return;
      }
      setFeedback({ message: result.message, status: "error" });
    } catch {
      setFeedback({
        message: "Logout belum dapat diproses. Silakan coba lagi.",
        status: "error",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const deleteAccount = async () => {
    if (confirmation !== "HAPUS") return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      const result = await deleteAccountAction();
      if (result.success) {
        window.location.replace("/");
        return;
      }
      setDeleteError(result.message);
    } catch {
      setDeleteError("Akun belum dapat dihapus. Silakan coba lagi.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-md">
      <Card>
        <CardHeader>
          <CardTitle>Keluar dari akun</CardTitle>
          <CardDescription>
            Akhiri sesi Jejak Puncak di perangkat ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            isLoading={isLoggingOut}
            loadingLabel="Keluar…"
            onClick={() => void logout()}
            variant="outline"
          >
            <LogOut aria-hidden="true" />
            Logout
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Hapus akun</CardTitle>
          <CardDescription>
            Menghapus profil, Wishlist, riwayat pendakian, dan seluruh data akun
            secara permanen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog
            onOpenChange={(open) => {
              if (open) {
                trackEvent("delete_account_started");
              } else {
                setConfirmation("");
                setDeleteError("");
              }
            }}
          >
            <DialogTrigger render={<Button variant="destructive" />}>
              <Trash2 aria-hidden="true" />
              Hapus akun
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Hapus akun secara permanen?</DialogTitle>
                <DialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Semua data akun akan
                  dihapus dan tidak bisa dipulihkan.
                </DialogDescription>
              </DialogHeader>
              <Field>
                <FieldLabel htmlFor="delete-confirmation">
                  Ketik HAPUS untuk mengonfirmasi
                </FieldLabel>
                <Input
                  autoComplete="off"
                  id="delete-confirmation"
                  onChange={(event) => setConfirmation(event.target.value)}
                  value={confirmation}
                />
                <FieldDescription>Huruf harus sama persis.</FieldDescription>
              </Field>
              <FormFeedback
                message={deleteError}
                status={deleteError ? "error" : null}
              />
              <DialogFooter>
                <DialogClose
                  render={<Button disabled={isDeleting} variant="outline" />}
                >
                  Batal
                </DialogClose>
                <Button
                  disabled={confirmation !== "HAPUS"}
                  isLoading={isDeleting}
                  loadingLabel="Menghapus…"
                  onClick={() => void deleteAccount()}
                  variant="destructive"
                >
                  Hapus akun permanen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <FormFeedback {...feedback} />
    </div>
  );
}
