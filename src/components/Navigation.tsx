import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Bot, Phone, BookOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Learn", href: "#disaster-categories", icon: BookOpen },
    { name: "AI Helper", href: "#ai-chatbot", icon: Bot },
    { name: "Emergency", href: "#emergency-contacts", icon: Phone },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SafeSteps</h1>
              <p className="text-xs text-muted-foreground leading-none">Disaster Education</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                >
                  <IconComponent className="w-4 h-4" />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => scrollToSection("#ai-chatbot")}
            >
              Ask AI
            </Button>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary-dark text-primary-foreground"
              onClick={() => scrollToSection("#emergency-contacts")}
            >
              Emergency
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">SafeSteps</h1>
                  <p className="text-sm text-muted-foreground">Disaster Education</p>
                </div>
              </div>

              <div className="space-y-4">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors duration-200"
                    >
                      <IconComponent className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.name === "Learn" && "Explore disaster categories"}
                          {item.name === "AI Helper" && "Get instant answers"}
                          {item.name === "Emergency" && "Quick access to help"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 space-y-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                  onClick={() => scrollToSection("#emergency-contacts")}
                >
                  Emergency Contacts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => scrollToSection("#ai-chatbot")}
                >
                  Ask AI Helper
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;