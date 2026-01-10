# GamePro - Professional Gaming Platform

A modern, responsive gaming platform built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Professional Dark Mode Design**: Classic gaming aesthetic with premium feel
- **Header Navigation**: Logo, menu items (Milestone, Free Spin, Prize Chat), Login/Signup buttons
- **Milestone System**: Track progress with visual progress bars and unlock exclusive rewards
- **Free Spin Wheel**: Interactive spinning wheel with 8 reward options and various rarities
- **Prize Chat**: Real-time chat interface with available prizes and coin management
- **Fully Responsive**: Mobile-first design that works on all screen sizes
- **Dark Mode Toggle**: Switch between dark and light themes
- **shadcn/ui Components**: Professional UI components for forms and dialogs
- **Lucide Icons**: Beautiful, consistent iconography throughout

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Header.tsx       # Main navigation header
│   ├── LoginForm.tsx    # Login form component
│   ├── SignupForm.tsx   # Signup form component
│   └── ProgressBar.tsx  # Reusable progress bar
├── pages/
│   ├── Home.tsx         # Home/dashboard page
│   ├── Milestone.tsx    # Milestone tracking page
│   ├── FreeSpin.tsx     # Free spin wheel page
│   └── PrizeChat.tsx    # Prize chat interface
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # React entry point
└── index.css            # Tailwind CSS & design tokens
```

## Getting Started

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

The app will be available at \`http://localhost:5173\`

### Build

```bash
yarn build
```

## Design System

- **Primary Color**: Gold (#D4AF37 / HSL 45 93% 47%)
- **Secondary Color**: Purple (#7209B7 / HSL 260 80% 50%)
- **Accent Color**: Red (#FF006E / HSL 0 84% 60%)
- **Background**: Dark Brown (#0F1803 / HSL 10 15% 3%)
- **Borders**: Subtle light brown (HSL 10 15% 20%)

## Features Breakdown

### Header Component
- Responsive navigation with mobile hamburger menu
- Dark mode toggle
- Login/Signup modal dialogs
- Active page indicators

### Milestone Page
- Overall progress tracking
- 6 milestone cards with progress bars
- Reward display
- Completion status tracking

### Free Spin Page
- Interactive spinning wheel with 8 segments
- Realistic spin animation
- Coin reward system
- Rarity-based rewards (common, rare, epic, legendary)
- Spin history

### Prize Chat Page
- Real-time chat interface
- Available prizes with different values
- Coin management
- Claim functionality
- Responsive chat and prize layout

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS 3.4**: Utility-first CSS
- **shadcn/ui**: High-quality UI components
- **Lucide React**: Icon library
- **React Router**: Navigation
- **Vite**: Fast build tool
- **Radix UI**: Headless component library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

GamePro Team
