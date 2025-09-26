"use client";

import PageLayout from "@/components/PageLayout";
import DiagnosticTest from "@/components/DiagnosticTest";
import AnalysisReport from "@/components/AnalysisReport";

const Diagnostics = () => {
  return (
    <PageLayout
      title="Application Diagnostics"
      description="Comprehensive testing and monitoring of all application functionality"
    >
      <div className="space-y-8">
        <AnalysisReport />
        <DiagnosticTest />
      </div>
    </PageLayout>
  );
};

export default Diagnostics;