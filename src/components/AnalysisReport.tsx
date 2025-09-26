"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FileText, 
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { analyzeApplication, generateAnalysisReport, type AppAnalysisResult } from "@/utils/appAnalysis";

const AnalysisReport = () => {
  const [analysis, setAnalysis] = useState<AppAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runAnalysis = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeApplication();
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = () => {
    if (!analysis) return;
    
    const report = generateAnalysisReport(analysis);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contentai-analysis-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  if (!analysis) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading analysis...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const overallStatus = analysis.accessibility.score >= 80 && 
                       analysis.functionality.routing && 
                       analysis.seo.metaTags;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Application Analysis Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant={overallStatus ? "default" : "destructive"}>
          {overallStatus ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <AlertTitle>
            {overallStatus ? 'Application Status: Healthy' : 'Application Needs Attention'}
          </AlertTitle>
          <AlertDescription>
            {overallStatus 
              ? 'All critical systems are functioning properly'
              : 'Some areas require improvement'
            }
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-500">{analysis.performance.loadTime.toFixed(0)}ms</div>
            <div className="text-sm text-muted-foreground">Load Time</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-green-500">{analysis.accessibility.score}</div>
            <div className="text-sm text-muted-foreground">Accessibility Score</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-purple-500">{analysis.performance.domSize}</div>
            <div className="text-sm text-muted-foreground">DOM Elements</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Detailed Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Functionality</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Routing</span>
                  <Badge variant={analysis.functionality.routing ? "default" : "destructive"}>
                    {analysis.functionality.routing ? '✅' : '❌'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>State Management</span>
                  <Badge variant={analysis.functionality.stateManagement ? "default" : "destructive"}>
                    {analysis.functionality.stateManagement ? '✅' : '❌'}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">SEO</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Meta Tags</span>
                  <Badge variant={analysis.seo.metaTags ? "default" : "destructive"}>
                    {analysis.seo.metaTags ? '✅' : '❌'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Structured Data</span>
                  <Badge variant={analysis.seo.structuredData ? "default" : "destructive"}>
                    {analysis.seo.structuredData ? '✅' : '❌'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {analysis.accessibility.issues.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-amber-600">Accessibility Issues</h4>
            <ul className="list-disc list-inside text-sm text-amber-600">
              {analysis.accessibility.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.recommendations.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {analysis.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={runAnalysis} disabled={isLoading} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {isLoading ? 'Analyzing...' : 'Refresh Analysis'}
          </Button>
          <Button variant="outline" onClick={downloadReport} className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisReport;