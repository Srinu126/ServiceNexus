import { db } from "@/drizzle/db";
import { services, serviceProviders } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaStar,FaClock, FaCommentDots } from "react-icons/fa"; // Add icons


const ServiceDetailPage = async ({
  params,
}: {
  params: Promise<{ title: string }>;
}) => {
  const { title } = await params;
  const formattedTitle = decodeURIComponent(title.replace(/_/g, " "));

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
  const providerIds = [
    ...new Set(servicesResult.map((service) => service.providerId)),
  ];

  // Fetch service provider details
  const providersResult = await db
    .select()
    .from(serviceProviders)
    .where(inArray(serviceProviders.id, providerIds));

  // Map services to their providers
  const servicesWithProviders = servicesResult.map((service) => ({
    ...service,
    provider: providersResult.find(
      (provider) => provider.id === service.providerId
    ),
  }));

  return (
    <div className="text-white bg-black min-h-screen py-10 px-6">
      <h1 className="text-4xl font-extrabold text-center text-cyan-500 mb-10">
        Service Details - {servicesWithProviders[0].title}
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {servicesWithProviders.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
};

const ServiceCard = ({ service }) => {
  const ratings = 4.5;
  const totalReviews = 320;
  const bookings = 150;
  const duration = "2-3 hours";
  const isCertified = true;

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col lg:flex-row gap-6">
      {/* Left side - Provider Avatar and Info */}
      <div className="flex flex-col items-center lg:items-start space-y-4 lg:space-y-0 lg:w-1/3">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={"/avatar.jpg"} // Fallback image
          />
          <AvatarFallback>{service.provider?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-1 text-center lg:text-left">
          <h2 className="text-xl uppercase font-semibold text-white">{service.provider?.name}</h2>
          <p className="text-gray-400 flex items-center text-sm">
            <FaMapMarkerAlt className="inline mr-1" />
            {service.provider?.city}
          </p>
        </div>

        {/* Reviews and Bookings below the Avatar */}
        <div className="flex flex-col items-center lg:items-start space-y-2 mt-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <FaStar className="text-yellow-400" />
            <span className="ml-1 font-semibold text-white">{ratings}</span>
            <span className="text-gray-500 w-[100px]">({totalReviews} reviews)</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaCommentDots className="text-gray-400" />
            <span >{bookings} bookings</span>
          </div>
        </div>
      </div>

      {/* Right side - Service Details */}
      <div className="flex flex-col justify-between gap-4 lg:w-2/3">
        {/* Top Section: Price, Availability, Duration */}
        <div className="flex flex-col gap-4">
          <div className="text-yellow-400 flex items-center space-x-2">
            <FaDollarSign />
            <span className="font-semibold">${service.price}</span>
          </div>

          <div className="text-gray-300 flex items-center space-x-2">
            <FaClock />
            <span>Duration: {duration}</span>
          </div>

          <div className="text-green-400 flex items-center space-x-2">
            <FaCalendarAlt />
            <span>{service.provider?.availability ? "Available" : "Not Available"}</span>
          </div>
        </div>

        {/* Bottom Section: Ratings, Reviews, Bookings, Certification */}
        <div className="flex flex-col gap-4">
          {isCertified && (
            <div className="flex items-center space-x-2 text-green-500">
              <span className="px-2 py-1 text-xs font-semibold rounded-full border border-green-500 bg-green-500 bg-opacity-20">
                Certified Provider
              </span>
            </div>
          )}
        </div>

        {/* Button Section */}
        <div className="mt-4">
          <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black shadow-md hover:shadow-lg transition-all duration-300 ease-in-out py-3 rounded-full">
            <Link href={`/details/${service.id}`}>
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};


export default ServiceDetailPage;
