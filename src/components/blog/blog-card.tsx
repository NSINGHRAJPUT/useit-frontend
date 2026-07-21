import Link from "next/link";
import dayjs from "dayjs";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@toolkit-pro/shared-types";

export function BlogCard({ post }: { post: BlogPost }) {
  const published = post.publishedAt ? dayjs(post.publishedAt).format("MMM D, YYYY") : null;

  return (
    <article className="group card-premium overflow-hidden border-gold/15 transition hover:-translate-y-1 hover:border-gold/30">
      {post.featuredImage ? (
        <Link href={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-muted/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featuredImage}
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
      ) : null}
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {published ? <span>{published}</span> : null}
          {post.readingTimeMinutes ? (
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readingTimeMinutes} min read
            </span>
          ) : null}
        </div>
        <Link href={`/blog/${post.slug}`} className="block space-y-2">
          <h2 className="font-heading text-2xl font-semibold leading-tight transition group-hover:text-gold">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        </Link>
        {post.tags.length ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold/15 bg-gold/5 px-2.5 py-0.5 text-xs text-gold"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-gold transition hover:gap-2"
        >
          Read article
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
