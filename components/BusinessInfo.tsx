import React from "react";
import Image from "next/image";
import { Clock, Mail, MapPin, Share, User } from "lucide-react";
import { Button } from "./ui/button";

interface Business {
  name: string;
  image: { url: string }[];
  category?: { name: string };
  address: string;
  email: string;
  contactPerson: string;
}

interface BusinessInfoProps {
  business: Business;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ business }) => {
  return (
    business?.name && (
      <div className="md:flex gap-6 items-center  p-6 rounded-2xl shadow-lg">
        <Image
          src={business.image[0].url}
          alt={business.name}
          width={150}
          height={150}
          className="rounded-full h-[150px] object-cover border-4 border-gray-700 shadow-md"
        />
        <div className="md:flex items-center justify-between w-full">
          <div className="flex flex-col items-baseline gap-3 mt-4 md:mt-0">
            <h2 className="px-3 py-1 bg-cyan-600 text-white rounded-full text-sm font-medium shadow-md">
              {business?.category?.name}
            </h2>
            <h2 className="text-3xl md:text-4xl uppercase font-bold text-gray-100">
              {business.name}
            </h2>
            <h2 className="flex items-center gap-2 text-lg text-gray-400">
              <MapPin className="text-cyan-600" />
              {business.address}
            </h2>
            <h2 className="flex items-center gap-2 text-lg text-gray-400">
              <Mail className="text-cyan-600" />
              {business.email}
            </h2>
          </div>
          <div className="flex flex-col gap-5 items-end">
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-xl shadow-md">
              <Share className="w-5 h-5" />
            </Button>
            <h2 className="flex items-center gap-2 text-lg font-medium text-gray-300">
              <User className="text-cyan-600" />
              {business.contactPerson}
            </h2>
            <h2 className="flex items-center gap-2 text-lg font-medium text-gray-300">
              <Clock className="text-cyan -400" />
              Available 8:00 AM to 10:00 PM
            </h2>
          </div>
        </div>
      </div>
    )
  );
};

export default BusinessInfo;
