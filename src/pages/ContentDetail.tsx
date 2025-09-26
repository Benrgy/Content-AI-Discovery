"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Link2, 
  Sparkles,
  User,
  Heart,
  MessageSquare,
  Share2,
  Eye
} from "lucide-react";
import { useSavedContent } from "@/hooks/use-saved-content";
import { showInfo } from "@/utils/toast";
import { Link } from "react-router-dom";
import PlatformIcon from "@/components/PlatformIcon";
import { formatNumber, getPerformanceColor } from "@/constants/content-constants";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageLayout from "@/components/PageLayout";

const ContentDetail = () => {
  console.log("ContentDetail: Component rendering");
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: contentData, isLoading } = useContentDiscoveryData();
  const { isSaved, toggleSaved } = useSavedContent();
  
  console.log("ContentDetail: Params:", { id });
  console.log("ContentDetail: Content data:", contentData);
  
  const content = contentData?.find(item => item.id === id);
  const saved = content ? isSaved(content.id) : false;
  
  console.log("ContentDetail: Found content:", content);
  
  if (isLoading) {
    console.log("ContentDetail: Loading state");
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" text="Loading content..." />
        </div>
      </PageLayout>
    );
  }
  
  if (!content) {
    console.log("ContentDetail: Content not found");
    return (
      <PageLayout
        title="Content Not Found"
        description="The content you're looking for doesn't exist or has been removed."
      >
        <div className="text-center">
          <Button onClick={() => navigate('/discover')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discovery
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  const handleToggleSave = () => {
    console.log("ContentDetail: Toggle save called");
    toggleSaved(content);
  };
  
  const handleCopyLink = () => {
    console.log("ContentDetail: Copy link called");
    navigator.clipboard.writeText(window.location.href);
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
    console.log("ContentDetail: Generating full content");
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
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/discover')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discovery
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PlatformIcon platform={content.platform} />
              {content.category && (
                <Badge variant="outline" className="capitalize">
                  {content.category}
                </Badge>
              )}
              {content.performanceScore && (
                <Badge className={getPerformanceColor(content.performanceScore)}>
                  Score: {content.performanceScore}
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
        </div>
        
        {/* Featured Image */}
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
        
        {/* Engagement Stats */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-rose-500 mb-1">
                  <Heart className="h-5 w-5" />
                  {formatNumber(content.engagement.likes)}
                </div>
                <p className="text-sm text-muted-foreground">Likes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-blue-500 mb-1">
                  <MessageSquare className="h-5 w-5" />
                  {formatNumber(content.engagement.comments)}
                </div>
                <p className="text-sm text-muted-foreground">Comments</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-500 mb-1">
                  <Share2 className="h-5 w-5" />
                  {formatNumber(content.engagement.shares)}
                </div>
                <p className="text-sm text-muted-foreground">Shares</p>
              </div>
              {content.engagement.views && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-purple-500 mb-1">
                    <Eye className="h-5 w-5" />
                    {formatNumber(content.engagement.views)}
                  </div>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
              )}
            </div>
            {content.engagement.engagementRate && (
              <div className="mt-4 text-center">
                <Badge variant="outline" className="text-sm">
                  Engagement Rate: {content.engagement.engagementRate.toFixed(1)}%
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Article Content */}
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
        
        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {content.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
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
        
        {/* Author Info */}
        {content.author && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About the Author</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {content.author.avatar ? (
                    <AvatarImage src={content.author.avatar} alt={content.author.name} />
                  ) : (
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{content.author.name}</h3>
                  {content.author.followers && (
                    <p className="text-muted-foreground">
                      {formatNumber(content.author.followers)} followers
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default ContentDetail;