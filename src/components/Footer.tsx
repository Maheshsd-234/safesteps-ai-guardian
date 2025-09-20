import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Heart, 
  Github, 
  Twitter, 
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const emergencyNumbers = [
    { name: "Emergency Services", number: "911" },
    { name: "Poison Control", number: "1-800-222-1222" },
    { name: "Crisis Lifeline", number: "988" },
  ];

  const quickLinks = [
    { name: "Natural Disasters", href: "#disaster-categories" },
    { name: "AI Assistant", href: "#ai-chatbot" },
    { name: "Emergency Contacts", href: "#emergency-contacts" },
    { name: "Safety Checklist", href: "#safety-checklist" },
  ];

  const resources = [
    { name: "Red Cross", url: "https://www.redcross.org" },
    { name: "FEMA", url: "https://www.fema.gov" },
    { name: "CDC Emergency", url: "https://emergency.cdc.gov" },
    { name: "Ready.gov", url: "https://www.ready.gov" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Emergency Banner */}
      <div className="bg-destructive text-destructive-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Emergency? Call 911</span>
            </div>
            <div className="text-sm opacity-90">
              For life-threatening emergencies, don't hesitate to call immediately
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">SafeSteps</h3>
                <p className="text-sm text-background/70">Disaster Education</p>
              </div>
            </div>
            
            <p className="text-background/80 text-sm leading-relaxed">
              Empowering students with life-saving disaster preparedness knowledge 
              through interactive AI-powered education and real-world scenarios.
            </p>

            <div className="flex gap-3">
              <Button size="sm" variant="outline" className="border-background/30 text-background hover:bg-background/10">
                <Github className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-background/30 text-background hover:bg-background/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-background/30 text-background hover:bg-background/10">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-background">Quick Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/70 hover:text-background text-sm transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Numbers */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-background">Emergency Numbers</h4>
            <ul className="space-y-3">
              {emergencyNumbers.map((contact, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-background/70 text-sm">{contact.name}</span>
                  <a 
                    href={`tel:${contact.number}`}
                    className="text-accent hover:text-accent-light font-semibold text-sm transition-colors duration-200"
                  >
                    {contact.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-background">Official Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 hover:text-background text-sm transition-colors duration-200 flex items-center gap-1"
                  >
                    {resource.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <Card className="mt-12 bg-background/5 border-background/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-background">50K+</div>
                <div className="text-background/70 text-sm">Students Trained</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-background">26+</div>
                <div className="text-background/70 text-sm">Disaster Types Covered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-background">98%</div>
                <div className="text-background/70 text-sm">Knowledge Retention</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-background">24/7</div>
                <div className="text-background/70 text-sm">AI Support Available</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/70">
            <div className="flex items-center gap-4">
              <span>© {currentYear} SafeSteps Education Platform</span>
              <span>•</span>
              <span>Built with ❤️ for student safety</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="hover:text-background transition-colors duration-200">
                Privacy Policy
              </button>
              <span>•</span>
              <button className="hover:text-background transition-colors duration-200">
                Terms of Service
              </button>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Global Disaster Education</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Notice */}
      <div className="bg-background/10 py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-background/70">
            This platform is designed to be accessible to all users. For accessibility concerns or emergency assistance, 
            contact your local emergency services immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;