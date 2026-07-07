import mongoose, { Schema } from "mongoose";
import type { IStory } from "@/interfaces/story.interface";

const StorySchema = new Schema<IStory>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 500,
    },
    bannerImage: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    readingTime: {
      type: Number,
      default: 1,
      min: 1,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// `slug` already gets a unique index from the field option above.
StorySchema.index({ status: 1, publishedAt: -1 });
StorySchema.index({ isDeleted: 1 });
StorySchema.index(
  { title: "text", excerpt: "text" },
  { weights: { title: 5, excerpt: 1 }, name: "story_text_search" },
);

export const StoryModel =
  (mongoose.models.Story as mongoose.Model<IStory>) ??
  mongoose.model<IStory>("Story", StorySchema);
