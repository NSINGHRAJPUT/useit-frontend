"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = `From: ${email}\n\n${message}`;
    const href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject || "ApkaOS contact")}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <form className="mt-8 grid max-w-2xl gap-4" onSubmit={onSubmit}>
      <Input
        placeholder="Your email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        placeholder="Subject"
        required
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
      />
      <Textarea
        placeholder="How can we help?"
        rows={6}
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button type="submit" className="btn-gold border-0 w-fit">
        Open email to {siteConfig.contactEmail}
      </Button>
    </form>
  );
}
