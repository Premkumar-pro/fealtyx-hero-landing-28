
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is FealtyX?",
    answer: "FealtyX is a comprehensive bug and task tracking platform designed for modern development teams. It provides role-based dashboards, time tracking, approval workflows, and detailed analytics to streamline your development process."
  },
  {
    question: "How does time tracking work?",
    answer: "Time tracking in FealtyX is automatic and intuitive. Developers can log time spent on tasks and bugs with simple start/stop timers. Managers get detailed reports showing time allocation across projects and team members."
  },
  {
    question: "What happens after a bug closure request?",
    answer: "When a developer requests to close a bug, it enters an approval workflow. Managers receive notifications and can review the resolution, request changes, or approve the closure. This ensures quality control while maintaining development velocity."
  },
  {
    question: "How secure is the authentication system?",
    answer: "FealtyX uses enterprise-grade security with modern authentication protocols. We implement industry-standard encryption, secure session management, and regular security audits to protect your data and user accounts."
  },
  {
    question: "Can FealtyX integrate with our existing tools?",
    answer: "Yes, FealtyX offers integrations with popular development tools including Git repositories, CI/CD pipelines, and project management platforms. Our API also allows for custom integrations to fit your specific workflow."
  }
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Get answers to the most common questions about FealtyX.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-background border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a href="mailto:support@fealtyx.com" className="text-primary hover:underline font-semibold">
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};
