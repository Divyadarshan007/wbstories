"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { IBannerImage } from "@/interfaces/story.interface";

interface BannerImageUploaderProps {
  value: IBannerImage | null;
  onChange: (value: IBannerImage | null) => void;
}

export function BannerImageUploader({ value, onChange }: BannerImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (value?.publicId) {
        formData.append("previousPublicId", value.publicId);
      }

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Upload failed");
      }
      onChange(json.data as IBannerImage);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }

  if (value) {
    return (
      <div className="relative h-48 w-full max-w-md overflow-hidden rounded-md border">
        <Image src={value.url} alt="Banner preview" fill className="object-cover" />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => onChange(null)}
          aria-label="Remove banner image"
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <label className="flex h-48 w-full max-w-md cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-muted-foreground hover:bg-muted/50">
      {isUploading ? (
        <Loader2 className="size-6 animate-spin" />
      ) : (
        <>
          <ImagePlus className="size-6" />
          <span className="text-sm">Click to upload banner image</span>
        </>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        disabled={isUploading}
        onChange={handleFileChange}
      />
    </label>
  );
}
