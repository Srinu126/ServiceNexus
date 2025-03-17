"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming you have a button component

type Booking = {
  providerName: string;
  service: string;
  bookingDate: string;
  bookingTime: string;
  city: string;
  providerImage: string;
  contactPerson: string;
  address: string;
  status: "confirmed" | "pending" | "cancelled";
  phone: string;
  email: string;
};

const BookingHistoryList = () => {
  const { data: session } = useSession();
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  useEffect(() => {
    if (session?.user) {
      GetUserBookingHistory();
    } else {
      redirect("/");
    }
  }, [session]);

  const GetUserBookingHistory = async () => {
    try {
      const response = await fetch("/api/bookings");
      const result = await response.json();
      if (response.ok) {
        setBookingHistory(result.bookings);
      } else {
        toast.error("No bookings found.");
      }
    } catch (error) {
      toast.error("Failed to fetch bookings.");
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">My Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookingHistory.map((booking, index) => (
            <div
              key={index}
              className={`bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out ${
                booking.status === "cancelled" ? "opacity-50" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row p-6">
                {/* Left Column - Provider Image and Name */}
                <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0">
                  <img
                    src={booking.providerImage || "/hero.webp"}
                    alt="Provider"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Right Column - Booking Information */}
                <div className="flex-grow pl-0 md:pl-6">
                  <div className="text-xl font-semibold text-white">{booking.providerName}</div>
                  <p className="text-sm text-gray-400">{booking.service}</p>

                  {/* Booking Details */}
                  <div className="mt-4 text-gray-400">
                    <div className="flex items-center mb-2">
                      <Calendar className="mr-2 text-cyan-700" />
                      <span>{formatDate(booking.bookingDate)}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="mr-2 text-cyan-700" />
                      <span>{booking.bookingTime}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <MapPin className="mr-2 text-cyan-700" />
                      <span>{booking.city}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="my-4">
                    {booking.status === "confirmed" && (
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="mr-2" />
                        <span>Confirmed</span>
                      </div>
                    )}
                    {booking.status === "pending" && (
                      <div className="flex items-center text-yellow-500">
                        <span className="mr-2">⏳</span>
                        <span>Pending</span>
                      </div>
                    )}
                    {booking.status === "cancelled" && (
                      <div className="flex items-center text-red-500">
                        <XCircle className="mr-2" />
                        <span>Cancelled</span>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="text-sm text-gray-300 mt-4">
                    <p><strong>Contact :</strong> Srinu</p>
                    <p><strong>Phone :</strong> <a href={`tel:${booking.phone}`} className="text-cyan-400">+1(882)7770000</a></p>
                    <p><strong>Email :</strong> <a href={`mailto:${booking.email}`} className="text-cyan-400">srinurach123@gmail.com</a></p>
                  </div>

                  {/* Action Buttons */}
                 
                </div>
              </div>
              <div className="flex justify-around mb-3">
                    <Button className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-2 rounded-lg transition-all ease-in-out hover:scale-105">
                      View Details
                    </Button>
                    <Button
                      className={`${
                        booking.status === "confirmed"
                          ? "bg-red-600 hover:bg-red-500"
                          : "bg-gray-600"
                      } text-white font-semibold px-6 py-2 rounded-lg transition-all ease-in-out hover:scale-105`}
                      disabled={booking.status !== "confirmed"}
                    >
                      Cancel Booking
                    </Button>
                  </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryList;
