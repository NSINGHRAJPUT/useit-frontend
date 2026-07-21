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
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    author: { type: String, required: true },
    categories: [{ type: String, index: true }],
    tags: [{ type: String, index: true }],
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true },
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
  { timestamps: true },
);

blogSchema.index({ title: "text", excerpt: "text", content: "text", tags: "text" });

export type BlogDocument = InferSchemaType<typeof blogSchema> & { _id: Schema.Types.ObjectId };

export const BlogModel = models.Blog || model("Blog", blogSchema);
