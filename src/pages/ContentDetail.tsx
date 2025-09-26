"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Link2, 
  Sparkles,
  User,
  X
} from "lucide-react";
import { ContentItem } from "@/types/content";
import { useSavedContent } from "@/hooks/use-saved-content";
import { showInfo } from "@/utils/toast";
import { Link } from "react-router-dom";
import PlatformIcon from "./PlatformIcon";
import ContentPerformanceMetrics from "./ContentPerformanceMetrics";
import { formatNumber } from "@/constants/content-constants";
import PageLayout from "@/components/PageLayout";
import { ContentStructuredData } from "@/components/ContentStructuredData";

interface ContentDetailViewProps {
  content: ContentItem;
  onClose: () => void;
}

const ContentDetailView = ({ content, onClose }: ContentDetailViewProps) => {
  console.log("ContentDetailView: Component rendering");
  
  const { isSaved, toggleSaved } = useSavedContent();
  const saved = isSaved(content.id);
  
  const handleToggleSave = () => {
    toggleSaved(content);
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(content.link);
    showInfo("Content link copied to clipboard!");
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Generate full article content based on the description
  const generateFullContent = (content: any) => {
    console.log("ContentDetailView: Generating full content");
    const sections = [
      {
        title: "Introduction",
        content: content.description
      },
      {
        title: "Key Insights",
        content: `This ${content.platform} post has achieved remarkable engagement with ${formatNumber(content.engagement.likes)} likes, ${formatNumber(content.engagement.comments)} comments, and ${formatNumber(content.engagement.shares)} shares. The content resonates particularly well with audiences interested in ${content.tags?.join(', ')}.`
      },
      {
        title: "Why This Content Works",
        content: `With a performance score of ${content.performanceScore}, this content demonstrates several key success factors:\n\n• Clear, actionable value proposition\n• Platform-optimized formatting and style\n• Engaging visual elements that capture attention\n• Strategic use of relevant hashtags and keywords\n• Strong call-to-action that encourages interaction`
      },
      {
        title: "Engagement Analysis",
        content: `The engagement rate of ${content.engagement.engagementRate?.toFixed(1)}% significantly exceeds platform averages. This success can be attributed to the content's ability to provide immediate value while encouraging audience participation through comments and shares.`
      },
      {
        title: "Takeaways for Content Creators",
        content: `Content creators can learn from this example by:\n\n1. Focusing on providing genuine value to their audience\n2. Using platform-specific best practices for formatting\n3. Including clear, compelling calls-to-action\n4. Leveraging trending topics and relevant hashtags\n5. Maintaining consistency in posting and engagement`
      }
    ];
    
    return sections;
  };
  
  const articleSections = generateFullContent(content);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <PlatformIcon platform={content.platform} />
              {content.category && (
                <Badge variant="outline" className="capitalize">
                  {content.category}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleToggleSave}
                    aria-label={saved ? "Unsave content" : "Save content"}
                  >
                    {saved ? (
                      <BookmarkCheck className="h-5 w-5 text-primary" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{saved ? "Unsave content" : "Save content"}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleCopyLink}>
                    <Link2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy link</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Close</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>
          
          <div className="flex items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(content.publishedAt)}</span>
            </div>
            {content.author && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  {content.author.avatar ? (
                    <AvatarImage src={content.author.avatar} alt={content.author.name} />
                  ) : (
                    <AvatarFallback>
                      <User className="h-3 w-3" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <span>{content.author.name}</span>
              </div>
            )}
          </div>
          
          {content.imageUrl && (
            <div className="mb-8">
              <img 
                src={content.imageUrl} 
                alt={content.title} 
                className="w-full h-auto rounded-lg object-cover max-h-[400px]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none mb-8">
            {articleSections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
          
          {content.tags && content.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {content.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button asChild variant="default" className="gap-2">
              <a href={content.link} target="_blank" rel="noopener noreferrer">
                View Original <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to={`/generate?contentId=${content.id}`}>
                <Sparkles className="h-4 w-4" />
                Generate Similar
              </Link>
            </Button>
          </div>
        </div>
        
        <ContentPerformanceMetrics content={content} />
      </div>
      
      <div className="lg:col-span-1">
        {content.author && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Content Creator</h2>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                {content.author.avatar ? (
                  <AvatarImage 
                    src={content.author.avatar} 
                    alt={content.author.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                )}
              </Avatar>
              <h3 className="text-xl font-medium">{content.author.name}</h3>
              {content.author.followers && (
                <p className="text-sm text-muted-foreground mt-1">
                  {formatNumber(content.author.followers)} followers
                </p>
              )}
              <div className="mt-4 w-full">
                <Button variant="outline" className="w-full" disabled>
                  View Profile (Demo)
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Related Content</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center py-4">
              Related content recommendations would appear here in a real application.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/discover">
                Discover More Content
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: contentData } = useContentDiscoveryData();
  const [content, setContent] = useState<ContentItem | null>(null);

  useEffect(() => {
    if (id && contentData) {
      const foundContent = contentData.find(item => item.id === id);
      if (foundContent) {
        setContent(foundContent);
      } else {
        navigate('/discover');
      }
    }
  }, [id, contentData, navigate]);

  const handleClose = () => {
    navigate('/discover');
  };

  if (!content) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Add structured data for this specific content */}
      {content && <ContentStructuredData content={content} />}
      
      <ContentDetailView content={content} onClose={handleClose} />
    </PageLayout>
  );
};

export default ContentDetail;