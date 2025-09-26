import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Import Button
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col items-center justify-center rounded-lg p-6 flex-grow">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Oops! Page not found</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild>
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go back to the homepage</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default NotFound;