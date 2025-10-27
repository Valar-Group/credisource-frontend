# Credisource Frontend

AI content verification platform - Know what's real.

## 🚀 Features

- **Multi-Modal Verification**: Images, videos, text, and news articles
- **Real-time Results**: Animated score displays with detailed breakdowns
- **Responsive Design**: Works perfectly on desktop and mobile
- **Brand-Matched**: Uses Credisource brand colors (Navy #1a2332, Pink #e4154b)
- **Social Media Support**: TikTok, Twitter, Instagram, YouTube, and more

## 🎨 Design

Matches your pitch deck style:
- Clean, minimalist interface
- Navy and pink brand colors
- Animated score reveals
- Partner logo ticker
- Professional yet approachable

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Axios** - API calls to Railway backend

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Visit http://localhost:3000

## 🌐 Environment Variables

Create a `.env.local` file (optional - API endpoint is hardcoded for now):

```bash
NEXT_PUBLIC_API_URL=https://credisource-production.up.railway.app
```

## 🚢 Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit - Credisource frontend"
git branch -M main
git remote add origin https://github.com/Valar-Group/credisource-frontend.git
git push -u origin main
```

2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js - just click "Deploy"
6. Done! Your site will be live in ~2 minutes

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow prompts and deploy!

## 📁 Project Structure

```
credisource-frontend/
├── app/
│   ├── globals.css          # Global styles + brand colors
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main home page
├── components/
│   ├── About.tsx             # How it works section
│   ├── Hero.tsx              # Hero section with messaging
│   ├── Logo.tsx              # Credisource logo component
│   ├── PartnerTicker.tsx     # Social media logos ticker
│   ├── ResultDisplay.tsx     # Animated score display
│   └── VerifyInterface.tsx   # Upload/URL/text input
└── public/                   # Static assets
```

## 🎯 Key Components

### VerifyInterface
- Tabbed interface for image/video/text/news
- URL input or file upload
- Handles API communication with Railway backend
- Polls for job completion

### ResultDisplay
- Animated score counter (0-100)
- Color-coded results (green/yellow/red)
- Gradient progress bar
- Evidence breakdown from multiple detectors

### PartnerTicker
- Infinite scroll animation
- Social media platform logos
- Grayscale with hover effects

## 🔗 API Integration

Frontend connects to your Railway backend:
- Base URL: `https://credisource-production.up.railway.app`
- Creates verification jobs
- Polls for results every 2 seconds
- Displays results with animations

## 🎨 Brand Colors

```css
--navy: #1a2332
--brand-pink: #e4154b
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly buttons and inputs
- Optimized for all screen sizes

## ✨ Animations

- Score counter animation
- Progress bar fill
- Loading diamond pulse
- Partner ticker scroll
- Smooth transitions

## 🔧 Customization for Designer

Your designer can easily customize:

1. **Colors**: Edit `app/globals.css` CSS variables
2. **Typography**: Change font in `app/layout.tsx`
3. **Spacing**: Adjust Tailwind classes in components
4. **Animations**: Modify animation durations in CSS
5. **Layout**: Rearrange sections in `app/page.tsx`

## 🚀 Next Steps

1. ✅ Frontend built and working
2. ⏳ Deploy to Vercel
3. ⏳ Designer enhances visuals tomorrow
4. ⏳ Add fake news detection to backend
5. ⏳ Test thoroughly
6. ⏳ Launch!

## 📞 Support

Backend API: https://credisource-production.up.railway.app/docs
GitHub: https://github.com/Valar-Group/credisource

---

Built with ❤️ for Credisource
