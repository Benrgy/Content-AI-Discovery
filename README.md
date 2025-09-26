# ContentAI - AI-Powered Content Discovery & Generation Platform

A modern React application that helps content creators discover viral trends and generate platform-optimized content using AI.

## 🚀 Features

### Content Discovery
- **Trending Content Discovery**: Find high-performing content across multiple platforms
- **Advanced Filtering**: Filter by platform, category, performance score, and engagement metrics
- **Search Functionality**: Search content by title, description, tags, and author
- **Performance Analytics**: View detailed engagement metrics and performance scores

### Content Generation
- **AI-Powered Generation**: Create platform-specific content using advanced AI
- **Multi-Platform Support**: Generate content for LinkedIn, TikTok, Twitter, Instagram, YouTube, and blogs
- **Tone & Style Control**: Customize content tone (professional, casual, humorous, etc.)
- **Hashtag & CTA Generation**: Automatically include relevant hashtags and calls-to-action
- **Image Generation**: Create accompanying images for your content

### Analytics Dashboard
- **Performance Metrics**: Track total engagement, average performance scores
- **Platform Distribution**: Visual breakdown of content performance by platform
- **Category Analysis**: Compare performance across different content categories
- **Engagement Trends**: Monitor engagement patterns over time
- **Top Content Analysis**: Identify patterns in viral content

### User Experience
- **Responsive Design**: Fully responsive interface for desktop and mobile
- **Dark Mode Support**: Automatic theme switching with system preference
- **Saved Content**: Bookmark and organize your favorite content
- **Generation History**: Keep track of your AI-generated content
- **Real-time Notifications**: Get notified about important events

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for data fetching and caching
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Theme**: next-themes for dark mode support
- **Build Tool**: Vite with SWC for fast development

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd contentai

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage

### Discovering Content
1. Navigate to the **Discover** page
2. Use the search bar to find specific content
3. Apply filters to narrow down results
4. Click on any content card to view detailed analytics
5. Save interesting content for later reference

### Generating Content
1. Go to the **Generate** page
2. Enter your content prompt
3. Select target platform, tone, and length
4. Choose whether to include hashtags and CTAs
5. Click "Generate Content" to create platform-optimized content
6. Optionally generate accompanying images

### Analyzing Performance
1. Visit the **Analytics** dashboard
2. View overall performance metrics
3. Explore platform and category breakdowns
4. Monitor engagement trends over time
5. Identify top-performing content patterns

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your-api-url
VITE_API_KEY=your-api-key
```

### Content Platforms Supported
- LinkedIn
- TikTok
- Twitter
- Instagram
- YouTube
- Blog Posts

### Content Categories
- Productivity
- Social Media
- Marketing
- Technology
- Health & Wellness
- Content Creation
- Personal Branding
- Psychology

## 📱 Mobile Experience

The application is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Mobile-optimized navigation
- Responsive grid layouts
- Swipe gestures for content cards

## 🎨 Customization

### Themes
The app supports light and dark themes with automatic system preference detection.

### Styling
Built with Tailwind CSS for easy customization. All components use consistent design tokens.

### Components
Uses shadcn/ui components for a polished, accessible interface.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Made with ❤️ using React, TypeScript, and AI