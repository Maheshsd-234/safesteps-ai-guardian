import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, AlertTriangle, Heart } from "lucide-react";
import { useState } from "react";
import naturalDisastersImg from "@/assets/natural-disasters.jpg";
import manMadeDisastersImg from "@/assets/man-made-disasters.jpg";
import personalEmergenciesImg from "@/assets/personal-emergencies.jpg";

interface DisasterCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  image: string;
  examples: string[];
  color: string;
  stats: { trained: string; scenarios: string };
}

const categories: DisasterCategory[] = [
  {
    id: "natural",
    title: "Natural Disasters",
    description: "Learn about earthquakes, tsunamis, hurricanes, and other natural emergencies",
    icon: AlertTriangle,
    image: naturalDisastersImg,
    examples: ["Earthquakes", "Tsunamis", "Hurricanes", "Floods", "Wildfires"],
    color: "primary",
    stats: { trained: "25K+", scenarios: "8" }
  },
  {
    id: "man-made",
    title: "Man-Made Disasters", 
    description: "Understand human-caused emergencies including industrial accidents and conflicts",
    icon: Users,
    image: manMadeDisastersImg,
    examples: ["Building Fires", "Chemical Spills", "Nuclear Accidents", "Terrorism", "Riots"],
    color: "accent",
    stats: { trained: "18K+", scenarios: "6" }
  },
  {
    id: "personal",
    title: "Personal Emergencies",
    description: "Master first aid, medical emergencies, and personal safety techniques",
    icon: Heart,
    image: personalEmergenciesImg,
    examples: ["First Aid", "CPR", "Medical Emergencies", "Personal Safety", "Mental Health"],
    color: "success",
    stats: { trained: "30K+", scenarios: "12" }
  }
];

const DisasterCategories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    // Future: Navigate to detailed category page
    console.log(`Navigate to ${categoryId} category`);
  };

  return (
    <section id="disaster-categories" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your Learning Path
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Explore different types of emergencies and disasters. Each category offers 
            interactive lessons, real-world scenarios, and hands-on practice.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isHovered = hoveredCategory === category.id;
            
            return (
              <Card
                key={category.id}
                className={`disaster-card group cursor-pointer h-full transition-all duration-500 border-2 ${
                  isHovered ? 'border-primary/30 scale-[1.02]' : 'border-transparent'
                }`}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardHeader className="relative pb-4">
                  {/* Category Image */}
                  <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                    <img
                      src={category.image}
                      alt={`${category.title} illustration`}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-70'
                    }`} />
                    
                    {/* Icon Badge */}
                    <div className={`absolute top-4 right-4 p-3 rounded-full bg-${category.color} text-${category.color}-foreground shadow-lg`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-xs font-semibold text-foreground">
                        {category.stats.trained} trained
                      </div>
                    </div>
                  </div>

                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Examples */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">What You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.slice(0, 3).map((example, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 bg-${category.color}/10 text-${category.color} text-xs font-medium rounded-full`}
                        >
                          {example}
                        </span>
                      ))}
                      {category.examples.length > 3 && (
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                          +{category.examples.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full bg-${category.color} hover:bg-${category.color}/90 text-${category.color}-foreground transition-all duration-300 group-hover:translate-y-0 translate-y-1`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.id);
                    }}
                  >
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Not Sure Where to Start?
              </h3>
              <p className="text-muted-foreground mb-6">
                Take our quick assessment to get personalized learning recommendations based on your location and interests.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                Take Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DisasterCategories;