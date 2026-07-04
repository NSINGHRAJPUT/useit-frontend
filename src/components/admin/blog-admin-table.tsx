"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { BlogPost } from "@toolkit-pro/shared-types";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function BlogAdminTable({ initialRows }: { initialRows: BlogPost[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(initialRows);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this blog post permanently?")) return;
    setDeletingId(id);
    try {
      await api.delete(`/admin/blogs/${id}`);
      setRows((current) => current.filter((row) => row._id !== id));
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Keyword</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id ?? row.slug}>
              <TableCell>
                <div className="font-medium">{row.title}</div>
                <div className="text-xs text-muted-foreground">/{row.slug}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize border-gold/20 text-gold">
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>{row.focusKeyword || "—"}</TableCell>
              <TableCell>
                {row.publishedAt ? new Date(row.publishedAt).toLocaleDateString() : "—"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/blogs/edit/${row._id}`}>
                      <Pencil className="size-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={deletingId === row._id}
                    onClick={() => row._id && handleDelete(row._id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!rows.length ? (
        <div className="p-8 text-center text-sm text-muted-foreground">No blog posts yet.</div>
      ) : null}
    </div>
  );
}

export function BlogAdminActions() {
  return (
    <Button className="btn-gold border-0" asChild>
      <Link href="/admin/blogs/create">
        <Plus className="size-4" />
        Create blog
      </Link>
    </Button>
  );
}
