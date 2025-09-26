import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto flex-grow">
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
  );
};

export default Index;