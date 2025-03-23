# AI-Powered-Fake-News-Detection
This AI-driven system detects and classifies fake news using NLP and machine learning. It analyzes content, checks credibility, and verifies facts in real time. Key features include source validation, sentiment analysis, and misinformation alerts, helping users identify and prevent the spread of false news.



# TruthLens - AI-powered Fake News Detection

![TruthLens Logo](public/placeholder.svg)

TruthLens is a comprehensive web application designed to help users navigate the complex information landscape with confidence through advanced AI-powered fake news detection and analysis.

## Features

- **Article Analysis:** Analyze any news article by providing its URL
- **Chat Interface:** Ask questions about the credibility of news or claims
- **Credibility Scoring:** Get detailed breakdowns of content trustworthiness
- **Source Verification:** Evaluate the credibility of publications and authors

## Tech Stack

### Frontend
- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui for UI components
- React Query for data fetching and state management

### Backend
- Node.js with Express
- RESTful API architecture
- Mock data generation for demonstration purposes

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd truthlens
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Set up the backend:
   ```
   cd backend
   npm install
   npm run dev
   ```

5. The application will be available at:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## API Endpoints

### Article Analysis
- `POST /analyze-article` - Analyze an article by URL
- `GET /recent-analyses` - Get recent article analyses
- News API

### Chat
- `POST /chat` - Send a message for fact-checking
- `GET /chat-history` - Get chat history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
