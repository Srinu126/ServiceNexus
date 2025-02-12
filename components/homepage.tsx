"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Service from "./Service";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import CTA from "./CTA";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Testimonials />
      <CTA />
    </>
  );
};
export default HomePage;

// const HomePage = () => {
//   const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         const fetchServices = async () => {
//           try {
//             const response = await fetch("/api/services");
//             const data = await response.json();
//             setServices(data.services);
//           } catch (error) {
//             console.error("Failed to fetch services:", error);
//           } finally {
//             setLoading(false);
//           }
//         };

//         fetchServices();
//       }, []);
//   return (
//     <div
//       className=" bg-gradient-to-b from-gray-100 to-gray-200
//  flex flex-col min-h-screen"
//     >
//       <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[90vh]">
//         <Image
//           src="/banner.png"
//           alt="Homepage Banner"
//           layout="fill"
//           objectFit="contain"
//           priority
//         />
//       </div>

//       <section id="services" className="my-5 padding-container">
//             <h2 className="text-center font-bold text-3xl medium-14 text-purple-700">Services</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
//               {!loading && services.length > 0
//                 ? services.slice(4).map((service, index) => (
//                     <Service key={service.id} service={service}/>
//                   ))
//                 :
//                   [1, 2, 3, 4, 5, 7, 8, 9].map((item, index) => (
//                     <div
//                       key={index}
//                       className="h-[300px] w-full bg-gray-300 animate-pulse rounded-lg"
//                     ></div>
//                   ))}
//             </div>
//           </section>
//       <section id="about" className="py-12">
//         <h2 className="text-3xl font-bold text-center mb-8">
//           Frequently Asked Questions
//         </h2>
//         <div className="max-w-2xl mx-auto">
//           <Accordion type="single" collapsible className="w-full">
//             <AccordionItem value="item-1">
//               <AccordionTrigger>Is it accessible?</AccordionTrigger>
//               <AccordionContent>
//                 Yes. It adheres to the WAI-ARIA design pattern.
//               </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-2">
//               <AccordionTrigger>Is it styled?</AccordionTrigger>
//               <AccordionContent>
//                 Yes. It comes with default styles that matches the other
//                 components&apos; aesthetic.
//               </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-3">
//               <AccordionTrigger>Is it animated?</AccordionTrigger>
//               <AccordionContent>
//                 Yes. It is animated by default, but you can disable it if you
//                 prefer.
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;
