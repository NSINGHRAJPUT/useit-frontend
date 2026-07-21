export type Plan = "FREE" | "PRO" | "BUSINESS";
export type UserRole = "USER" | "ADMIN";
export type ToolCategory = "image" | "pdf" | "document" | "text";
export type ToolOperation =
  | "convert"
  | "compress"
  | "resize"
  | "crop"
  | "merge"
  | "split"
  | "rotate"
  | "transform"
  | "extract";
export type ToolInputType = "file" | "text" | "multi-file";
export type ToolProcessingMode = "sync" | "async";
export type ToolProcessingLocation = "client" | "server";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  avatar?: string | null;
}

export interface JwtPayload {
  sub: string;
  role: UserRole;
  email: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  category: ToolCategory;
  operation: ToolOperation;
  description: string;
  inputFormats: string[];
  outputFormats: string[];
  acceptedFormats: string[];
  acceptedMimeTypes: string[];
  outputFormat: string | "same";
  seoTitle: string;
  seoDescription: string;
  benefits: string[];
  useCases: string[];
  faq: Array<{ question: string; answer: string }>;
  isActive: boolean;
  inputType: ToolInputType;
  processingMode: ToolProcessingMode;
  processingLocation: ToolProcessingLocation;
  maxFiles?: number;
  searchKeywords?: string[];
}

export interface PlanLimit {
  plan: Plan;
  maxUploadMb: number;
  dailyConversions: number | null;
  priorityProcessing?: boolean;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  categories: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  metaRobots?: string;
  faqs: BlogFaq[];
  readingTimeMinutes?: number;
  status: "draft" | "published";
  publishedAt?: string;
  scheduledPublishAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContentKeyword {
  keyword: string;
  priority: "high" | "medium" | "low";
  status: "planned" | "in_progress" | "published";
  blogSlug?: string;
  weekOf?: string;
  notes?: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  defaultTitle: string;
  titleTemplate: string;
  keywords: string[];
  ogImage?: string;
  twitterHandle?: string;
  twitterCard: "summary" | "summary_large_image";
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  organizationName?: string;
  organizationLogo?: string;
  organizationEmail?: string;
  organizationSameAs: string[];
  weeklyPostGoal: number;
  contentKeywords: ContentKeyword[];
}
