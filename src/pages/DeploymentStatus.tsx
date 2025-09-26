"use client";

import PageLayout from "@/components/PageLayout";
import DeploymentCheck from "@/components/DeploymentCheck";

const DeploymentStatus = () => {
  return (
    <PageLayout
      title="Deployment Status"
      description="Check if your app is ready for GitHub Pages and Netlify deployment"
    >
      <DeploymentCheck />
    </PageLayout>
  );
};

export default DeploymentStatus;