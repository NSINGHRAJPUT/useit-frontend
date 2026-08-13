export interface ToolSeoContent {
  seoTitle: string;
  seoDescription: string;
  intro: string;
  howToSteps: string[];
  benefits: string[];
  useCases: string[];
  guide: string;
  tips: string[];
  faq: Array<{ question: string; answer: string }>;
  searchKeywords?: string[];
}

export type ToolSeoMap = Record<string, ToolSeoContent>;
