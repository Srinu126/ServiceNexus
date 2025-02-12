"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const ServiceDetailPage = () => {
  const router = useRouter();
  // const { id } = router.query; 
  const [service, setService] = useState(null);
  const [provider, setProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // if (!id) return;

    // Fetch the service details
    // fetch(`/api/services/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => setService(data.service));
    setService({
        id: 1,
        providerId: 1,
        title: "Home Cleaning",
        description: "Home Cleaning Description",
        category: "Home Cleaning Category",
        mainKeywords: "main key words",
        price: "$120",
        createdAt: "2025-02-11",

    })

    setProvider({
        id:1,
        name: "Srinu",
        email: "srachakonda8959@conestogac.on.ca",
        phone: "3828839393",
        province: "ON",
        city: "Waterloo",
        availability: "YES",
        createdAt: "2025-02-11",

    })

    // Fetch the provider details
    // fetch(`/api/providers/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => setProvider(data.provider));
  }, 
  // [id]
);

  if (!service || !provider) {
    return <div className="flex justify-center my-10">Loading...</div>;
  }

  return (
    <div className="padding-container my-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Service Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={`/images/${service.category.toLowerCase().replace(" ", "-")}.jpg`}
              alt={service.title}
              width={800}
              height={400}
              className="rounded-lg"
            />
            <p className="mt-5 text-gray-600">{service.description}</p>
            <div className="mt-5">
              <h3 className="font-medium">Category:</h3>
              <p>{service.category}</p>
            </div>
            <div className="mt-3">
              <h3 className="font-medium">Price:</h3>
              <p>${service.price}</p>
            </div>
            <div className="mt-3">
              <h3 className="font-medium">Main Keywords:</h3>
              <p>{service.mainKeywords}</p>
            </div>
          </CardContent>
        </Card>

        {/* Provider Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Service Provider Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium">{provider.name}</h3>
            <p className="text-gray-600">City: {provider.city}</p>
            <p className="text-gray-600">Availability: {provider.availability}</p>
            <div className="mt-5">
              <h3 className="font-medium">Customer Satisfaction:</h3>
              <Progress value={80} className="mt-2" />
            </div>
            <div className="mt-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Contact Provider</Button>
                </DialogTrigger>
                <DialogContent>
                  <h3 className="text-lg font-medium">Contact {provider.name}</h3>
                  <p>Phone: {provider.phone}</p>
                  <p>Email: {provider.email}</p>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Book this Service</h2>
        <div className="mt-5">
          {/* <Tooltip>
            <TooltipTrigger>
              <Button className="bg-purple-700 text-white">Select Date</Button>
            </TooltipTrigger>
            <TooltipContent>Click to open the calendar</TooltipContent>
          </Tooltip> */}
          <div className="mt-5">
            <Calendar
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
        </div>
        <Button className="bg-purple-700 text-white mt-5">Confirm Booking</Button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
