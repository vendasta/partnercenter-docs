# Vendasta Partner Center Documentation

This repository contains the source code for the [Vendasta Partner Center Documentation](https://docs.vendasta.com), built with [Docusaurus](https://docusaurus.io/).

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/vendasta/partnercenter-docs.git
```

### 2. Install Dependencies
The Docusaurus project is located in the `docusaurus` subdirectory. You must navigate there first.

```bash
cd partnercenter-docs/docusaurus
npm install
```

### 3. Run Locally
Start the local development server. This will open a browser window at `http://localhost:3000`.

```bash
npm run start
```
Most changes are reflected live without having to restart the server.

## 🛠 Build & Deployment

### Build
Generate static content into the `build` directory.
```bash
npm run build
```

### Deploy
To deploy the documentation website:

```bash
# Ensure you are in the docusaurus directory
cd docusaurus

# Deploy with your GitHub username
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using SSH for Git authentication:
```bash
USE_SSH=true GIT_USER=<Your GitHub username> npm run deploy
```

## 📚 Documentation Guides

*   **[Contributing Guide](docs/CONTRIBUTING.md)**: For content writers. Learn about voice, tone, formatting, and how to add new pages.
*   **[Architecture Guide](docs/ARCHITECTURE.md)**: For maintainers. Learn about technical conventions like redirects, categories, and JSON-LD.

