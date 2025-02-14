import { db } from "@/drizzle/db";
import { services, serviceProviders } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";

// const ServiceDetailPage = async ({ params }: { params: { title: string } }) => {

//   const {title} = await params;
  
//   const formattedTitle = decodeURIComponent(title.replace(/_/g, " "));

//   console.log("Fetching services for title:", formattedTitle);

  
//   const result = await db.select().from(services).where(eq(services.title, formattedTitle));

//   console.log("Database result:", result);

//   if (!result.length) {
//     console.error("Service not found for title:", formattedTitle);
//     return notFound();
//   }

//   const service = result[0];

//   return (
//     <div className="text-white">
//       <h1 className="text-3xl font-bold">Service Detail - {service.title}</h1>
//       <div className="mt-5 p-5 border border-gray-700 rounded-lg">
//         <p className="text-gray-300">{service.description}</p>
//         <p className="text-gray-400">Category: {service.category}</p>
//         <p className="text-green-400">Price: ${service.price}</p>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetailPage;
const ServiceDetailPage = async ({ params }: { params: { title: string } }) => {
  const {title} = await params;
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
        <div key={index} className="mt-5 p-5 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Provider: {service.provider?.name}</h2>
          <p className="text-gray-400">City: {service.provider?.city}</p>
          <p className="text-green-400">Availability: {service.provider?.availability ? "Available" : "Not Available"}</p>
          <p className="text-yellow-400">Price: ${service.price}</p>
          <p className="text-gray-300 mt-2">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceDetailPage;

