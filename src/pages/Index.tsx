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
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background with Image Collage */}
      <div className="fixed inset-0 z-0">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-bg"></div>
        
        {/* Image Grid - Different continents */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-3 grid-rows-3 h-full">
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=800&fit=crop&q=80" alt="Paris" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&q=80" alt="Mountains" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=800&fit=crop&q=80" alt="Japan" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=800&fit=crop&q=80" alt="Iceland" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=800&fit=crop&q=80" alt="Beach" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=800&fit=crop&q=80" alt="Desert" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=800&fit=crop&q=80" alt="Morocco" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=800&fit=crop&q=80" alt="Road Trip" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=800&fit=crop&q=80" alt="Lake" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <header className="pt-16 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl mb-8 shadow-premium">
              <Plane className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              TripBudget
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto font-light leading-relaxed mb-8">
              Experience the world with confidence. AI-powered luxury travel budgeting for discerning travelers seeking extraordinary adventures.
            </p>
            <Link to="/blog" className="inline-block">
              <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Travel Insights
              </Button>
            </Link>
          </div>
        </header>

        <main className="pb-24 px-4">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
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
