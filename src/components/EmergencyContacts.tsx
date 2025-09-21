import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Shield, 
  Heart,
  Flame,
  AlertTriangle,
  Download
} from "lucide-react";
import { toast } from "sonner";

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  available: string;
  type: "emergency" | "support" | "medical";
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: "112",
    name: "Emergency Services",
    number: "112",
    description: "Police, Fire, Medical Emergency",
    icon: Phone,
    color: "destructive",
    available: "24/7",
    type: "emergency"
  },
  {
    id: "poison",
    name: "Poison Control",
    number: "1-800-425-1213",
    description: "Poisoning emergencies and information",
    icon: AlertTriangle,
    color: "warning",
    available: "24/7",
    type: "medical"
  },
  {
    id: "disaster",
    name: "Disaster Hotline",
    number: "+91-23716441/2/3", 
    description: "Red Cross disaster assistance",
    icon: Shield,
    color: "primary",
    available: "24/7",
    type: "support"
  },
  {
    id: "suicide",
    name: "Crisis Lifeline",
    number: "9152987821",
    description: "Suicide & Crisis prevention",
    icon: Heart,
    color: "success",
    available: "24/7",
    type: "support"
  },
  {
    id: "fire",
    name: "Non-Emergency Fire",
    number: "101",
    description: "Non-emergency fire department",
    icon: Flame,
    color: "accent",
    available: "24/7",
    type: "support"
  }
];

const quickTips = [
  "Save these numbers in your phone now",
  "Know your exact address and nearest major intersection",
  "Keep a written list in case your phone dies",
  "Program ICE (In Case of Emergency) contacts",
  "Learn basic information to give dispatcher"
];

const EmergencyContacts = () => {
  const handleCall = (number: string, name: string) => {
    if (navigator.userAgent.includes("Mobile") || navigator.userAgent.includes("Android") || navigator.userAgent.includes("iPhone")) {
      window.location.href = `tel:${number}`;
    } else {
      toast.success(`${name}: ${number}`, {
        description: "Number copied to clipboard",
        duration: 3000,
      });
      navigator.clipboard.writeText(number);
    }
  };

  const downloadContactList = () => {
    const contactText = emergencyContacts
      .map(contact => `${contact.name}: ${contact.number} - ${contact.description}`)
      .join('\n');
    
    const blob = new Blob([`EMERGENCY CONTACTS\n\n${contactText}\n\nKeep this list handy at all times!`], 
      { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emergency-contacts.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Emergency contacts downloaded!");
  };

  return (
    <section id="emergency-contacts" className="py-20 bg-destructive/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
            <PhoneCall className="w-5 h-5" />
            Emergency Response
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Emergency Contacts
          </h2>
          <p className="text-lg text-muted-foreground">
            Quick access to emergency services and support hotlines. Save these numbers and keep them handy.
          </p>
        </div>

        {/* Emergency Banner */}
        <Card className="mb-8 border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="w-8 h-8 text-destructive emergency-pulse" />
                <h3 className="text-2xl font-bold text-destructive">
                  Life-Threatening Emergency?
                </h3>
              </div>
              <p className="text-lg text-muted-foreground">
                Don't hesitate - call 911 immediately for police, fire, or medical emergencies
              </p>
              <Button
                size="lg"
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground emergency-pulse px-8 py-4 text-lg font-semibold"
                onClick={() => handleCall("911", "Emergency Services")}
              >
                <Phone className="mr-2 w-5 h-5" />
                Call 911 Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {emergencyContacts.map((contact) => {
            const IconComponent = contact.icon;
            return (
              <Card key={contact.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${contact.color}/10`}>
                      <IconComponent className={`w-6 h-6 text-${contact.color}`} />
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {contact.available}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-2xl font-bold text-foreground">{contact.number}</span>
                  </div>
                  
                  <Button
                    className={`w-full bg-${contact.color} hover:bg-${contact.color}/90 text-${contact.color}-foreground`}
                    onClick={() => handleCall(contact.number, contact.name)}
                  >
                    <PhoneCall className="mr-2 w-4 h-4" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips & Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Emergency Preparedness Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {quickTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Download & Share */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-success" />
                Save for Offline Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Download this emergency contact list to keep on your device, print it out, 
                or save it where others can easily find it.
              </p>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={downloadContactList}
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download Contact List
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Emergency Contacts - SafeSteps',
                        text: 'Important emergency contact numbers everyone should know',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Share This Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContacts;
