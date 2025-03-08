import { db } from "@/drizzle/db";
import { serviceProviders, services } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import BusinessInfo from "@/components/BusinessInfo";
import BusinessDescription from "@/components/BusinessDescription";
import SimilarBusiness from "@/components/SimilarBusiness";

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const servicesResult = await db
    .select()
    .from(services)
    .where(eq(services.id, Number(id)))
    .limit(1);

  const { providerId, title, price, mainKeywords, description, category } =
    servicesResult[0];

  const providersResult = await db
    .select()
    .from(serviceProviders)
    .where(eq(serviceProviders.id, Number(providerId)))
    .limit(1);

  if (!servicesResult.length) {
    console.error("Service not found for id:", id);
    return notFound();
  }
  const { availability, city, name, email, phone, province } =
    providersResult[0];

  const businessDetails = {
    id: "1",
    name: name,
    description: description,
    image: [{ url: "/HomeCleaning.jpg" }, { url: "/Gardening.jpg" }],
    address: city,
    email: email,
    contactPerson: name,
    category: {
      name: category,
    },
  };
  return (
    <div className="py-8 text-white padding-container">
      <BusinessInfo business={businessDetails} />
      <div className="grid grid-cols-3 mt-16">
        <div className="col-span-3 md:col-span-2 order-last md:order-first">
          <BusinessDescription business={businessDetails} />
        </div>
        <div>
          <SimilarBusiness serviceDet={servicesResult[0]} providerDet={providersResult[0]} business={businessDetails} />
        </div>
      </div>
    </div>
  );
}
