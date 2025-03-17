"use client";

import { useEffect, useState } from "react";
import Service from "@/components/Service";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="my-10 mx-auto max-w-screen-xl px-4">
      <h2 className="text-center font-extrabold text-4xl text-white mb-10">
        Our Premium Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {!loading && services.length > 0
          ? services.map((service) => (
              <Service key={service.id} service={service} />
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-700 animate-pulse rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                {/* Placeholder for image */}
                <div className="h-[200px] bg-gray-600 rounded-t-2xl"></div>
                {/* Placeholder for text */}
                <div className="flex flex-col p-4 gap-4">
                  <div className="h-4 bg-gray-600 rounded-full mb-2 w-1/3"></div>
                  <div className="h-6 bg-gray-600 rounded-full mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-600 rounded-full mb-2 w-1/4"></div>
                  <div className="mt-4 h-10 bg-gray-600 rounded-lg"></div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default ServicesList;
