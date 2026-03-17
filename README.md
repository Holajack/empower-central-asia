# Businesses Beyond Borders

Empowering entrepreneurs in Central Asia through financial literacy, business training, and community development.

## About This Project

This is the official website for Businesses Beyond Borders, a Volusia County-based nonprofit organization providing financial literacy training, microloans, and business mentorship in Kazakhstan, Kyrgyzstan, and Tajikistan.

**Live Site**: https://businessesbeyondborders.com

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd empower-central-asia

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run blog-scheduler` - Run blog scheduler (see blog management)
- `npm run blog-scheduler:test` - Test blog scheduler
- `npm run blog-scheduler:help` - Get help with blog scheduler

## Project Structure

```
empower-central-asia/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   └── ...         # Custom components
│   ├── pages/          # Page components
│   │   ├── programs/   # Program-specific pages
│   │   ├── success-stories/ # Case studies
│   │   └── volunteer-opportunities/ # Volunteer pages
│   ├── data/           # Static data files
│   ├── lib/            # Utility functions
│   └── main.tsx        # Application entry point
├── index.html
├── vite.config.ts
└── package.json
```

## Key Features

- **Multi-page website** with React Router
- **Responsive design** with Tailwind CSS
- **Blog system** with markdown support
- **SEO optimized** with meta tags and structured data
- **Form integrations** with GoHighLevel
- **Donation widget** with DonorBox
- **Chat widget** powered by GoHighLevel

## Adding Content

### Adding Blog Posts

Blog posts are managed using markdown files. To add a new post:

1. Create a new `.md` file in the appropriate location
2. Add frontmatter with title, date, author, excerpt, image, and tags
3. Use the blog scheduler tool to publish: `npm run blog-scheduler`

See `BLOG_SCHEDULER_README.md` for detailed instructions.

### Updating Programs

Program content is located in `src/pages/programs/`. Edit the respective `.tsx` file to update content.

### Managing Success Stories

Success stories are in `src/data/successStories.ts` and individual case study pages are in `src/pages/success-stories/`.

## Deployment

This project is configured for deployment on Netlify.

### Deploy to Netlify

1. Push your changes to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy!

Netlify will automatically handle React Router redirects using the `netlify.toml` configuration.

### Environment Variables

If you need environment variables, create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

## Integrations

### GoHighLevel
- Chat widget for visitor engagement
- Form submissions for volunteers and partners
- SMS opt-in functionality

### DonorBox
- Donation widget embedded on Get Involved page

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For questions or issues, please contact the Businesses Beyond Borders team.

## License

Copyright © 2025 Businesses Beyond Borders. All rights reserved.
