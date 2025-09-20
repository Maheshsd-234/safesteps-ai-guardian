import Hero from "../components/Hero";
import DisasterCategories from "../components/DisasterCategories";
import AIChatbot from "../components/AIChatbot";
import InteractiveQuiz from "../components/InteractiveQuiz";
import SafetyChecklist from "../components/SafetyChecklist";
import EmergencyContacts from "../components/EmergencyContacts";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <DisasterCategories />
      <AIChatbot />
      <InteractiveQuiz />
      <SafetyChecklist />
      <EmergencyContacts />
      <Footer />
    </div>
  );
};

export default Index;
