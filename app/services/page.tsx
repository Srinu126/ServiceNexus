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
    <section id="services" className="my-5 padding-container">
      <h2 className="text-center font-bold text-3xl medium-14 text-purple-700">Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {!loading && services.length > 0
          ? services.map((service, index) => (  
              <Service key={service.id} service={service}/>
            ))
          : // Loading effect until data comes from the server
            [1, 2, 3, 4, 5, 7, 8, 9].map((item, index) => (
              <div
                key={index}
                className="h-[300px] w-full bg-gray-300 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </section>
  );
};

export default ServicesList;

