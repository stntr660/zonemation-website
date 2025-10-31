# Zonemation Website

A modern, responsive website built with Next.js, TypeScript, and Tailwind CSS, inspired by BCG's design system and adapted for Zonemation's brand.

## 🚀 Features

- **Modern Design**: BCG-inspired layout with Zonemation's signature green color palette (#a7d26d)
- **Dark Mode**: Full dark mode support with smooth transitions
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized with Next.js 16 and Turbopack
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **TypeScript**: Full type safety throughout the application

## 🎨 Design System

### Color Palette
- **Primary Green**: #a7d26d (Zonemation signature color)
- **Green Variants**: 50-900 scale with hover states
- **Neutral Colors**: Professional grays and beiges
- **Dark Mode**: Seamless theme switching

### Components
- **Header**: Responsive navigation with dropdown menus
- **Hero Section**: Interactive carousel with 5 featured content slides
- **Assistance Section**: Interactive dropdowns for capabilities and industries
- **Company Sections**: Location and careers sections with engaging visuals
- **Footer**: Comprehensive footer with newsletter signup and social links

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode
- **Build Tool**: Turbopack (Next.js default)

## 📦 Installation

1. **Clone and navigate to the project:**
   ```bash
   cd "/Users/mac/Documents/Zonemation/Zonemation website/zonemation-website"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3001
   ```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and theme variables
│   ├── layout.tsx       # Root layout with theme provider
│   └── page.tsx         # Homepage component
├── components/
│   ├── header.tsx       # Navigation header
│   ├── hero-section.tsx # Hero carousel
│   ├── assistance-section.tsx # Dropdown assistance section
│   ├── company-sections.tsx   # Location and careers
│   ├── footer.tsx       # Site footer
│   └── theme-toggle.tsx # Dark mode toggle
└── lib/
    └── theme-provider.tsx # Theme context provider
```

## 🎯 Key Features Implemented

### 1. Header Component
- Responsive navigation with mobile menu
- Dropdown menus for Industries, Capabilities, Insights, About
- Search functionality
- Dark mode toggle
- Contact CTA button

### 2. Hero Section
- Interactive 5-slide carousel
- Auto-play with manual controls
- Featured content with categories and metadata
- Smooth transitions and hover effects
- Navigation dots and arrow controls

### 3. Assistance Section
- Interactive capability and industry dropdowns
- BCG-inspired background patterns
- Responsive layout with abstract design elements
- Form validation and CTA integration

### 4. Company Sections
- Location showcase (Africa-themed)
- Careers section with dual CTAs
- Additional info cards (Alumni, Impact, Innovation)
- Engaging visuals with placeholder graphics

### 5. Footer
- Newsletter subscription
- Comprehensive link organization
- Social media integration
- Contact information
- Legal links and copyright

## 🌙 Dark Mode

Complete dark mode implementation with:
- System preference detection
- Manual toggle control
- Smooth transitions
- All components adapted
- Logo switching (light/dark variants)

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Wide**: 1440px+

## 🎨 Customization

### Colors
Modify the color palette in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    400: '#a7d26d', // Main Zonemation green
    // ... other variants
  }
}
```

### Fonts
Update font families in `tailwind.config.js` and `globals.css`.

### Animations
Custom animations defined in `globals.css` and Tailwind config.

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Lint code:
```bash
npm run lint
```

## 📊 Performance

Optimizations included:
- Next.js Image optimization
- Font preloading
- Component lazy loading
- CSS-in-JS with Tailwind
- Turbopack for fast builds

## 🎯 BCG Design Inspiration

Adapted BCG design patterns:
- Professional color system
- Typography hierarchy
- Component architecture
- Interaction patterns
- Layout principles
- Content organization

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS setup
- `.eslintrc.json` - ESLint rules

## 📝 Notes

- Logo files are automatically switched based on theme
- All images are optimized for web performance
- Animations respect user preferences (reduced motion)
- Full keyboard navigation support
- Screen reader compatible

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for all new components
3. Ensure mobile responsiveness
4. Test dark mode functionality
5. Maintain accessibility standards

## 📄 License

© 2025 Zonemation. All rights reserved.