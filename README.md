# Clue Scroll Workspace

A modern monorepo setup with React 19, Vite, Tailwind CSS 4, and Socket.io built with Nx.

## Tech Stack

### Frontend (Web App)
- React 19 (Release Candidate)
- Vite 5
- Tailwind CSS 4 (Alpha)
- TypeScript
- Socket.io Client
- React Router

### Backend (Server)
- Express
- Socket.io
- TypeScript
- Node.js

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Running the Applications

Start both the server and web app:
```bash
# Start the Socket.io server (runs on port 3000)
npx nx run server:serve

# In another terminal, start the React app (runs on port 4200)
npx nx run web:serve
```

Or run both in parallel:
```bash
npx nx run-many --target=serve --projects=server,web
```

### Project Structure
```
clue-scroll-workspace/
├── web/                 # React frontend application
│   ├── src/
│   │   ├── app/        # Application components
│   │   ├── assets/     # Static assets
│   │   ├── main.tsx    # Entry point
│   │   └── styles.css  # Global styles with Tailwind
│   └── vite.config.ts  # Vite configuration
├── server/             # Express + Socket.io backend
│   └── src/
│       └── main.ts     # Server entry point
└── nx.json             # Nx workspace configuration
```

## Features

- **Real-time Communication**: Socket.io integration for WebSocket communication
- **Modern React**: Using React 19 RC with latest features
- **Fast Development**: Vite for lightning-fast HMR
- **Utility-First CSS**: Tailwind CSS 4 for rapid UI development
- **Type Safety**: Full TypeScript support across the monorepo
- **Monorepo Management**: Nx for efficient project organization

## Available Routes

- `/` - Home page with project overview
- `/socket-demo` - Interactive Socket.io demonstration

## Socket.io Events

The server listens for:
- `connection` - New client connection
- `message` - Chat message from client
- `disconnect` - Client disconnection

The server emits:
- `message` - Broadcasts messages to all connected clients

## Development Commands

```bash
# Build all projects
npx nx run-many --target=build --all

# Build specific project
npx nx build web
npx nx build server

# Run linting
npx nx lint web
npx nx lint server

# View project graph
npx nx graph
```

## Notes

- The web app runs on `http://localhost:4200`
- The server runs on `http://localhost:3000`
- CORS is configured to allow communication between the two
- Tailwind CSS 4 is using the new `@import 'tailwindcss'` syntax

## Nx Workspace

This workspace was generated using Nx. Learn more about Nx:
- [Nx Documentation](https://nx.dev)
- [Nx Plugins](https://nx.dev/concepts/nx-plugins)
- [Nx Console](https://nx.dev/getting-started/editor-setup)