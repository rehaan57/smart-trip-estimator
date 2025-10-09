import { useState } from "react";
import { Link } from "react-router-dom";
import { TripForm, type TripFormData } from "@/components/TripForm";
import { TripResult } from "@/components/TripResult";
import { useToast } from "@/hooks/use-toast";
import { Plane, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [tripResult, setTripResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateBudget = async (formData: TripFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-trip-budget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate budget");
      }

      const data = await response.json();
      
      if (data.result) {
        setTripResult(data.result);
      } else {
        throw new Error("No result received");
      }
    } catch (error) {
      console.error("Error generating budget:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate trip budget. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTripResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-bg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <header className="pt-12 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 shadow-glow">
              <Plane className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              TripBudget
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered travel budget calculator. Get instant cost estimates, smart saving tips, and personalized itineraries for your next adventure.
            </p>
            <Link to="/blog" className="inline-block mt-6">
              <Button variant="outline" size="lg">
                <BookOpen className="w-4 h-4 mr-2" />
                Read Travel Tips & Guides
              </Button>
            </Link>
          </div>
        </header>

        <main className="pb-20 px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {!tripResult ? (
              <TripForm onGenerateBudget={handleGenerateBudget} isLoading={isLoading} />
            ) : (
              <TripResult result={tripResult} onReset={handleReset} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
