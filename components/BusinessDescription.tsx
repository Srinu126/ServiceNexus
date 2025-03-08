import React from "react";
import Image from "next/image";

interface Business {
  name: string;
  description?: string;
  image?: { url: string }[];
}

interface BusinessDescriptionProps {
  business: Business;
}

const BusinessDescription: React.FC<BusinessDescriptionProps> = ({
  business,
}) => {
  if (!business?.name) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="font-semibold text-2xl text-white">Description</h2>
      <p className="text-lg text-gray-400 mt-4">
        {business.description
          ? business.description
          : "No description available."}
      </p>

      <h2 className="font-semibold text-2xl text-white mt-8">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {business?.image?.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg bg-gray-700"
          >
            <Image
              src={item?.url}
              alt={business.name}
              width={400} // Reduced size
              height={400} // Equal width and height
              className="w-full h-full object-cover transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessDescription;
