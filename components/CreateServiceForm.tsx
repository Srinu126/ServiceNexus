"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Define category options
const categories = [
  "Home Services",
  "Maintenance Services",
  "Outdoor Services",
  "Automotive Services",
  "Health and Wellness",
  "Food Services",
  "Pet Services",
  "Plumbing Services",
];

// Define Zod schema for validation
const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  category: z.string().min(1, "Category is required."),
  mainKeywords: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price."),
});

export default function CreateServiceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const providerId = 2;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = async (data: any) => {
    const payload = { ...data, providerId }; // Ensure providerId is sent
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create service.");
      }
      toast.success("Service booked successfully!");
      
      router.push("/services");
    } catch (error) {
      console.error("Error", error);
      toast.error("Failed to create the service")
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Create a New Service
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Service Title */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Service Title
          </label>
          <Input
            placeholder="Enter service title"
            {...register("title")}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Description
          </label>
          <Textarea
            placeholder="Write a detailed description..."
            {...register("description")}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg h-28 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category (Restricted to your provided list) */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Category
          </label>
          <Select onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger className="bg-gray-800 border border-gray-700 text-white rounded-lg">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border border-gray-800">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Main Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Main Keywords
          </label>
          <Input
            placeholder="Enter keywords (optional)"
            {...register("mainKeywords")}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Price ($)
          </label>
          <Input
            placeholder="Enter service price"
            {...register("price")}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg"
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 w-full py-3 rounded-xl text-lg font-medium transition-all"
        >
          {loading ? "Creating..." : "Create Service"}
        </Button>
      </form>
    </div>
  );
}
