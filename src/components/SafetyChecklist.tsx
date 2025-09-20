import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Download, 
  RefreshCcw, 
  Package,
  Home,
  Car,
  Smartphone
} from "lucide-react";
import { toast } from "sonner";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: "home" | "kit" | "vehicle" | "digital";
  priority: "high" | "medium" | "low";
}

const checklistItems: ChecklistItem[] = [
  // Home Preparedness
  { id: "smoke-detector", title: "Install smoke detectors", description: "Test monthly, replace batteries annually", category: "home", priority: "high" },
  { id: "fire-extinguisher", title: "Fire extinguisher accessible", description: "Check pressure gauge, know how to use", category: "home", priority: "high" },
  { id: "evacuation-plan", title: "Create evacuation plan", description: "Practice with all family members", category: "home", priority: "high" },
  { id: "utility-shutoffs", title: "Know utility shut-offs", description: "Gas, water, and electricity locations", category: "home", priority: "medium" },
  
  // Emergency Kit
  { id: "water-supply", title: "Water supply (1 gal/person/day)", description: "3-day minimum supply stored", category: "kit", priority: "high" },
  { id: "food-supply", title: "Non-perishable food", description: "3-day supply, include can opener", category: "kit", priority: "high" },
  { id: "first-aid", title: "First aid kit", description: "Fully stocked with bandages, medications", category: "kit", priority: "high" },
  { id: "flashlight", title: "Flashlight and batteries", description: "Extra batteries for each device", category: "kit", priority: "high" },
  { id: "radio", title: "Emergency radio", description: "Battery or hand-crank powered", category: "kit", priority: "medium" },
  { id: "medications", title: "Essential medications", description: "7-day supply for each person", category: "kit", priority: "high" },
  
  // Vehicle
  { id: "car-kit", title: "Vehicle emergency kit", description: "Jumper cables, tire repair, blanket", category: "vehicle", priority: "medium" },
  { id: "fuel", title: "Keep fuel tank half full", description: "Always maintain minimum fuel level", category: "vehicle", priority: "medium" },
  
  // Digital
  { id: "emergency-contacts", title: "Emergency contact list", description: "Physical and digital copies", category: "digital", priority: "high" },
  { id: "important-docs", title: "Important documents copied", description: "ID, insurance, medical info", category: "digital", priority: "medium" },
  { id: "emergency-apps", title: "Emergency apps installed", description: "Weather alerts, first aid guides", category: "digital", priority: "low" },
];

const categories = [
  { id: "home", name: "Home Safety", icon: Home, color: "primary" },
  { id: "kit", name: "Emergency Kit", icon: Package, color: "accent" },
  { id: "vehicle", name: "Vehicle", icon: Car, color: "success" },
  { id: "digital", name: "Digital", icon: Smartphone, color: "warning" },
];

const SafetyChecklist = () => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
      toast.success("Item unchecked");
    } else {
      newCompleted.add(itemId);
      toast.success("Great job! Item completed");
    }
    setCompletedItems(newCompleted);
  };

  const resetChecklist = () => {
    setCompletedItems(new Set());
    toast.success("Checklist reset!");
  };

  const downloadChecklist = () => {
    const checklistText = categories
      .map(category => {
        const categoryItems = checklistItems.filter(item => item.category === category.id);
        const itemsText = categoryItems
          .map(item => `☐ ${item.title} - ${item.description}`)
          .join('\n  ');
        return `${category.name.toUpperCase()}\n  ${itemsText}`;
      })
      .join('\n\n');

    const blob = new Blob([`SAFETY PREPAREDNESS CHECKLIST\n\n${checklistText}`], 
      { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'safety-checklist.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Checklist downloaded!");
  };

  const totalItems = checklistItems.length;
  const completedCount = completedItems.size;
  const progressPercentage = (completedCount / totalItems) * 100;

  const getFilteredItems = () => {
    if (!activeCategory) return checklistItems;
    return checklistItems.filter(item => item.category === activeCategory);
  };

  return (
    <section className="py-20 bg-success/5">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full mb-4">
            <CheckCircle2 className="w-5 h-5" />
            Safety Preparedness
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Emergency Preparedness Checklist
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Complete these essential safety preparations to protect yourself and your family
          </p>

          {/* Progress Overview */}
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-foreground">
                  {completedCount}/{totalItems}
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {progressPercentage.toFixed(0)}% Complete
                </p>
                {progressPercentage === 100 && (
                  <Badge className="bg-success text-success-foreground">
                    🎉 Fully Prepared!
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => setActiveCategory(null)}
            className="bg-primary hover:bg-primary-dark text-primary-foreground"
          >
            All Categories
          </Button>
          {categories.map((category) => {
            const IconComponent = category.icon;
            const categoryItems = checklistItems.filter(item => item.category === category.id);
            const categoryCompleted = categoryItems.filter(item => completedItems.has(item.id)).length;
            
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`${activeCategory === category.id ? 
                  `bg-${category.color} hover:bg-${category.color}/90 text-${category.color}-foreground` : 
                  'hover:bg-secondary'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {categoryCompleted}/{categoryItems.length}
                </Badge>
              </Button>
            );
          })}
        </div>

        {/* Checklist Items */}
        <Card className="mb-8">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>
              {activeCategory 
                ? categories.find(c => c.id === activeCategory)?.name + " Checklist"
                : "Complete Checklist"
              }
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetChecklist}>
                <RefreshCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={downloadChecklist}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {getFilteredItems().map((item) => {
              const isCompleted = completedItems.has(item.id);
              const category = categories.find(c => c.id === item.category);
              
              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-success/10 border-success/30' 
                      : 'bg-card hover:bg-secondary/30'
                  }`}
                >
                  <Checkbox
                    id={item.id}
                    checked={isCompleted}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <label
                        htmlFor={item.id}
                        className={`font-medium cursor-pointer ${
                          isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {item.title}
                      </label>
                      <Badge 
                        variant={item.priority === 'high' ? 'destructive' : 
                               item.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {item.priority} priority
                      </Badge>
                      {category && (
                        <Badge variant="outline" className="text-xs">
                          {category.name}
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${
                      isCompleted ? 'text-muted-foreground' : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Action Footer */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Stay Prepared, Stay Safe
              </h3>
              <p className="text-muted-foreground">
                Review and update this checklist regularly. Share it with family members 
                and make sure everyone knows the emergency procedures.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={downloadChecklist} className="bg-success hover:bg-success/90 text-success-foreground">
                  <Download className="w-4 h-4 mr-2" />
                  Download Checklist
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  Print Checklist
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SafetyChecklist;