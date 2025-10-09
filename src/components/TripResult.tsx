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
    <div className="w-full max-w-4xl space-y-6">
      {/* Total Cost Card */}
      <Card className="p-8 backdrop-blur-lg bg-gradient-primary border-0 shadow-glow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-2">Estimated Total Cost</h2>
          <p className="text-4xl md:text-5xl font-bold text-primary-foreground">
            {parsed.totalCost || result.split("\n")[0]}
          </p>
        </div>
      </Card>

      {/* Cost Breakdown */}
      {parsed.breakdown.length > 0 && (
        <Card className="p-8 backdrop-blur-lg bg-card/80 border-border/50 shadow-soft">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            Cost Breakdown
          </h3>
          <div className="space-y-4">
            {parsed.breakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(item.category)}
                    <span className="text-lg font-medium">{item.category}</span>
                  </div>
                  <span className="text-lg font-semibold text-primary">{item.amount}</span>
                </div>
                {index < parsed.breakdown.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Money Saving Tips */}
      {parsed.tips.length > 0 && (
        <Card className="p-8 backdrop-blur-lg bg-card/80 border-border/50 shadow-soft">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-secondary" />
            Smart Saving Tips
          </h3>
          <ul className="space-y-3">
            {parsed.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-secondary">{index + 1}</span>
                </div>
                <span className="text-base leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Optional Itinerary */}
      {parsed.itinerary && (
        <Card className="p-8 backdrop-blur-lg bg-card/80 border-border/50 shadow-soft">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-accent" />
            Sample Itinerary
          </h3>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
              {parsed.itinerary}
            </pre>
          </div>
        </Card>
      )}

      {/* Plan Another Trip Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="gap-2 text-base px-8"
        >
          <RefreshCw className="w-4 h-4" />
          Plan Another Trip
        </Button>
      </div>
    </div>
  );
};
