import { Section } from "@/components/layout/section";

export default function PrivacyPage() {
  return (
    <Section>
      <h1 className="text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 leading-8 text-muted-foreground">
        Most ToolKit Pro tools process files locally in your browser — those files are never uploaded. For
        Office document conversions that require server processing, files are stored temporarily and deleted
        automatically after download links expire.
      </p>
    </Section>
  );
}
