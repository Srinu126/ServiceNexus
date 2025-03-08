/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { toast } from "sonner"; // Toast notifications
import { redirect } from "next/navigation";

type Booking = {
  providerName: string;
  service: string;
  bookingDate: string;
  bookingTime: string;
  city: string;
  providerImage: string;
  contactPerson: string;
  address: string;
};

const BookingHistoryList = () => {
  const { data: session } = useSession();
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  useEffect(() => {
    if (session.user) {
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

  return (
    <div className="p-6 bg-dark-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">My Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingHistory.map((booking, index) => (
            <div
              key={index}
              className="bg-dark-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="rounded-full w-24 h-24 border-2 border-purple-500 overflow-hidden">
                  <img
                    src="/hero.webp"
                    alt="Provider Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {booking.providerName}
                  </h3>
                  <p className="text-sm text-gray-400">{booking.service}</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-lg text-white">Booking Details</h4>
                <div className="flex items-center text-gray-400 space-x-2">
                  <Calendar className="text-purple-400" />
                  <span>{booking.bookingDate}</span>
                </div>
                <div className="flex items-center text-gray-400 space-x-2">
                  <Clock className="text-purple-400" />
                  <span>{booking.bookingTime}</span>
                </div>
                <div className="flex items-center text-gray-400 space-x-2">
                  <MapPin className="text-purple-400" />
                  <span>{booking.city}</span>
                </div>
              </div>
              <div className="flex justify-between space-x-4">
                <button className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-lg mt-3 transition-all ease-in-out">
                  View Details
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg mt-3 transition-all ease-in-out">
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryList;
