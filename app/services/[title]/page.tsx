/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/drizzle/db";
import { services, serviceProviders } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

const ServiceDetailPage = async ({ params }: { params: Promise<{ title: string }> }) => {
  const { title } = await params;
  const formattedTitle = decodeURIComponent(title.replace(/_/g, " "));

  console.log("Fetching services for title:", formattedTitle);

  // Fetch all services with this title
  const servicesResult = await db
    .select()
    .from(services)
    .where(eq(services.title, formattedTitle));

  if (!servicesResult.length) {
    console.error("Service not found for title:", formattedTitle);
    return notFound();
  }

  // Extract unique provider IDs
  const providerIds = [...new Set(servicesResult.map((service) => service.providerId))];

  // Fetch service provider details
  const providersResult = await db
    .select()
    .from(serviceProviders)
    .where(inArray(serviceProviders.id, providerIds));

  // Map services to their providers
  const servicesWithProviders = servicesResult.map((service) => ({
    ...service,
    provider: providersResult.find((provider) => provider.id === service.providerId),
  }));

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Service Details - {servicesWithProviders[0].title}</h1>
      
      {servicesWithProviders.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}

      {/* Ensure Toaster is included in the page */}
      {/* <Toaster /> */}
    </div>
  );
};

const ServiceCard = ({ service }: { service: any }) => {
  // const handleBooking = () => {
  //   Toast({
  //     title: "Booking Confirmed",
  //   });
  // };

  return (
    <div className="mt-5 p-5 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Provider: {service.provider?.name}</h2>
      <p className="text-gray-400">City: {service.provider?.city}</p>
      <p className="text-green-400">Availability: {service.provider?.availability ? "Available" : "Not Available"}</p>
      <p className="text-yellow-400">Price: ${service.price}</p>
      <p className="text-gray-300 mt-2">{service.description}</p>

      <Button className="mt-3 bg-cyan-500 hover:bg-cyan-400 text-black">
        Book Now
      </Button>
    </div>
  );
};

export default ServiceDetailPage;
