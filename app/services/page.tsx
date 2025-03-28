"use client";

import { useEffect, useState } from "react";
import Service from "@/components/Service";
import { Input } from "@/components/ui/input"; // Importing ShadCN Input component

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data.services);
        setFilteredServices(data.services);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to filter services based on search input
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.mainKeywords.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  return (
    <section id="services" className="my-10 mx-auto max-w-screen-xl px-4">
      

      <h2 className="text-center font-extrabold text-4xl text-white mb-10">
        Our Premium Services
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <Input
          type="text"
          placeholder="Search services..."
          className="w-full p-6 rounded-xl max-w-lg bg-gray-800 text-white border-gray-700 focus:border-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {!loading && filteredServices.length > 0
          ? filteredServices.map((service) => (
              <Service key={service.id} service={service} />
            ))
          : loading
          ? // Show skeleton loaders while loading
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-700 animate-pulse rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <div className="h-[200px] bg-gray-600 rounded-t-2xl"></div>
                <div className="flex flex-col p-4 gap-4">
                  <div className="h-4 bg-gray-600 rounded-full mb-2 w-1/3"></div>
                  <div className="h-6 bg-gray-600 rounded-full mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-600 rounded-full mb-2 w-1/4"></div>
                  <div className="mt-4 h-10 bg-gray-600 rounded-lg"></div>
                </div>
              </div>
            ))
          : // No results found
            searchQuery && (
              <p className="text-center text-gray-400 text-lg col-span-full">
                No services found for <span className="text-white">{searchQuery}</span>
              </p>
            )}
      </div>
    </section>
  );
};

export default ServicesList;
