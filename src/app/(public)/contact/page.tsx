import { Section } from "@/components/layout/section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return <Section><h1 className="text-4xl font-semibold">Contact</h1><form className="mt-8 grid max-w-2xl gap-4"><Input placeholder="Work email" type="email" /><Input placeholder="Subject" /><Textarea placeholder="How can we help?" rows={6} /><Button>Send message</Button></form></Section>;
}
