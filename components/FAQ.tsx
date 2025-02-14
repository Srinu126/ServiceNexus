import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionDemo() {
  return (
    <section
      id="faqs"
      className="sm:py-16 max-w-2xl mx-auto text-white py-6 flex justify-center items-center flex-col relative"
    >
        <h2 className="font-poppins pb-8 text-center font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I book a service?</AccordionTrigger>
          <AccordionContent>
          Simply browse the services, choose a provider, select a date and time, and confirm your booking. You’ll receive a confirmation email with the details.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I become a service provider on Service Nexus?</AccordionTrigger>
          <AccordionContent>
          Yes! If you are a skilled professional, you can apply to join our platform through the Service Provider Signup page.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Are the service providers verified?</AccordionTrigger>
          <AccordionContent>
          Yes, we ensure that all professionals on our platform are background-checked and verified for safety and quality assurance.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What is Service Nexus?</AccordionTrigger>
          <AccordionContent>
          Service Nexus is an on-demand services platform that connects users with skilled professionals for various home and personal services, such as cleaning, plumbing, carpentry, and more.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
