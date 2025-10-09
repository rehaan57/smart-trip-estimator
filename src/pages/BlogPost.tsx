import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPostsData: Record<string, BlogPostData> = {
  "budget-travel-tips": {
    id: "budget-travel-tips",
    title: "10 Essential Budget Travel Tips for 2025",
    date: "2025-03-15",
    readTime: "5 min read",
    category: "Budget Tips",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop",
    content: `
      <p>Traveling doesn't have to drain your bank account. With smart planning and these proven strategies, you can explore the world without breaking the bank.</p>

      <h2>1. Be Flexible with Your Travel Dates</h2>
      <p>Flying mid-week or during off-peak seasons can save you up to 40% on flights. Use our TripBudget calculator to compare costs across different time periods.</p>

      <h2>2. Book Flights in Advance (But Not Too Far)</h2>
      <p>The sweet spot for booking domestic flights is typically 3-7 weeks before departure. For international flights, aim for 2-5 months in advance.</p>

      <h2>3. Consider Alternative Accommodations</h2>
      <p>Hotels aren't your only option. Hostels, vacation rentals, and home exchanges can offer significant savings while providing unique local experiences.</p>

      <h2>4. Eat Like a Local</h2>
      <p>Skip tourist-trap restaurants and eat where locals do. Street food and local markets offer authentic cuisine at a fraction of the price.</p>

      <h2>5. Use Public Transportation</h2>
      <p>Taxis and rental cars can quickly inflate your budget. Public transportation not only saves money but also gives you a more authentic travel experience.</p>

      <h2>6. Look for Free Activities</h2>
      <p>Many cities offer free walking tours, museums with free entry days, and beautiful parks and beaches that cost nothing to enjoy.</p>

      <h2>7. Travel with a Group</h2>
      <p>Splitting costs for accommodation, transportation, and meals with travel companions can significantly reduce per-person expenses.</p>

      <h2>8. Book Package Deals</h2>
      <p>Sometimes bundling flights and hotels together offers better value than booking separately. Always compare prices both ways.</p>

      <h2>9. Avoid Tourist Traps</h2>
      <p>Research beforehand to identify overpriced tourist attractions. Often, equally impressive alternatives exist nearby at lower costs.</p>

      <h2>10. Use Budget Planning Tools</h2>
      <p>Tools like TripBudget help you estimate and plan your entire trip budget, including hidden costs you might otherwise forget.</p>

      <p class="conclusion">Start planning your next adventure with confidence. Use our AI-powered budget calculator to get personalized cost estimates for your dream destination!</p>
    `,
  },
  "ai-travel-planning": {
    id: "ai-travel-planning",
    title: "How AI is Revolutionizing Travel Planning",
    date: "2025-03-10",
    readTime: "7 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    content: `
      <p>Artificial intelligence is transforming how we plan and experience travel. Here's how AI technology is making travel planning smarter, faster, and more personalized.</p>

      <h2>Personalized Budget Estimates</h2>
      <p>AI-powered tools analyze millions of data points to provide accurate budget estimates based on your specific travel style, destination, and preferences. TripBudget uses advanced AI to give you realistic cost breakdowns in seconds.</p>

      <h2>Smart Itinerary Planning</h2>
      <p>AI algorithms can create optimized itineraries that maximize your time and minimize costs, considering factors like opening hours, location proximity, and seasonal pricing.</p>

      <h2>Predictive Price Analysis</h2>
      <p>Machine learning models predict the best times to book flights and hotels, helping you save hundreds of dollars on your trips.</p>

      <h2>Real-Time Recommendations</h2>
      <p>AI assistants can suggest restaurants, activities, and attractions based on your preferences, budget, and real-time conditions like weather and crowd levels.</p>

      <h2>Language Translation</h2>
      <p>AI-powered translation tools break down language barriers, making it easier to navigate foreign countries and communicate with locals.</p>

      <h2>The Future of AI Travel</h2>
      <p>As AI continues to evolve, we can expect even more sophisticated travel planning tools that understand context, learn from your preferences, and provide increasingly accurate predictions.</p>

      <p class="conclusion">Experience the power of AI travel planning with TripBudget – get instant, accurate budget estimates for your next adventure!</p>
    `,
  },
  "luxury-on-budget": {
    id: "luxury-on-budget",
    title: "Experiencing Luxury Travel on a Medium Budget",
    date: "2025-03-05",
    readTime: "6 min read",
    category: "Luxury Travel",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=600&fit=crop",
    content: `
      <p>You don't need unlimited funds to enjoy luxury travel experiences. With strategic planning, you can indulge in premium accommodations and experiences without the premium price tag.</p>

      <h2>Leverage Loyalty Programs</h2>
      <p>Hotel and airline loyalty programs can provide free upgrades, complimentary services, and exclusive perks that elevate your travel experience.</p>

      <h2>Book Luxury at Off-Peak Times</h2>
      <p>Five-star hotels often slash prices during shoulder seasons. You get the same luxury experience at a fraction of the cost.</p>

      <h2>Focus on Experiences, Not Duration</h2>
      <p>Instead of a week in average accommodations, consider 3-4 nights in a luxury resort. The memories will last just as long.</p>

      <h2>Use Points and Miles Strategically</h2>
      <p>Credit card rewards and travel points can cover expensive elements like business class flights or luxury hotel stays.</p>

      <h2>Look for Inclusive Packages</h2>
      <p>All-inclusive luxury resorts often provide better value than paying à la carte for accommodations, meals, and activities separately.</p>

      <h2>Choose Destinations with Favorable Exchange Rates</h2>
      <p>Your money goes further in countries with favorable currency exchange, allowing you to afford luxury that would be out of reach elsewhere.</p>

      <p class="conclusion">Use TripBudget to explore luxury travel options within your budget – our AI helps you find the perfect balance between cost and comfort!</p>
    `,
  },
};

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  if (!id || !blogPostsData[id]) {
    return <Navigate to="/blog" replace />;
  }

  const post = blogPostsData[id];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Blog post link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <Card className="overflow-hidden backdrop-blur-lg bg-card/80 border-border/50 shadow-glow">
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-semibold rounded-full">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Post Meta */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Separator className="mb-8" />

            {/* Post Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-foreground
                prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Separator className="my-8" />

            {/* CTA */}
            <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Ready to Plan Your Trip?</h3>
              <p className="text-muted-foreground mb-6">
                Get an AI-powered budget estimate for your next adventure in seconds
              </p>
              <Link to="/">
                <Button size="lg" className="shadow-glow">
                  Try TripBudget Calculator
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
