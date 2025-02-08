"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/Skeleton";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      if (!session) {
        router.push("/");
      } else {
        if (session?.user) {
          setUserData({
            name: session.user.name || "",
            email: session.user.email || "",
            phone: session.user.phone || "",
          });
        }
      }
    }
  }, [session, status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            disabled
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            placeholder="Your Phone Number"
          />
        </div>
      </div>
      <Button onClick={handleUpdateProfile} className="mt-6" disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
};

export default ProfilePage;
