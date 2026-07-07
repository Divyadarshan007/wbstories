import { ContactForm } from "@/components/website/ContactForm";
import { buildMetadata } from "@/helpers/metadata.helper";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Have a question or a story idea? Get in touch with WB Stories.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">
        Have a question or a story idea? Send us a message.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
