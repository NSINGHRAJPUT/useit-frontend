"use client";

import { useEffect, useState } from "react";
import type { ContentKeyword, SiteSettings } from "@toolkit-pro/shared-types";
import { api } from "@/services/api";
import { defaultSiteSettings, getWeekKey } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const emptyKeyword = (): ContentKeyword => ({
  keyword: "",
  priority: "medium",
  status: "planned",
  weekOf: getWeekKey(),
});

export default function AdminSeoPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ data: SiteSettings }>("/admin/seo")
      .then((response) => setSettings(response.data.data))
      .catch(() => setMessage("Unable to load SEO settings."))
      .finally(() => setLoading(false));
  }, []);

  function updateField<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function updateKeyword(index: number, field: keyof ContentKeyword, value: string) {
    setSettings((current) => ({
      ...current,
      contentKeywords: current.contentKeywords.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const response = await api.put<{ data: SiteSettings }>("/admin/seo", settings);
      setSettings(response.data.data);
      setMessage("SEO settings saved.");
    } catch {
      setMessage("Failed to save SEO settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading SEO settings...</p>;

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-semibold">Website SEO</h1>
        <p className="mt-2 text-muted-foreground">
          Configure global metadata, verification tags, and your weekly content plan.
        </p>
      </div>

      {message ? <p className="text-sm text-gold">{message}</p> : null}

      <Card className="card-premium">
        <CardContent className="grid gap-4 p-6">
          <h2 className="text-xl font-semibold">Global metadata</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="siteName">Site name</Label>
              <Input id="siteName" value={settings.siteName} onChange={(e) => updateField("siteName", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="weeklyPostGoal">Weekly post goal</Label>
              <Input
                id="weeklyPostGoal"
                type="number"
                min={0}
                max={20}
                value={settings.weeklyPostGoal}
                onChange={(e) => updateField("weeklyPostGoal", Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="defaultTitle">Default title</Label>
            <Input
              id="defaultTitle"
              value={settings.defaultTitle}
              onChange={(e) => updateField("defaultTitle", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="titleTemplate">Title template</Label>
            <Input
              id="titleTemplate"
              value={settings.titleTemplate}
              onChange={(e) => updateField("titleTemplate", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="siteDescription">Site description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => updateField("siteDescription", e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              value={settings.keywords.join(", ")}
              onChange={(e) =>
                updateField(
                  "keywords",
                  e.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="ogImage">Default OG image URL</Label>
              <Input
                id="ogImage"
                value={settings.ogImage ?? ""}
                onChange={(e) => updateField("ogImage", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="twitterHandle">Twitter handle</Label>
              <Input
                id="twitterHandle"
                value={settings.twitterHandle ?? ""}
                onChange={(e) => updateField("twitterHandle", e.target.value)}
                placeholder="@toolkitpro"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-premium">
        <CardContent className="grid gap-4 p-6">
          <h2 className="text-xl font-semibold">Search console verification</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="googleSiteVerification">Google verification code</Label>
              <Input
                id="googleSiteVerification"
                value={settings.googleSiteVerification ?? ""}
                onChange={(e) => updateField("googleSiteVerification", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bingSiteVerification">Bing verification code</Label>
              <Input
                id="bingSiteVerification"
                value={settings.bingSiteVerification ?? ""}
                onChange={(e) => updateField("bingSiteVerification", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-premium">
        <CardContent className="grid gap-4 p-6">
          <h2 className="text-xl font-semibold">Organization schema</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="organizationName">Organization name</Label>
              <Input
                id="organizationName"
                value={settings.organizationName ?? ""}
                onChange={(e) => updateField("organizationName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="organizationEmail">Contact email</Label>
              <Input
                id="organizationEmail"
                value={settings.organizationEmail ?? ""}
                onChange={(e) => updateField("organizationEmail", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="organizationLogo">Logo URL</Label>
            <Input
              id="organizationLogo"
              value={settings.organizationLogo ?? ""}
              onChange={(e) => updateField("organizationLogo", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="organizationSameAs">Social profiles (comma-separated URLs)</Label>
            <Input
              id="organizationSameAs"
              value={settings.organizationSameAs.join(", ")}
              onChange={(e) =>
                updateField(
                  "organizationSameAs",
                  e.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="card-premium">
        <CardContent className="grid gap-4 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Weekly content plan</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("contentKeywords", [...settings.contentKeywords, emptyKeyword()])}
            >
              Add keyword
            </Button>
          </div>
          {settings.contentKeywords.map((item, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-border/60 p-4 md:grid-cols-4">
              <Input
                value={item.keyword}
                onChange={(e) => updateKeyword(index, "keyword", e.target.value)}
                placeholder="Target keyword"
              />
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={item.priority}
                onChange={(e) => updateKeyword(index, "priority", e.target.value)}
              >
                <option value="high">High priority</option>
                <option value="medium">Medium priority</option>
                <option value="low">Low priority</option>
              </select>
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={item.status}
                onChange={(e) => updateKeyword(index, "status", e.target.value)}
              >
                <option value="planned">Planned</option>
                <option value="in_progress">In progress</option>
                <option value="published">Published</option>
              </select>
              <Input
                value={item.weekOf ?? getWeekKey()}
                onChange={(e) => updateKeyword(index, "weekOf", e.target.value)}
                placeholder="Week (YYYY-MM-DD)"
              />
            </div>
          ))}
          {!settings.contentKeywords.length ? (
            <p className="text-sm text-muted-foreground">
              Add 2–4 keywords per week (e.g. “merge pdf online”, “compress png”) to drive consistent publishing.
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Button className="btn-gold w-fit border-0" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save SEO settings"}
      </Button>
    </div>
  );
}
