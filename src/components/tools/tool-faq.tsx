import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ToolFAQ({ tool }: { tool: ToolDefinition }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">FAQ</h2>
      <Accordion type="single" collapsible className="mt-4">
        {tool.faq.map((item, index) => (
          <AccordionItem key={item.question} value={String(index)}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
