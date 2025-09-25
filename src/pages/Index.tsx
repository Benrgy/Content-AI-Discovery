import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-foreground rounded-lg p-6">
      <div className="text-center max-w-2xl mx-auto flex-grow flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight">
          Welcome to ContentAI
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Your AI-Powered Content Discovery & Generation Platform.
          Discover viral trends and create optimized content effortlessly.
        </p>
        <Button asChild size="lg" className="px-8 py-3 text-lg">
          <Link to="/discover">Start Discovering Content</Link>
        </Button>
      </div>
      {/* MadeWithDyad component removed from here, now handled by Layout */}
    </div>
  );
};

export default Index;