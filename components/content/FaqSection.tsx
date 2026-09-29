import { faqPageJsonLd, jsonLdScriptProps } from "@/lib/seo/jsonld";
import type { ToolFaq } from "@/content/tools/types";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

// Visible FAQ accordion + matching FAQPage JSON-LD, kept in lockstep since
// schema must always match what's actually on the page (blueprint §11.4).
export function FaqSection({ faqs }: { faqs: ToolFaq[] }) {
  return (
    <section className="w-full">
      <h2 className="text-h3 font-semibold tracking-tight text-text">Frequently asked questions</h2>
      <div className="mt-4">
        <FAQAccordion items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </div>
      <script {...jsonLdScriptProps(faqPageJsonLd(faqs))} />
    </section>
  );
}
