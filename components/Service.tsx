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
    "Plumbing Services": "/PlumbingRepairs.jpg"
  };

export default function Service({service}){
    return (
        <Link
  href={"/details/" + service.id}
  className="shadow-md rounded-lg hover:shadow-lg cursor-pointer hover:shadow-cyan-400 hover:scale-105 transition-all ease-in-out bg-gray-900"
>
  <Image
    src={categoryImages[service.category] || "/images/default.jpg"} // Fallback image
    alt={service.title}
    width={500}
    height={200}
    className="h-[150px] md:h-[200px] object-cover rounded-lg"
  />
  <div className="flex flex-col items-baseline p-3 gap-1">
    <h2 className="p-1 bg-cyan-300 text-cyan-900 rounded-full regular-14 px-2">
      {service.category}
    </h2>
    <h2 className="font-bold text-lg text-white">{service.title}</h2>
    <h2 className="text-cyan-400">{service.mainKeywords}</h2>
    <h2 className="text-gray-400 text-sm">${service.price}</h2>
    <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-lg mt-3 transition-all ease-in-out">
      Book Now
    </Button>
  </div>
</Link>
    )

}