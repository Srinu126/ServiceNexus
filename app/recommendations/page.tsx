"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const RecommendationPage = () => {
  const [formData, setFormData] = useState({
    serviceType: "",
    location: "",
    budget: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const extractArrayFromResponse = (responseText: string): any[] => {
    const match = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/); // Extracts JSON array
    if (!match) throw new Error("No valid JSON array found in response");
    return Array.from(JSON.parse(match[0])); // Parse the extracted JSON array
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      const response = await fetch("/api/get-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch recommendations");

      setRecommendations(extractArrayFromResponse(data.recommendations));
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto my-12 px-6">
      {/* Page Header */}
      <h1 className="text-center text-4xl font-bold text-white mb-6">
        Find Your Perfect Service
      </h1>

      {/* Input Form */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="serviceType"
            placeholder="What service do you need?"
            className="bg-gray-800 text-white border-gray-700"
            value={formData.serviceType}
            onChange={handleChange}
          />
          <Input
            name="location"
            placeholder="Enter your city or area"
            className="bg-gray-800 text-white border-gray-700"
            value={formData.location}
            onChange={handleChange}
          />
          <Input
            name="budget"
            placeholder="Budget (optional)"
            className="bg-gray-800 text-white border-gray-700"
            value={formData.budget}
            onChange={handleChange}
          />
          <Textarea
            name="details"
            placeholder="Additional details (optional)"
            className="bg-gray-800 text-white border-gray-700"
            value={formData.details}
            onChange={handleChange}
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={fetchRecommendations}
            disabled={loading}
            className="w-full text-white md:w-auto flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
            {loading ? "Searching..." : "Find Recommendations"}
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {recommendations.map((rec, index) => (
          <Card
            key={index}
            className="bg-gray-900 border border-gray-700 text-white shadow-lg"
          >
            <CardHeader>
              <CardTitle>{rec.serviceProvider}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Service:</strong> {rec.service}
              </p>
              <p>
                <strong>Cost:</strong> ${rec.cost}
              </p>
              <p>
                <strong>Location:</strong> {rec.city}
              </p>
              <p>
                <strong>Details:</strong> {rec.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecommendationPage;
