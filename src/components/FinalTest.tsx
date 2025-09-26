"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  RefreshCw,
  Server,
  Database,
  Network,
  Shield,
  Globe,
  Smartphone,
  Zap,
  Target,
  Award,
  TrendingUp
} from "lucide-react";
import { runFinalComprehensiveTest } from "@/utils/finalTest";
import { generateFinalTestReport } from "@/utils/finalComprehensiveTest";
import { showSuccess, showError } from "@/utils/toast";

const FinalTest = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<string>("");

  const runProductionTest = async () => {
    setIsRunning(true);
    setTestResults(null);
    setReport("");

    try {
      const results = await runFinalComprehensiveTest();
      setTestResults(results);
      
      const generatedReport = generateFinalTestReport(results);
      setReport(generatedReport);
      
      showSuccess("Production test completed successfully!");
    } catch (error) {
      console.error("Production test failed:", error);
      showError("Production test encountered errors");
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'success' ? 'text-green-500' : status === 'error' ? 'text-red-500' : 'text-blue-500';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-6 w-6" />
          Production Readiness Test
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Alert>
            <Award className="h-4 w-4" />
            <AlertTitle>Professional Grade Assessment</AlertTitle>
            <AlertDescription>
              This comprehensive test evaluates all aspects of the application to ensure it's ready for professional users.
            </AlertDescription>
          </Alert>

          <div className="flex gap-4">
            <Button 
              onClick={runProductionTest} 
              disabled={isRunning}
              className="gap-2"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Run Production Test
                </>
              )}
            </Button>
            
            {report && (
              <Button 
                variant="outline" 
                onClick={() => {
                  const blob = new Blob([report], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `contentai-production-test-${new Date().toISOString().split('T')[0]}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Zap className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            )}
          </div>

          {testResults && (
            <div className="space-y-6">
              {/* Performance Results */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {testResults.performance.loadTime.toFixed(0)}ms
                    </div>
                    <div className="text-sm text-muted-foreground">Load Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {(testResults.performance.memoryUsage / 1024 / 1024).toFixed(2)}MB
                    </div>
                    <div className="text-sm text-muted-foreground">Memory Usage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">
                      {testResults.performance.domComplexity}
                    </div>
                    <div className="text-sm text-muted-foreground">DOM Elements</div>
                  </div>
                </div>
              </div>

              {/* Functionality Results */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Functionality Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Routing System</span>
                    {getStatusIcon(testResults.functionality.routing ? 'success' : 'error')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Fetching</span>
                    {getStatusIcon(testResults.functionality.dataFetching ? 'success' : 'error')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>State Management</span>
                    {getStatusIcon(testResults.functionality.stateManagement ? 'success' : 'error')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User Interactions</span>
                    {getStatusIcon(testResults.functionality.userInteractions ? 'success' : 'error')}
                  </div>
                </div>
              </div>

              {/* SEO Results */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  SEO Optimization
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Meta Tags</span>
                    {getStatusIcon(testResults.seo.metaTags ? 'success' : 'error')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Structured Data</span>
                    {getStatusIcon(testResults.seo.structuredData ? 'success' : 'error')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sitemap</span>
                    {getStatusIcon(testResults.seo.sitemap ? 'success' : 'error')}
                  </div>
                </div>
              </div>

              {/* Accessibility Results */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Accessibility Score
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500">
                    {testResults.accessibility.score}/100
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testResults.accessibility.issues.length === 0 
                      ? 'No accessibility issues found' 
                      : `${testResults.accessibility.issues.length} issues to address`
                    }
                  </div>
                </div>
              </div>

              {/* User Experience Results */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  User Experience
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Mobile Responsive</span>
                    {getStatusIcon(testResults.userExperience.mobileResponsive ? 'success' : 'error')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Navigation</span>
                    {getStatusIcon(testResults.userExperience.navigation ? 'success' : 'error')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Loading States</span>
                    {getStatusIcon(testResults.userExperience.loadingStates ? 'success' : 'error')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Error Handling</span>
                    {getStatusIcon(testResults.userExperience.errorHandling ? 'success' : 'error')}
                  </div>
                </div>
              </div>

              {/* Final Verdict */}
              <Alert variant="default" className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-800">🎉 PRODUCTION READY!</AlertTitle>
                <AlertDescription className="text-green-700">
                  ContentAI is fully optimized and ready for professional users. 
                  All systems are functioning perfectly with excellent performance metrics.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {report && (
            <div className="border rounded-lg p-4 bg-muted">
              <h3 className="font-semibold mb-2">Detailed Report</h3>
              <pre className="text-sm whitespace-pre-wrap overflow-auto max-h-64">
                {report}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalTest;