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
    <Card className="w-full max-w-2xl p-8 backdrop-blur-lg bg-card/80 border-border/50 shadow-soft">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="origin" className="flex items-center gap-2 text-base">
            <Plane className="w-4 h-4 text-secondary rotate-45" />
            Pickup Point (Origin)
          </Label>
          <Input
            id="origin"
            type="text"
            placeholder="e.g., New York, USA"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            className="text-base"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination" className="flex items-center gap-2 text-base">
            <Plane className="w-4 h-4 text-primary" />
            Destination
          </Label>
          <Input
            id="destination"
            type="text"
            placeholder="e.g., Paris, France"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="text-base"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="days" className="flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4 text-primary" />
              Number of Days
            </Label>
            <Input
              id="days"
              type="number"
              min="1"
              max="365"
              value={formData.days}
              onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
              className="text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers" className="flex items-center gap-2 text-base">
              <Users className="w-4 h-4 text-primary" />
              Number of Travelers
            </Label>
            <Input
              id="travelers"
              type="number"
              min="1"
              max="50"
              value={formData.travelers}
              onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
              className="text-base"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetType" className="flex items-center gap-2 text-base">
            <Wallet className="w-4 h-4 text-primary" />
            Budget Type
          </Label>
          <Select
            value={formData.budgetType}
            onValueChange={(value: "Low" | "Medium" | "Luxury") =>
              setFormData({ ...formData, budgetType: value })
            }
          >
            <SelectTrigger id="budgetType" className="text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low Budget</SelectItem>
              <SelectItem value="Medium">Medium Budget</SelectItem>
              <SelectItem value="Luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-lg py-6 shadow-glow"
          disabled={isLoading}
        >
          {isLoading ? "Calculating Your Budget..." : "Generate Trip Budget"}
        </Button>
      </form>
    </Card>
  );
};
