import { ContentItem, AnalyticsData } from "@/types/content";

export const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "10 Productivity Hacks for Remote Workers in 2024",
    description: "Discover the top strategies to boost your efficiency and maintain work-life balance while working from home. Essential tips for every remote professional including time-blocking, digital workspace organization, and energy management techniques. Learn how to maximize productivity while avoiding burnout.",
    platform: "linkedin",
    category: "productivity",
    tags: ["remote work", "productivity", "work-life balance", "time management", "efficiency"],
    performanceScore: 87,
    engagement: { 
      likes: 1200, 
      comments: 85, 
      shares: 210,
      engagementRate: 4.2
    },
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://www.linkedin.com/pulse/10-productivity-hacks-remote-workers-2024-alex-morgan/",
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
    description: "Unlock the secrets to going viral on TikTok! This comprehensive guide breaks down how the algorithm works, provides actionable steps to increase your reach, and reveals the best posting times and content strategies used by top creators. Master TikTok's algorithm and grow your following.",
    platform: "tiktok",
    category: "social media",
    tags: ["tiktok", "algorithm", "viral content", "social media growth", "content strategy"],
    performanceScore: 92,
    engagement: { 
      likes: 54000, 
      comments: 1200, 
      shares: 8900, 
      views: 1200000,
      engagementRate: 5.3
    },
    imageUrl: "https://images.unsplash.com/photo-1611605698335-8b156eddfcd7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://blog.hootsuite.com/how-tiktok-algorithm-works/",
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
    description: "Stay ahead of the curve with these powerful AI tools that are transforming how marketers create, analyze, and optimize campaigns. From content generation to predictive analytics, discover the artificial intelligence tools that top marketers are using to gain competitive advantages and automate their workflows.",
    platform: "twitter",
    category: "marketing",
    tags: ["ai", "artificial intelligence", "digital marketing", "marketing tools", "automation"],
    performanceScore: 78,
    engagement: { 
      likes: 890, 
      comments: 45, 
      shares: 180,
      engagementRate: 3.8
    },
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dce98d07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://blog.hubspot.com/marketing/ai-tools-for-marketers",
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
    description: "Quick and easy meal prep recipes that will save you time and keep you energized throughout your busy week. Perfect for health-conscious individuals who want to maintain nutrition without spending hours in the kitchen. Includes 15 healthy recipes with prep times under 30 minutes.",
    platform: "instagram",
    category: "health",
    tags: ["meal prep", "healthy eating", "recipes", "nutrition", "wellness", "fitness"],
    performanceScore: 83,
    engagement: { 
      likes: 2300, 
      comments: 150, 
      shares: 300,
      engagementRate: 4.5
    },
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://www.eatingwell.com/gallery/7896454/healthy-meal-prep-ideas/",
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
    description: "A beginner-friendly explanation of Web3, blockchain, NFTs, and decentralized applications. Dive into the next generation of the internet with clear explanations of complex concepts, real-world use cases, and predictions for how Web3 technology will reshape digital interactions and create new opportunities.",
    platform: "youtube",
    category: "technology",
    tags: ["web3", "blockchain", "crypto", "cryptocurrency", "NFT", "decentralized", "technology"],
    performanceScore: 89,
    engagement: { 
      likes: 7500, 
      comments: 500, 
      shares: 1200, 
      views: 350000,
      engagementRate: 2.6
    },
    imageUrl: "https://images.unsplash.com/photo-1639322537228-fefc227777c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://www.youtube.com/watch?v=nHhAEkG1y2U",
    publishedAt: "2024-05-08T16:30:00Z",
    author: {
      name: "Tech Explained",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      followers: 420000
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
  },
  linkedin: {
    content: "🚀 After 5 years of remote work, here are the 10 productivity hacks that actually moved the needle:\n\n1️⃣ 90-minute focus blocks (game-changer!)\n2️⃣ Digital workspace organization\n3️⃣ The 2-minute rule for small tasks\n4️⃣ Time-blocking for deep work\n5️⃣ Pomodoro technique variations\n6️⃣ Environment optimization\n7️⃣ Workday shutdown ritual\n8️⃣ Communication boundaries\n9️⃣ Energy management over time management\n🔟 Regular productivity audits\n\nThe biggest impact? Hack #7 - creating a clear end to my workday. It prevented burnout and actually made me MORE productive during work hours.\n\nRemote work isn't just about flexibility - it's about intentional systems that support both performance and wellbeing.\n\nWhat's your #1 remote work productivity tip? 👇",
    hashtags: ["#RemoteWork", "#Productivity", "#WorkFromHome", "#ProfessionalDevelopment", "#WorkLifeBalance"],
    cta: "Follow for more remote work insights and career growth tips!",
    productionNotes: "Use numbered list format for easy scanning. Include relevant emojis. Post during peak LinkedIn hours (8-10 AM or 12-2 PM). Engage with comments within first hour."
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