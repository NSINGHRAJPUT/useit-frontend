"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/layout/section";

interface GeneratedImage {
  imageUrl: string;
  publicId: string;
}

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<GeneratedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleGenerate() {
    setStatus(null);
    setLoading(true);
    try {
      const response = await api.post<{ data: GeneratedImage }>("/ai/image", {
        prompt,
      });
      setResult(response.data.data);
    } catch {
      setStatus(
        "Failed to generate image. Confirm Pollinations settings and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section>
      <div className="grid gap-6">
        <div>
          <h1 className="text-4xl font-semibold">AI Image Generator</h1>
          <p className="mt-3 text-muted-foreground">
            Generate cover images with Pollinations and upload them to
            Cloudinary securely.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Professional modern JPG to PNG converter website hero image"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleGenerate} disabled={loading || !prompt}>
            {loading ? "Generating..." : "Generate Image"}
          </Button>
        </div>

        {status ? <p className="text-sm text-destructive">{status}</p> : null}

        {result ? (
          <div className="grid gap-6 rounded-lg border bg-card p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-semibold">Generated Image</h2>
              <p className="mt-2 text-muted-foreground">
                Use this image for blog covers or marketing assets.
              </p>
            </div>
            <img
              src={result.imageUrl}
              alt="AI generated"
              className="h-[360px] w-full rounded-lg object-cover"
            />
            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <div>
                <p>
                  <strong>Public ID:</strong> {result.publicId}
                </p>
                <p className="text-sm text-muted-foreground">
                  Cloudinary asset stored under the ai-generated folder.
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href={result.imageUrl} download>
                  Download Image
                </a>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
