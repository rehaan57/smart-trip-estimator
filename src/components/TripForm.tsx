import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plane, Calendar, Users, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TripFormProps {
  onGenerateBudget: (data: TripFormData) => void;
  isLoading: boolean;
}

export interface TripFormData {
  origin: string;
  destination: string;
  days: number;
  travelers: number;
  budgetType: "Low" | "Medium" | "Luxury";
}

export const TripForm = ({ onGenerateBudget, isLoading }: TripFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TripFormData>({
    origin: "",
    destination: "",
    days: 3,
    travelers: 1,
    budgetType: "Medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.origin.trim()) {
      toast({
        title: "Pickup point required",
        description: "Please enter your departure city",
        variant: "destructive",
      });
      return;
    }

    if (!formData.destination.trim()) {
      toast({
        title: "Destination required",
        description: "Please enter a destination",
        variant: "destructive",
      });
      return;
    }

    if (formData.days < 1 || formData.days > 365) {
      toast({
        title: "Invalid duration",
        description: "Days must be between 1 and 365",
        variant: "destructive",
      });
      return;
    }

    if (formData.travelers < 1 || formData.travelers > 50) {
      toast({
        title: "Invalid travelers count",
        description: "Number of travelers must be between 1 and 50",
        variant: "destructive",
      });
      return;
    }

    onGenerateBudget(formData);
  };

  return (
    <Card className="w-full max-w-3xl p-10 md:p-12 backdrop-blur-xl bg-card/60 border-primary/20 shadow-premium relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-luxury opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Plan Your Journey
        </h2>
        <p className="text-center text-muted-foreground mb-8">Precision budgeting for extraordinary experiences</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="origin" className="flex items-center gap-2 text-base font-medium text-foreground/90">
              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Plane className="w-4 h-4 text-secondary rotate-45" />
              </div>
              Departure City
            </Label>
            <Input
              id="origin"
              type="text"
              placeholder="New York, Tokyo, London..."
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              className="text-base h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="destination" className="flex items-center gap-2 text-base font-medium text-foreground/90">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Plane className="w-4 h-4 text-primary" />
              </div>
              Dream Destination
            </Label>
            <Input
              id="destination"
              type="text"
              placeholder="Bali, Paris, Maldives..."
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="text-base h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="days" className="flex items-center gap-2 text-base font-medium text-foreground/90">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-accent" />
                </div>
                Duration
              </Label>
              <Input
                id="days"
                type="number"
                min="1"
                max="365"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
                className="text-base h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="travelers" className="flex items-center gap-2 text-base font-medium text-foreground/90">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                Travelers
              </Label>
              <Input
                id="travelers"
                type="number"
                min="1"
                max="50"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                className="text-base h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="budgetType" className="flex items-center gap-2 text-base font-medium text-foreground/90">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              Experience Level
            </Label>
            <Select
              value={formData.budgetType}
              onValueChange={(value: "Low" | "Medium" | "Luxury") =>
                setFormData({ ...formData, budgetType: value })
              }
            >
              <SelectTrigger id="budgetType" className="text-base h-12 bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Budget Explorer</SelectItem>
                <SelectItem value="Medium">Comfort Traveler</SelectItem>
                <SelectItem value="Luxury">Luxury Connoisseur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90 transition-all text-lg py-7 shadow-premium font-semibold relative overflow-hidden group"
            disabled={isLoading}
          >
            <span className="relative z-10">
              {isLoading ? "Crafting Your Perfect Budget..." : "Calculate My Budget"}
            </span>
            <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Button>
        </form>
      </div>
    </Card>
  );
};
