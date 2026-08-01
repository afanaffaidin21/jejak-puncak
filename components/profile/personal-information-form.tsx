"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  updatePersonalInformationAction,
  uploadAvatarAction,
} from "@/app/profile/actions";
import { FormFeedback } from "@/components/profile/form-feedback";
import { StickySaveAction } from "@/components/profile/sticky-save-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/use-user";
import {
  personalInformationSchema,
  type PersonalInformationValues,
} from "@/lib/profile-validation";
import { trackEvent } from "@/lib/analytics";
import type { ProfileData } from "@/types/profile";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function PersonalInformationForm({ profile }: { profile: ProfileData }) {
  const { updateUserSummary } = useUser();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    status: "error" | "success" | null;
  }>({ message: "", status: null });
  const {
    control,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<PersonalInformationValues>({
    defaultValues: { bio: profile.bio, displayName: profile.displayName },
    mode: "onChange",
    resolver: zodResolver(personalInformationSchema),
  });

  const displayName =
    useWatch({ control, name: "displayName" }) || profile.displayName;
  const onSubmit = handleSubmit(async (values) => {
    setFeedback({ message: "", status: null });
    try {
      const result = await updatePersonalInformationAction(values);
      if (!result.success) {
        setFeedback({ message: result.message, status: "error" });
        return;
      }

      const normalized = personalInformationSchema.parse(values);
      reset(normalized);
      updateUserSummary({ displayName: normalized.displayName });
      trackEvent("profile_updated");
      setFeedback({
        message: "Informasi profil berhasil diperbarui.",
        status: "success",
      });
    } catch {
      setFeedback({
        message: "Perubahan tidak dapat disimpan.",
        status: "error",
      });
    }
  });

  const uploadAvatar = async (file: File | undefined) => {
    if (!file) return;
    setIsUploading(true);
    setFeedback({ message: "", status: null });
    const formData = new FormData();
    formData.set("avatar", file);

    try {
      const result = await uploadAvatarAction(formData);
      if (!result.success) {
        setFeedback({ message: result.message, status: "error" });
        return;
      }

      if (!result.avatarUrl) {
        setFeedback({
          message: "Avatar tidak dapat diperbarui.",
          status: "error",
        });
        return;
      }

      setAvatarUrl(result.avatarUrl);
      updateUserSummary({ avatarUrl: result.avatarUrl });
      trackEvent("profile_updated", { field: "avatar" });
      setFeedback({
        message: "Avatar berhasil diperbarui.",
        status: "success",
      });
    } catch {
      setFeedback({ message: "Avatar tidak dapat diunggah.", status: "error" });
    } finally {
      setIsUploading(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  return (
    <form className="flex flex-col gap-md" noValidate onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Informasi pribadi</CardTitle>
          <CardDescription>
            Perbarui identitas yang tampil di Jejak Puncak.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-lg">
          <div className="flex flex-col gap-sm sm:flex-row sm:items-center">
            <Avatar className="size-24">
              {avatarUrl ? <AvatarImage alt="" src={avatarUrl} /> : null}
              <AvatarFallback className="text-h4">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-2xs">
              <Input
                accept="image/jpeg,image/png,image/webp"
                aria-label="Pilih file avatar"
                className="sr-only"
                disabled={isUploading}
                id="avatar"
                onChange={(event) => void uploadAvatar(event.target.files?.[0])}
                ref={avatarInputRef}
                tabIndex={-1}
                type="file"
              />
              <Button
                isLoading={isUploading}
                loadingLabel="Mengunggah…"
                onClick={() => avatarInputRef.current?.click()}
                type="button"
                variant="outline"
              >
                <Camera aria-hidden="true" />
                Ganti avatar
              </Button>
              <p className="text-caption text-text-muted">
                JPG, PNG, atau WebP. Maksimal 2 MB.
              </p>
            </div>
          </div>

          <FieldGroup>
            <Field data-invalid={errors.displayName ? "true" : undefined}>
              <FieldLabel htmlFor="display-name">Nama tampilan</FieldLabel>
              <Input
                {...register("displayName")}
                aria-invalid={Boolean(errors.displayName)}
                autoComplete="name"
                id="display-name"
              />
              <FieldError>{errors.displayName?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="profile-email">Email</FieldLabel>
              <Input
                disabled
                id="profile-email"
                readOnly
                type="email"
                value={profile.email}
              />
              <FieldDescription>
                Email akun tidak dapat diubah dari halaman ini.
              </FieldDescription>
            </Field>

            <Field data-invalid={errors.bio ? "true" : undefined}>
              <FieldLabel htmlFor="profile-bio">Bio (opsional)</FieldLabel>
              <Textarea
                {...register("bio")}
                aria-invalid={Boolean(errors.bio)}
                id="profile-bio"
                maxLength={500}
                placeholder="Ceritakan sedikit tentang dirimu."
              />
              <FieldDescription>Maksimal 500 karakter.</FieldDescription>
              <FieldError>{errors.bio?.message}</FieldError>
            </Field>
          </FieldGroup>

          <FormFeedback {...feedback} />
        </CardContent>
      </Card>
      <StickySaveAction disabled={!isDirty} isLoading={isSubmitting} />
    </form>
  );
}
