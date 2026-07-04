import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section } from "@/components/layout/section";
import { faqs } from "@/constants/site";

export default function FaqPage() {
  return <Section><h1 className="text-4xl font-semibold">FAQ</h1><Accordion type="single" collapsible className="mt-8">{faqs.map(([q, a], i) => <AccordionItem key={q} value={String(i)}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></Section>;
}
