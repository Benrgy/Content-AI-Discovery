"use client";

export interface AppAnalysisResult {
  timestamp: Date;
  performance: {
    loadTime: number;
    memoryUsage: number;
    domSize: number;
  };
  functionality: {
    apiStatus: boolean;
    routing: boolean;
    stateManagement: boolean;
    errorHandling: boolean;
  };
  seo: {
    metaTags: boolean;
    structuredData: boolean;
    sitemap: boolean;
  };
  accessibility: {
    score: number;
    issues: string[];
  };
  recommendations: string[];
}

export const analyzeApplication = async (): Promise<AppAnalysisResult> => {
  const result: AppAnalysisResult = {
    timestamp: new Date(),
    performance: {
      loadTime: performance.now(),
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
      domSize: document.getElementsByTagName('*').length
    },
    functionality: {
      apiStatus: false,
      routing: false,
      stateManagement: false,
      errorHandling: false
    },
    seo: {
      metaTags: false,
      structuredData: false,
      sitemap: false
    },
    accessibility: {
      score: 0,
      issues: []
    },
    recommendations: []
  };

  try {
    // Test functionality
    result.functionality.routing = window.location.pathname !== '';
    result.functionality.stateManagement = typeof localStorage !== 'undefined';
    
    // Test SEO
    result.seo.metaTags = !!document.querySelector('meta[name="description"]');
    result.seo.structuredData = !!document.querySelector('script[type="application/ld+json"]');
    
    // Test accessibility
    const imagesWithoutAlt = Array.from(document.querySelectorAll('img')).filter(img => !img.alt);
    if (imagesWithoutAlt.length > 0) {
      result.accessibility.issues.push(`Found ${imagesWithoutAlt.length} images without alt text`);
    }
    
    result.accessibility.score = Math.max(0, 100 - (result.accessibility.issues.length * 10));

    // Generate recommendations
    if (result.performance.domSize > 1000) {
      result.recommendations.push('Consider optimizing DOM size for better performance');
    }
    
    if (!result.seo.metaTags) {
      result.recommendations.push('Add missing meta tags for better SEO');
    }

  } catch (error) {
    console.error('Application analysis failed:', error);
  }

  return result;
};

export const generateAnalysisReport = (result: AppAnalysisResult): string => {
  return `
ContentAI Application Analysis Report
====================================
Timestamp: ${result.timestamp.toISOString()}

Performance Metrics:
- Load Time: ${result.performance.loadTime.toFixed(2)}ms
- Memory Usage: ${(result.performance.memoryUsage / 1024 / 1024).toFixed(2)}MB
- DOM Size: ${result.performance.domSize} elements

Functionality Status:
- API: ${result.functionality.apiStatus ? '✅' : '❌'}
- Routing: ${result.functionality.routing ? '✅' : '❌'}
- State Management: ${result.functionality.stateManagement ? '✅' : '❌'}
- Error Handling: ${result.functionality.errorHandling ? '✅' : '❌'}

SEO Status:
- Meta Tags: ${result.seo.metaTags ? '✅' : '❌'}
- Structured Data: ${result.seo.structuredData ? '✅' : '❌'}
- Sitemap: ${result.seo.sitemap ? '✅' : '❌'}

Accessibility:
- Score: ${result.accessibility.score}/100
- Issues: ${result.accessibility.issues.length > 0 ? result.accessibility.issues.join(', ') : 'None'}

Recommendations:
${result.recommendations.length > 0 ? result.recommendations.map(r => `- ${r}`).join('\n') : 'No critical issues found'}
  `.trim();
};