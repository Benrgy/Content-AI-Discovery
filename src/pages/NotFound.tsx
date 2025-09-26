import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import PageLayout from "@/components/PageLayout"; // Import PageLayout

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <PageLayout
      className="items-center justify-center rounded-lg p-6"
      title="404"
      description="Oops! Page not found"
    >
      <div className="text-center">
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
    </PageLayout>
  );
};

export default NotFound;