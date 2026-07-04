import Link from "next/link";
import { ArrowRight, Target, TrendingUp } from "lucide-react";
import type { BlogPost } from "@toolkit-pro/shared-types";
import { apiGet } from "@/services/api";
import { BlogAdminActions, BlogAdminTable } from "@/components/admin/blog-admin-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type BlogStats = {
  published: number;
  drafts: number;
  publishedThisWeek: number;
};

export default async function AdminBlogsPage() {
  const [rows, stats, settings] = await Promise.all([
    apiGet<BlogPost[]>("/admin/blogs").catch(() => []),
    apiGet<BlogStats>("/admin/blogs/stats").catch(() => ({
      published: 0,
      drafts: 0,
      publishedThisWeek: 0,
    })),
    apiGet<{ weeklyPostGoal: number; contentKeywords: Array<{ keyword: string; status: string }> }>(
      "/admin/seo",
    ).catch(() => ({ weeklyPostGoal: 2, contentKeywords: [] })),
  ]);

  const plannedKeywords = settings.contentKeywords.filter((item) => item.status !== "published");

  return (
    <div className="grid gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Blog management</h1>
          <p className="mt-2 text-muted-foreground">
            Publish SEO-focused articles weekly to grow organic traffic.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/seo">SEO settings</Link>
          </Button>
          <BlogAdminActions />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-premium">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Published</p>
            <p className="mt-2 text-3xl font-semibold">{stats.published}</p>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Drafts</p>
            <p className="mt-2 text-3xl font-semibold">{stats.drafts}</p>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Published this week</p>
            <p className="mt-2 text-3xl font-semibold">
              {stats.publishedThisWeek}/{settings.weeklyPostGoal}
            </p>
          </CardContent>
        </Card>
      </div>

      {plannedKeywords.length ? (
        <Card className="card-premium">
          <CardContent className="grid gap-4 p-6">
            <div className="flex items-center gap-2 text-gold">
              <Target className="size-4" />
              <h2 className="text-lg font-semibold">Weekly keyword queue</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {plannedKeywords.slice(0, 8).map((item) => (
                <span
                  key={item.keyword}
                  className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-sm"
                >
                  {item.keyword}
                </span>
              ))}
            </div>
            <Button variant="outline" className="w-fit" asChild>
              <Link href="/admin/seo">
                Manage content plan <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="card-premium border-dashed">
          <CardContent className="flex items-center justify-between gap-4 p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="mt-1 size-5 text-gold" />
              <div>
                <h2 className="font-semibold">Set up your weekly SEO plan</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add target keywords in SEO settings, then generate one or two posts every week.
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/admin/seo">Open SEO settings</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <BlogAdminTable initialRows={Array.isArray(rows) ? rows : []} />
    </div>
  );
}
