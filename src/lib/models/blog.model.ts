import "server-only";

import { Schema, model, models, type InferSchemaType } from "mongoose";

const blogFaqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    // Some feeds provide `body` (HTML) + `authorName` instead of `content` + `author`.
    // Keep both optional so we can render whichever exists.
    excerpt: { type: String, required: false },
    content: { type: String, required: false },
    body: { type: String, required: false },
    featuredImage: { type: String },
    author: { type: String, required: false },
    authorName: { type: String, required: false },
    categories: [{ type: String, index: true }],
    tags: [{ type: String, index: true }],
    seoTitle: { type: String, required: false },
    seoDescription: { type: String, required: false },
    focusKeyword: { type: String, index: true },
    canonicalUrl: { type: String },
    ogImage: { type: String },
    metaRobots: { type: String, default: "index,follow" },
    faqs: [blogFaqSchema],
    readingTimeMinutes: { type: Number, default: 1 },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    publishedAt: { type: Date, index: true },
    scheduledPublishAt: { type: Date, index: true },
  },
  { timestamps: true, strict: false },
);

blogSchema.index({ title: "text", excerpt: "text", content: "text", tags: "text" });

export type BlogDocument = InferSchemaType<typeof blogSchema> & { _id: Schema.Types.ObjectId };

export const BlogModel = models.Blog || model("Blog", blogSchema);
