import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm SafeBot, your AI disaster preparedness assistant. Ask me about emergency procedures, safety tips, or anything related to disaster management!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What should I do during an earthquake?",
    "How to create an emergency kit?",
    "First aid for heart attack",
    "Tsunami evacuation steps",
    "Fire safety at home",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (question: string): string => {
    const responses: Record<string, string> = {
      "earthquake": "During an earthquake: 🔸 Drop to hands and knees 🔸 Take cover under sturdy furniture 🔸 Hold on until shaking stops 🔸 Stay away from windows and heavy objects 🔸 If outdoors, move away from buildings",
      "emergency kit": "Essential emergency kit items: 🔸 Water (1 gallon per person per day) 🔸 Non-perishable food (3-day supply) 🔸 Flashlight & batteries 🔸 First aid kit 🔸 Medications 🔸 Important documents 🔸 Cash 🔸 Radio",
      "heart attack": "Heart attack first aid: 🔸 Call 911 immediately 🔸 Have person sit down and stay calm 🔸 Loosen tight clothing 🔸 Give aspirin if not allergic 🔸 Begin CPR if person becomes unconscious 🔸 Don't leave them alone",
      "tsunami": "Tsunami safety: 🔸 Move to high ground immediately 🔸 Go at least 2 miles inland or 100 feet above sea level 🔸 Don't wait for official warnings 🔸 Stay away from beaches and waterways 🔸 Listen to emergency broadcasts",
      "fire safety": "Fire safety tips: 🔸 Install smoke detectors 🔸 Create evacuation plan 🔸 Keep fire extinguisher accessible 🔸 Don't overload electrical outlets 🔸 Check heating equipment annually 🔸 Practice fire drills",
    };

    const lowerQuestion = question.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    return "I'm here to help with disaster preparedness questions! Try asking about specific emergencies like earthquakes, fires, medical emergencies, or emergency planning. You can also ask about creating emergency kits or evacuation procedures.";
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);

      // Text-to-speech for bot responses
      if (speechEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast("Listening... Speak now!");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error("Speech recognition error. Please try again.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast.error("Speech recognition not supported in this browser.");
    }
  };

  return (
    <section id="ai-chatbot" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Bot className="w-5 h-5" />
            AI-Powered Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ask SafeBot Anything
          </h2>
          <p className="text-lg text-muted-foreground">
            Get instant answers about disaster preparedness, emergency procedures, and safety tips
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="h-96 flex flex-col">
          <CardHeader className="flex-shrink-0 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                SafeBot Assistant
                <Badge variant="secondary" className="ml-2">Online</Badge>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSpeechEnabled(!speechEnabled)}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground ml-4'
                      : 'bg-secondary text-secondary-foreground mr-4'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-lg mr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse animation-delay-200"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          
          <div className="flex-shrink-0 border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about disaster preparedness..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={startListening}
                disabled={isListening}
                className={isListening ? 'animate-pulse' : ''}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button 
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || isLoading}
                className="bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Questions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
            Quick Questions to Get Started
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(question)}
                className="hover:bg-primary/10 hover:text-primary hover:border-primary/30"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChatbot;