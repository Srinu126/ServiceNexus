import { ReactNode, useEffect, useState } from "react";
import moment from "moment";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Business = {
  id: string;
  // Add other relevant fields if necessary
};

type BookingSectionProps = {
  children: ReactNode;
  business?: Business;
};

const BookingSection = ({ children }: BookingSectionProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlot, setTimeSlot] = useState<{ time: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [bookedSlot, setBookedSlot] = useState<{ time: string }[]>([]);
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }
    setTimeSlot(timeList);
  };

  const saveBooking = async () => {
    if (selectedTime && session?.user) {
      const bookingDetails = {
        providerId: 1,
        serviceId: 9,
        bookingDate: moment(date).format("YYYY-MM-DD"),
        bookingTime: selectedTime,
        customerName: session.user.name,
        customerEmail: session.user.email,
        city: "Waterloo",
      };

      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        });

        const result = await response.json();
        if (result.message) {
          toast("Service booked successfully!");
          setDate(new Date());
          setSelectedTime(undefined);
          router.push("/bookings");
         } else {
          toast(result.error || "Error while creating booking");
        }
      } catch (error) {
        toast("Error while creating booking");
        console.error(error);
      }
    }
  };

  const isSlotBooked = (time: string) => {
    return bookedSlot.some((item) => item.time === time);
  };

  const handleDateSelect = (day: Date | undefined) => {
    if (day) {
      setDate(day);
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger suppressHydrationWarning asChild>
          {children}
        </SheetTrigger>
        <SheetContent className="overflow-auto bg-dark-800 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">Book a Service</SheetTitle>
            <SheetDescription className="text-gray-300">
              Select Date and Time slot to book a service
              <div className="flex flex-col items-baseline gap-5">
                <span className="mt-5 font-bold">Select Date</span>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border border-gray-600 bg-gray-700 text-white"
                  dayClassName={(day) =>
                    day === date
                      ? "bg-purple-600 text-white" // Highlight selected day
                      : "hover:bg-purple-600 hover:text-white"
                  }
                />
              </div>
              <h2 className="my-5 font-bold text-white">Select Time Slot</h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    disabled={isSlotBooked(item.time)}
                    variant="outline"
                    className={`border border-gray-500 rounded-full p-2 px-3 hover:bg-cyan-700 hover:text-white ${
                      selectedTime === item.time
                        ? "bg-cyan-600 text-white"
                        : "bg-dark-700"
                    }`}
                    onClick={() => setSelectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button className="bg-cyan-700 text-white hover:bg-cyan-800">
                  Cancel
                </Button>
                <Button
                  className="bg-cyan-600 text-white hover:bg-cyan-700"
                  disabled={!(selectedTime && date)}
                  onClick={saveBooking}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookingSection;
