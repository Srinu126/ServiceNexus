"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Notebook } from "lucide-react";
// import GlobalApi from '@/app/api/GlobalApi';
import BookingSection from "@/components/BookingSection";
import Image from "next/image";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  description: string;
  category: {
    name: string;
  };
  image: { url: string }[];
  contactPerson: string;
  address: string;
  // Add other necessary fields from your Business type
}

interface SimilarBusinessProps {
  business: Business;
}

const SimilarBusiness: React.FC<SimilarBusinessProps> = ({ business }) => {
  const [businessList, setBusinessList] = useState<Business[]>([]);

  useEffect(() => {
    //business && getBusinessList();
  }, [business]);

  const getBusinessList = () => {
    GlobalApi.getBusinessByCategory(business?.category?.name).then((resp) => {
      setBusinessList(resp?.businessLists);
    });
  };

  return business?.name ? (
    <div className="md:pl-10">
      <BookingSection business={business}>
        <Button className="bg-cyan-500 hover:bg-cyan-400 text-white flex gap-2 w-full">
          <Notebook />
          Book Appointment
        </Button>
      </BookingSection>
    </div>
  ) : null;
};

export default SimilarBusiness;
