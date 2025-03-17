import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const categoryImages = {
  "Home Services": "/HomeCleaning.jpg",
  "Maintenance Services": "/ElectricRepairs.jpg",
  "Outdoor Services": "/Gardening.jpg",
  "Automotive Services": "/CarRepair.jpg",
  "Health and Wellness": "/Fitness.jpg",
  "Food Services": "/Cooking.jpg",
  "Pet Services": "/PetGrooming.jpg",
  "Plumbing Services": "/PlumbingRepairs.jpg",
};

export default function Service({ service }) {
  const tel = service.title.trim().replace(/\s+/g, "_");

  return (
    <Link
      href={"/services/" + tel}
      className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
    >
      <div className="relative">
        <Image
          src={categoryImages[service.category] || "/images/default.jpg"}
          alt={service.title}
          width={500}
          height={200}
          className="h-[200px] w-full object-cover rounded-t-2xl"
          priority
        />
      </div>

      <div className="p-5 flex flex-col justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="bg-cyan-300 text-cyan-900 text-sm font-semibold px-3 py-1 rounded-full">
            {service.category}
          </span>
        </div>
        <h3 className="text-2xl font-semibold text-white truncate">{service.title}</h3>
        <p className="text-cyan-400 text-md">{service.mainKeywords}</p>
        <p className="text-gray-400 text-sm">${service.price}</p>

        <Button className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black shadow-md rounded-lg py-2 transition-all duration-200">
          Book Now
        </Button>
      </div>
    </Link>
  );
}
