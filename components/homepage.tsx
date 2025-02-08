"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";

const HomePage = () => {
  return (
    <div
      className=" bg-gradient-to-b from-gray-100 to-gray-200
 flex flex-col min-h-screen"
    >
      <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[90vh]">
        <Image
          src="/banner.png"
          alt="Homepage Banner"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>

      <section id="services" className="py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Popular Services
        </h2>
        <div className="max-w-6xl flex mx-auto overflow-x-scroll space-x-6 px-4">
          {["Plumbing", "Cleaning", "Electrical", "Painting"].map(
            (service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-40 bg-gray-300 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-700">
                    {service}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">
                    High-quality {service} services to meet your needs.
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="about" className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It is animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default HomePage;
