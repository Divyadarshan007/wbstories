import { notFound } from "next/navigation";
import { StoryService } from "@/services/story.service";
import { StoryForm } from "@/components/admin/StoryForm";
import { ApiError } from "@/helpers/api-error";
import type { CreateStoryInput } from "@/validations/story.validation";

interface EditStoryPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const { id } = await params;

  let story;
  try {
    story = await StoryService.getByIdForAdmin(id);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      notFound();
    }
    throw error;
  }

  const defaultValues: CreateStoryInput = {
    title: story.title,
    content: story.content,
    status: story.status,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit story</h1>
        <p className="text-muted-foreground">{story.title}</p>
      </div>
      <StoryForm mode="edit" storyId={story.id} defaultValues={defaultValues} />
    </div>
  );
}
