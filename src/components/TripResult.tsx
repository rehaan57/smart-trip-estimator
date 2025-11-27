import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, DollarSign, Home, Utensils, Car, Sparkles, MapPin, Lightbulb } from "lucide-react";

interface TripResultProps {
  result: string;
  onReset: () => void;
}

export const TripResult = ({ result, onReset }: TripResultProps) => {
  // Parse the AI response to extract structured data
  const parseResult = (text: string) => {
    const sections = {
      totalCost: "",
      breakdown: [] as { category: string; amount: string }[],
      tips: [] as string[],
      itinerary: "",
    };

    const lines = text.split("\n");
    let currentSection = "";

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.toLowerCase().includes("total") && trimmedLine.toLowerCase().includes("cost")) {
        currentSection = "total";
        sections.totalCost = trimmedLine;
      } else if (trimmedLine.toLowerCase().includes("breakdown") || trimmedLine.toLowerCase().includes("stay")) {
        currentSection = "breakdown";
      } else if (trimmedLine.toLowerCase().includes("tip") || trimmedLine.toLowerCase().includes("saving")) {
        currentSection = "tips";
      } else if (trimmedLine.toLowerCase().includes("itinerary")) {
        currentSection = "itinerary";
      } else if (trimmedLine) {
        if (currentSection === "breakdown" && (trimmedLine.includes(":") || trimmedLine.includes("-"))) {
          const parts = trimmedLine.split(/[:-]/);
          if (parts.length >= 2) {
            sections.breakdown.push({
              category: parts[0].trim().replace(/^\d+\.?\s*/, "").replace(/[*#]/g, ""),
              amount: parts.slice(1).join(":").trim().replace(/[*#]/g, ""),
            });
          }
        } else if (currentSection === "tips") {
          sections.tips.push(trimmedLine.replace(/^\d+\.?\s*/, "").replace(/[*#-]/g, "").trim());
        } else if (currentSection === "itinerary") {
          sections.itinerary += trimmedLine + "\n";
        }
      }
    }

    return sections;
  };

  const parsed = parseResult(result);

  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes("stay") || lower.includes("hotel") || lower.includes("accommodation")) {
      return <Home className="w-5 h-5 text-primary" />;
    }
    if (lower.includes("food") || lower.includes("meal") || lower.includes("dining")) {
      return <Utensils className="w-5 h-5 text-secondary" />;
    }
    if (lower.includes("transport") || lower.includes("travel") || lower.includes("flight")) {
      return <Car className="w-5 h-5 text-accent" />;
    }
    if (lower.includes("activit") || lower.includes("entertainment")) {
      return <Sparkles className="w-5 h-5 text-primary" />;
    }
    return <DollarSign className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="w-full max-w-5xl space-y-8">
      {/* Total Cost Card */}
      <Card className="p-12 md:p-16 backdrop-blur-xl bg-gradient-primary border-0 shadow-premium relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="relative text-center">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary-foreground mb-4 tracking-wide">Your Bespoke Travel Investment</h2>
          <p className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground tracking-tight">
            {parsed.totalCost || result.split("\n")[0]}
          </p>
          <p className="text-primary-foreground/80 mt-4 text-lg">Comprehensive budget for your luxury journey</p>
        </div>
      </Card>

      {/* Cost Breakdown */}
      {parsed.breakdown.length > 0 && (
        <Card className="p-10 md:p-12 backdrop-blur-xl bg-card/60 border-primary/20 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-secondary opacity-5 rounded-full blur-3xl"></div>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 flex items-center gap-3 relative">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            Investment Breakdown
          </h3>
          <div className="space-y-6 relative">
            {parsed.breakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between py-4 group hover:bg-primary/5 px-4 rounded-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="text-lg md:text-xl font-medium">{item.category}</span>
                  </div>
                  <span className="text-lg md:text-xl font-bold text-primary">{item.amount}</span>
                </div>
                {index < parsed.breakdown.length - 1 && <Separator className="opacity-30" />}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Money Saving Tips */}
      {parsed.tips.length > 0 && (
        <Card className="p-10 md:p-12 backdrop-blur-xl bg-card/60 border-secondary/20 shadow-premium relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-luxury opacity-5 rounded-full blur-3xl"></div>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 flex items-center gap-3 relative">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-secondary" />
            </div>
            Insider Travel Strategies
          </h3>
          <ul className="space-y-5 relative">
            {parsed.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-4 group hover:bg-secondary/5 p-4 rounded-lg transition-all">
                <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center flex-shrink-0 shadow-soft">
                  <span className="text-base font-bold text-secondary-foreground">{index + 1}</span>
                </div>
                <span className="text-base md:text-lg leading-relaxed pt-1">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Optional Itinerary */}
      {parsed.itinerary && (
        <Card className="p-10 md:p-12 backdrop-blur-xl bg-card/60 border-accent/20 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-luxury opacity-5 rounded-full blur-3xl"></div>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 flex items-center gap-3 relative">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            Curated Itinerary
          </h3>
          <div className="prose prose-lg max-w-none relative">
            <pre className="whitespace-pre-wrap font-sans text-base md:text-lg leading-relaxed text-foreground/90 bg-background/30 p-6 rounded-xl">
              {parsed.itinerary}
            </pre>
          </div>
        </Card>
      )}

      {/* Plan Another Trip Button */}
      <div className="flex justify-center pt-8">
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="gap-3 text-lg px-10 py-7 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all shadow-soft"
        >
          <RefreshCw className="w-5 h-5" />
          Plan Another Journey
        </Button>
      </div>
    </div>
  );
};
