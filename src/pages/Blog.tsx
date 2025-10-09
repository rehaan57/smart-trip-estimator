import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Home } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "budget-travel-tips",
    title: "10 Essential Budget Travel Tips for 2025",
    excerpt: "Discover proven strategies to cut your travel costs by up to 40% without sacrificing quality experiences.",
    date: "2025-03-15",
    readTime: "5 min read",
    category: "Budget Tips",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop",
  },
  {
    id: "ai-travel-planning",
    title: "How AI is Revolutionizing Travel Planning",
    excerpt: "Learn how artificial intelligence helps travelers plan smarter trips and save money with personalized recommendations.",
    date: "2025-03-10",
    readTime: "7 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
  },
  {
    id: "luxury-on-budget",
    title: "Experiencing Luxury Travel on a Medium Budget",
    excerpt: "Expert tips on finding luxury accommodations and experiences without breaking the bank.",
    date: "2025-03-05",
    readTime: "6 min read",
    category: "Luxury Travel",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=500&fit=crop",
  },
  {
    id: "hidden-costs",
    title: "Hidden Travel Costs You Need to Budget For",
    excerpt: "Don't let unexpected expenses ruin your trip. Here's what most travelers forget to include in their budget.",
    date: "2025-02-28",
    readTime: "4 min read",
    category: "Budget Tips",
    image: "https://images.unsplash.com/photo-1554224311-beee460201f9?w=800&h=500&fit=crop",
  },
  {
    id: "best-destinations-2025",
    title: "Top 10 Budget-Friendly Destinations for 2025",
    excerpt: "Explore incredible destinations that offer amazing experiences without emptying your wallet.",
    date: "2025-02-20",
    readTime: "8 min read",
    category: "Destinations",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=500&fit=crop",
  },
  {
    id: "flight-booking-secrets",
    title: "Flight Booking Secrets Airlines Don't Want You to Know",
    excerpt: "Master the art of finding cheap flights with these insider tips and timing strategies.",
    date: "2025-02-15",
    readTime: "6 min read",
    category: "Flights",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TripBudget Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert insights, tips, and guides to help you travel smarter and save money
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group">
              <Card className="h-full overflow-hidden backdrop-blur-lg bg-card/80 border-border/50 shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-primary font-semibold">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
