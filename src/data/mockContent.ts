import { ContentItem, AnalyticsData } from "@/types/content";

export const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "10 Productivity Hacks for Remote Workers in 2024",
    description: "Discover the top strategies to boost your efficiency and maintain work-life balance while working from home. Essential tips for every remote professional.",
    platform: "linkedin",
    category: "productivity",
    tags: ["remote work", "productivity", "work-life balance"],
    performanceScore: 87,
    engagement: { 
      likes: 1200, 
      comments: 85, 
      shares: 210,
      engagementRate: 4.2
    },
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/1",
    publishedAt: "2024-05-15T10:30:00Z",
    author: {
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 15400
    }
  },
  {
    id: "2",
    title: "The Ultimate Guide to Mastering TikTok Algorithms",
    description: "Unlock the secrets to going viral on TikTok! This guide breaks down how the algorithm works and provides actionable steps to increase your reach.",
    platform: "tiktok",
    category: "social media",
    tags: ["tiktok", "algorithm", "viral content"],
    performanceScore: 92,
    engagement: { 
      likes: 54000, 
      comments: 1200, 
      shares: 8900, 
      views: 1200000,
      engagementRate: 5.3
    },
    imageUrl: "https://images.unsplash.com/photo-1611605698335-8b156eddfcd7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/2",
    publishedAt: "2024-05-18T14:20:00Z",
    author: {
      name: "Ryan Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 245000
    }
  },
  {
    id: "3",
    title: "5 AI Tools Revolutionizing Digital Marketing",
    description: "Stay ahead of the curve with these powerful AI tools that are transforming how marketers create, analyze, and optimize campaigns.",
    platform: "twitter",
    category: "marketing",
    tags: ["ai", "digital marketing", "tools"],
    performanceScore: 78,
    engagement: { 
      likes: 890, 
      comments: 45, 
      shares: 180,
      engagementRate: 3.8
    },
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dce98d07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/3",
    publishedAt: "2024-05-10T09:15:00Z",
    author: {
      name: "Sophia Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 32100
    }
  },
  {
    id: "4",
    title: "Healthy Meal Prep Ideas for Busy Professionals",
    description: "Quick and easy meal prep recipes that will save you time and keep you energized throughout your busy week. Perfect for health-conscious individuals.",
    platform: "instagram",
    category: "health",
    tags: ["meal prep", "healthy eating", "recipes"],
    performanceScore: 83,
    engagement: { 
      likes: 2300, 
      comments: 150, 
      shares: 300,
      engagementRate: 4.5
    },
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/4",
    publishedAt: "2024-05-12T11:45:00Z",
    author: {
      name: "Jamie Oliver",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 89000
    }
  },
  {
    id: "5",
    title: "Understanding Web3: The Future of the Internet",
    description: "A beginner-friendly explanation of Web3, blockchain, NFTs, and decentralized applications. Dive into the next generation of the internet.",
    platform: "youtube",
    category: "technology",
    tags: ["web3", "blockchain", "crypto"],
    performanceScore: 89,
    engagement: { 
      likes: 7500, 
      comments: 500, 
      shares: 1200, 
      views: 350000,
      engagementRate: 2.6
    },
    imageUrl: "https://images.unsplash.com/photo-1639322537228-fefc227777c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/5",
    publishedAt: "2024-05-08T16:30:00Z",
    author: {
      name: "Tech Explained",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 420000
    }
  },
  {
    id: "6",
    title: "Top 7 SEO Trends You Can't Ignore in 2024",
    description: "Stay competitive in search rankings with these crucial SEO trends. Learn how to adapt your strategy for maximum visibility.",
    platform: "blog",
    category: "marketing",
    tags: ["seo", "digital marketing", "trends"],
    performanceScore: 76,
    engagement: { 
      likes: 600, 
      comments: 30, 
      shares: 100,
      engagementRate: 3.2
    },
    imageUrl: "https://images.unsplash.com/photo-1557426272-0a6479ab1188?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/6",
    publishedAt: "2024-05-05T13:20:00Z",
    author: {
      name: "SEO Mastery",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 28500
    }
  },
  {
    id: "7",
    title: "How to Create Viral Short-Form Video Content",
    description: "Master the art of creating engaging short-form videos that capture attention and drive engagement across platforms.",
    platform: "tiktok",
    category: "content creation",
    tags: ["short-form video", "viral content", "content strategy"],
    performanceScore: 94,
    engagement: { 
      likes: 78000, 
      comments: 2100, 
      shares: 12000, 
      views: 1800000,
      engagementRate: 5.1
    },
    imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/7",
    publishedAt: "2024-05-20T10:00:00Z",
    author: {
      name: "Creative Visuals",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 560000
    }
  },
  {
    id: "8",
    title: "The Psychology of Viral Content: Why We Share",
    description: "Explore the psychological triggers that make content shareable and how to incorporate these elements into your content strategy.",
    platform: "blog",
    category: "psychology",
    tags: ["psychology", "viral content", "social sharing"],
    performanceScore: 85,
    engagement: { 
      likes: 950, 
      comments: 78, 
      shares: 320,
      engagementRate: 4.8
    },
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/8",
    publishedAt: "2024-05-14T08:45:00Z",
    author: {
      name: "Mind Matters",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 41200
    }
  },
  {
    id: "9",
    title: "Building a Personal Brand on LinkedIn: A Step-by-Step Guide",
    description: "Learn how to establish yourself as a thought leader and build a powerful personal brand on LinkedIn with these proven strategies.",
    platform: "linkedin",
    category: "personal branding",
    tags: ["linkedin", "personal brand", "professional development"],
    performanceScore: 81,
    engagement: { 
      likes: 1450, 
      comments: 120, 
      shares: 280,
      engagementRate: 3.9
    },
    imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/9",
    publishedAt: "2024-05-16T15:10:00Z",
    author: {
      name: "Career Growth",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 67800
    }
  },
  {
    id: "10",
    title: "Instagram Reels vs. TikTok: Which Platform Drives More Engagement?",
    description: "A data-driven comparison of Instagram Reels and TikTok, analyzing which platform offers better engagement opportunities for creators.",
    platform: "instagram",
    category: "social media",
    tags: ["instagram reels", "tiktok", "platform comparison"],
    performanceScore: 88,
    engagement: { 
      likes: 3200, 
      comments: 245, 
      shares: 520,
      engagementRate: 4.7
    },
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/10",
    publishedAt: "2024-05-19T12:30:00Z",
    author: {
      name: "Social Media Insights",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 124000
    }
  },
  {
    id: "11",
    title: "How to Create Engaging YouTube Thumbnails That Drive Clicks",
    description: "Master the art of creating eye-catching thumbnails that increase your click-through rate and help your videos stand out.",
    platform: "youtube",
    category: "content creation",
    tags: ["youtube", "thumbnails", "ctr optimization"],
    performanceScore: 84,
    engagement: { 
      likes: 5600, 
      comments: 320, 
      shares: 890, 
      views: 280000,
      engagementRate: 2.4
    },
    imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/11",
    publishedAt: "2024-05-11T14:15:00Z",
    author: {
      name: "Video Creators Hub",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 215000
    }
  },
  {
    id: "12",
    title: "The Future of Content Creation: AI Tools Every Creator Should Know",
    description: "Discover the cutting-edge AI tools that are transforming content creation and how to leverage them to stay ahead of the competition.",
    platform: "twitter",
    category: "technology",
    tags: ["ai tools", "content creation", "future tech"],
    performanceScore: 90,
    engagement: { 
      likes: 1280, 
      comments: 95, 
      shares: 410,
      engagementRate: 4.9
    },
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/12",
    publishedAt: "2024-05-17T09:40:00Z",
    author: {
      name: "Future Tech Today",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 78500
    }
  }
];

