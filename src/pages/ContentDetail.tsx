"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
// ... other imports
import { ContentStructuredData } from "@/components/ContentStructuredData";

const ContentDetail = () => {
  // ... existing code
  
  return (
    <PageLayout>
      {/* Add structured data for this specific content */}
      {content && <ContentStructuredData content={content} />}
      
      {/* Rest of the component */}
    </PageLayout>
  );
};

export default ContentDetail;