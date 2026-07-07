"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BannerImageUploader } from "@/components/admin/BannerImageUploader";
import { createStorySchema, type CreateStoryInput } from "@/validations/story.validation";

const CKEditorField = dynamic(() => import("@/components/admin/CKEditorField"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

interface StoryFormProps {
  mode: "create" | "edit";
  storyId?: string;
  defaultValues?: CreateStoryInput;
}

const EMPTY_DEFAULTS: CreateStoryInput = {
  title: "",
  excerpt: "",
  bannerImage: { url: "", publicId: "" },
  content: "",
  status: "draft",
};

export function StoryForm({ mode, storyId, defaultValues }: StoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialContent = defaultValues?.content ?? "";

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.input<typeof createStorySchema>, unknown, z.output<typeof createStorySchema>>({
    resolver: zodResolver(createStorySchema),
    defaultValues: defaultValues ?? EMPTY_DEFAULTS,
  });

  const bannerImage = watch("bannerImage");

  // `status` has a zod .default(), so react-hook-form tracks it as optional
  // while being edited but the resolver guarantees it's filled in by the
  // time onSubmit receives it (z.output, not z.input).
  async function onSubmit(values: CreateStoryInput) {
    setIsSubmitting(true);
    try {
      const endpoint = mode === "create" ? "/api/admin/stories" : `/api/admin/stories/${storyId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save story");
      }

      toast.success(mode === "create" ? "Story created" : "Story updated");
      router.push("/admin/stories");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save story");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Story title"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label id="banner-image-label">Banner image</Label>
        <BannerImageUploader
          value={bannerImage?.url ? bannerImage : null}
          onChange={(image) =>
            setValue("bannerImage", image ?? { url: "", publicId: "" }, { shouldValidate: true })
          }
        />
        {errors.bannerImage?.url && (
          <p id="banner-image-error" className="text-sm text-destructive" role="alert">
            Banner image is required
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          {...register("excerpt")}
          placeholder="Short summary shown on story cards"
          rows={3}
          aria-invalid={!!errors.excerpt}
          aria-describedby={errors.excerpt ? "excerpt-error" : undefined}
        />
        {errors.excerpt && (
          <p id="excerpt-error" className="text-sm text-destructive">
            {errors.excerpt.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label id="content-label">Content</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <CKEditorField initialData={initialContent} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p id="content-error" className="text-sm text-destructive" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : mode === "create" ? "Create story" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/stories")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