export const mockAnalyticsData: AnalyticsData = {
  totalEngagement: 156890,
  averagePerformanceScore: 85.6,
  platformDistribution: {
    linkedin: 25,
    tiktok: 20,
    twitter: 15,
    instagram: 18,
    youtube: 12,
    blog: 10
  },
  topPerformingContent: mockContent.sort((a, b) => (b.performanceScore || 0) - (a.performanceScore || 0)).slice(0, 5),
  engagementOverTime: [
    { date: "2024-05-01", value: 12500 },
    { date: "2024-05-02", value: 13200 },
    { date: "2024-05-03", value: 14100 },
    { date: "2024-05-04", value: 13800 },
    { date: "2024-05-05", value: 15200 },
    { date: "2024-05-06", value: 16500 },
    { date: "2024-05-07", value: 15900 },
    { date: "2024-05-08", value: 16200 },
    { date: "2024-05-09", value: 17500 },
    { date: "2024-05-10", value: 18200 },
    { date: "2024-05-11", value: 17800 },
    { date: "2024-05-12", value: 19100 },
    { date: "2024-05-13", value: 20500 },
    { date: "2024-05-14", value: 21200 },
    { date: "2024-05-15", value: 22500 },
    { date: "2024-05-16", value: 23100 },
    { date: "2024-05-17", value: 24500 },
    { date: "2024-05-18", value: 25800 },
    { date: "2024-05-19", value: 27200 },
    { date: "2024-05-20", value: 28500 }
  ],
  categoryPerformance: [
    { category: "social media", performanceScore: 90, count: 3 },
    { category: "content creation", performanceScore: 89, count: 2 },
    { category: "technology", performanceScore: 87, count: 2 },
    { category: "productivity", performanceScore: 87, count: 1 },
    { category: "marketing", performanceScore: 77, count: 2 },
    { category: "health", performanceScore: 83, count: 1 },
    { category: "psychology", performanceScore: 85, count: 1 },
    { category: "personal branding", performanceScore: 81, count: 1 }
  ]
};

