# Gospel Amplifiers TV 🎬✨

An anointed Christian movie streaming platform.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation & Local Development

```bash
# Clone repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The compiled static output will be located in the `dist/` directory.

---

## 🌐 Deploying to GitHub Pages

This repository is pre-configured for the GitHub ecosystem to avoid blank/white screen issues:

1. **Relative Base Path**: Configured with `base: './'` in `vite.config.ts` so asset paths resolve properly regardless of your repository name or subpath.
2. **Automated Deployment**: A GitHub Actions workflow is included at `.github/workflows/deploy.yml`.

### Enable GitHub Pages in your Repository:
1. Go to your GitHub repository on [github.com](https://github.com).
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push any commit or go to the **Actions** tab and trigger the **Deploy to GitHub Pages** workflow.
5. Your site will be live at `https://<username>.github.io/<repository-name>/`!
