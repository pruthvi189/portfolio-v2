export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github: string;
  liveDemo?: string;
  featured: boolean;
  status?: string;
}

export const projects: Project[] = [
  {
    slug: "football-iq",
    title: "Football IQ",
    subtitle: "Learn Football Through AI",
    description:
      "A Retrieval-Augmented Generation (RAG) application that answers football questions by retrieving relevant information from a curated knowledge base using semantic search and large language models.",
    techStack: [
      "Python", "FastAPI", "LangChain", "ChromaDB",
      "Sentence Transformers", "Groq API", "Llama 3.3 70B",
      "Next.js", "Tailwind CSS", "shadcn/ui",
    ],
    highlights: [
      "SSE streaming for token-by-token response delivery",
      "Ingests new documents without code changes",
      "Low-relevance fallback prevents hallucination",
      "15 hand-written Q&A pairs for retrieval quality evaluation",
    ],
    github: "https://github.com/pruthvi189/football-iq",
    featured: true,
  },
  {
    slug: "custom-retrieval-engine",
    title: "Custom Retrieval Engine",
    subtitle: "Vector Search Built From Scratch",
    description:
      "Built a vector retrieval engine from scratch with HNSW, KD Tree, and brute force search, backed by a custom document store and grounded RAG, with live performance benchmarking.",
    techStack: [
      "Node.js", "Vercel Serverless", "HNSW", "KD-Tree",
      "RAG", "PostgreSQL", "pgvector", "PCA",
    ],
    highlights: [
      "Custom HNSW, KD-Tree, and brute-force indexes written from scratch",
      "Live side-by-side benchmark timing all three algorithms",
      "Grounded RAG — the LLM answers strictly from retrieved chunks",
      "Agentic and Wikipedia document ingestion without API keys",
      "In-browser PCA visualizer for the vector space",
    ],
    github: "https://github.com/pruthvi189/Custom-Retrieval-Engine",
    liveDemo: "https://customrag.vercel.app",
    featured: false,
  },
  {
    slug: "stock-market-analysis",
    title: "Stock Market Forecasting Dashboard",
    subtitle: "ML-Powered Financial Prediction",
    description:
      "A Flask web application for analyzing historical stock data and forecasting future prices by comparing ARIMA, Prophet, and LSTM time-series models.",
    techStack: [
      "Flask", "TensorFlow/Keras", "statsmodels",
      "scikit-learn", "pandas", "yfinance", "SQLite",
    ],
    highlights: [
      "LSTM achieved lowest error: RMSE 2.89, MAE 2.23",
      "LSTM outperformed ARIMA by 8% and Prophet by 30% on RMSE",
      "Analyzed accuracy vs. cost trade-off across models",
      "Preprocessing pipeline with ADF stationarity testing",
    ],
    github: "https://github.com/pruthvi189/Stock_Market_Analysis",
    featured: false,
  },
];

export const moreProjects: Project[] = [
  {
    slug: "medify",
    title: "Medify - AI Medical Assistant",
    subtitle: "Top 25/500 Finalist, CVMU Hackathon",
    status: "Team Project",
    description:
      "A cross-platform React Native healthcare application featuring OCR for handwritten prescriptions, medical report analysis, and accessible health information for patients.",
    techStack: [
      "React Native", "Flask", "MongoDB", "OpenCV",
      "IBM Watson", "Python", "Expo", "Tailwind CSS",
    ],
    highlights: [
      "Top 25 out of 500 teams at CVMU Hackathon",
      "90%+ OCR accuracy on handwritten prescriptions",
      "200K+ medicine database for drug info and alternatives",
      "Doctor-sharing feature for medical report analysis",
    ],
    github: "https://github.com/pruthvi189/Medify",
    featured: false,
  },
  {
    slug: "ml-ai-tutor",
    title: "ML Tutor",
    subtitle: "Turn Any Repo or Topic Into a Course",
    status: "Currently Building",
    description:
      "AI powered tutor that transforms any GitHub repository or topic into a personalized learning experience with structured lessons, quizzes, flashcards, and an interactive chat assistant.",
    techStack: [
      "Python", "Gemini API", "Next.js", "React",
      "Drizzle ORM", "PostgreSQL", "JWT", "Tailwind CSS",
    ],
    highlights: [
      "Generates full structured courses from any repo or topic",
      "Interactive lessons with chat, flashcards, and warm-ups",
      "Quiz generation with automated evaluation",
      "OAuth (Google / GitHub) with per-user progress tracking",
    ],
    github: "https://github.com/pruthvi189/ml-ai-tutor",
    liveDemo: "https://web-opal-six-16.vercel.app/login",
    featured: false,
  },
];
