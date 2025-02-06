# React Flow Assignment

## Overview

This project is a React-based application utilizing `react-flow` for interactive flowchart-like UIs. The project is built with React Flow, Vite, TypeScript, and state management using Redux Toolkit.

## Features

- Interactive graph visualization with `react-flow`
- Customizable layout and nodes
- Undo/Redo functionality
- UI components such as buttons and sliders
- State management using Redux toolkit slices

## Project Structure

```
react-flow-assignment
├── public (Static assets)
├── src (Application source code)
│   ├── assets (Images, icons, etc.)
│   ├── components (Reusable UI components)
│   ├── lib (Utility functions)
│   ├── store (State management using Redux)
│   ├── types (TypeScript type definitions)
│   ├── utils (Helper functions)
│   ├── App.tsx (Main application entry)
│   ├── main.tsx (React app bootstrap file)
│   └── index.css (Global styles)
├── package.json (Project dependencies and scripts)
├── tsconfig.json (TypeScript configuration)
├── vite.config.ts (Vite configuration)
└── README.md (Project documentation)
```

## Installation

### Prerequisites

Ensure you have Node.js installed on your machine.

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/react-flow-assignment.git
   ```
2. Navigate into the project directory:
   ```sh
   cd react-flow-assignment
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- Open `http://localhost:5173/` in your browser to see the app.
- Customize the graph using the provided UI controls.
- Modify the components inside `src/components/` to customize further.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint the codebase

## Technologies Used

- React.js
- TypeScript
- React Flow
- Redux Toolkit
- Vite