export const mockGeneratedContent = {
  tiktok: {
    content: "🔥 Remote work productivity hack #3 will change your life! I've been working from home for 5 years and these tricks doubled my output while working LESS hours. Save this for later! #remotework #productivityhacks #worklifebalance",
    hashtags: ["#remotework", "#productivityhacks", "#worklifebalance", "#wfh", "#timemanagement"],
    cta: "Follow for more productivity tips that actually work!",
    productionNotes: "Film in portrait mode (9:16). Keep video under 30 seconds. Use quick cuts between each hack. Add trending sound."
  },
  instagram: {
    content: "Swipe to discover 10 game-changing productivity hacks for remote workers! 💻✨\n\nThese strategies helped me transform my home office into a productivity powerhouse without burning out.\n\nMy favorite? Hack #7 - I've saved 5+ hours every week since implementing it!\n\nWhich one will you try first? Comment below! 👇",
    hashtags: ["#RemoteWorkTips", "#ProductivityHacks", "#WorkFromHome", "#DigitalNomad", "#WorkLifeBalance", "#HomeOffice"],
    cta: "Save this post for your next workday! ✅",
    productionNotes: "Create carousel post with 10 slides. Use consistent branding colors. Include one hack per slide with simple illustration."
  },
  youtube: {
    content: "10 PRODUCTIVITY HACKS FOR REMOTE WORKERS (THAT ACTUALLY WORK)\n\nIn this video, I'm sharing the top productivity strategies I've developed after 5 years of remote work. These aren't just theory - they've helped me double my output while actually working fewer hours.\n\nTIMESTAMPS:\n00:00 Introduction\n01:23 Hack #1: The 90-minute focus block method\n03:45 Hack #2: Digital workspace organization\n05:30 Hack #3: The 2-minute rule for small tasks\n...\n\nThe most game-changing hack for me was #7 - the workday shutdown ritual. It's completely transformed my work-life balance and prevented burnout.\n\nWhich hack are you most excited to try? Let me know in the comments!",
    hashtags: ["#RemoteWork", "#ProductivityTips", "#WorkFromHome", "#TimeManagement", "#WorkLifeBalance"],
    cta: "Subscribe for more productivity and remote work strategies every week!",
    productionNotes: "Film in landscape (16:9). Aim for 12-15 minutes. Include b-roll of each technique in action. Add chapters to video."
  },
  blog: {
    content: "# 10 Productivity Hacks for Remote Workers in 2024\n\n## Introduction\n\nThe remote work revolution has transformed how we approach our professional lives, offering unprecedented flexibility but also presenting unique challenges. After five years of working remotely and coaching distributed teams, I've identified ten productivity strategies that consistently deliver results.\n\n## Hack #1: The 90-Minute Focus Block Method\n\nResearch shows that our brains naturally operate in cycles of roughly 90 minutes. By aligning your work schedule with these ultradian rhythms, you can maximize focus and creative output.\n\n**How to implement it:**\n- Schedule 90-minute blocks of uninterrupted work time\n- Turn off all notifications during these periods\n- Focus on a single high-priority task\n- Follow each block with a 15-20 minute break\n\nI've found this approach increases my output by approximately 40% compared to working in shorter, frequently interrupted segments.\n\n...\n\n## Conclusion\n\nRemote work offers tremendous benefits, but requires intentional productivity strategies. By implementing these ten hacks, you can create a sustainable work-from-home routine that enhances both your professional output and personal wellbeing.\n\nRemember that productivity isn't about working more hours—it's about making your working hours more effective. Start by implementing just one or two of these strategies, then gradually incorporate others as they become habitual.",
    hashtags: ["remote work", "productivity", "work from home", "time management", "digital workspace", "work-life balance"],
    cta: "Join our newsletter for weekly productivity insights delivered to your inbox.",
    productionNotes: "Format with clear headings and subheadings. Include 2-3 relevant images. Add internal links to related content. Optimize for SEO with target keyword 'remote work productivity hacks'."
  }
};

export const mockGeneratedImages = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prompt: "A productive home office setup with laptop, notebook, and coffee cup",
    alt: "Organized home office workspace with productivity tools"
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prompt: "Person working productively on laptop with digital productivity tools",
    alt: "Remote worker using productivity apps on laptop"
  },
  {
    id: "img3",
    url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prompt: "Person planning their day with notebook and digital calendar",
    alt: "Remote worker organizing tasks in planner and digital tools"
  }
];