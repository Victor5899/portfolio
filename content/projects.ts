import type { Project } from "@/types";

/**
 * Project case studies (SRS §7.5, Appendix A). The flagship project is marked
 * `featured: true`. Narrative fields are derived from each project's scope —
 * refine copy and add measurable metrics to `highlights` before launch.
 */
export const projects: Project[] = [
  {
    slug: "financial-news-sentiment-analytics-platform",
    title: "Financial News Sentiment Analytics Platform",
    tagline:
      "End-to-end platform that turns financial news into tradable sentiment signals.",
    description:
      "A data platform that ingests financial news, scores market sentiment with ML, and surfaces the results through an interactive analytics dashboard.",
    problem:
      "Investors and analysts drown in unstructured financial news and cannot quickly gauge market sentiment around specific tickers or sectors.",
    approach:
      "Built an ingestion and processing pipeline that collects financial news, cleans and vectorizes the text, and applies ML models to classify sentiment, exposing aggregated signals via an API and a Streamlit dashboard.",
    impact:
      "Converts a firehose of unstructured news into structured, per-entity sentiment trends that are explorable in seconds.",
    role: "Designed and built the full pipeline, models, API, and dashboard.",
    stack: [
      "Python",
      "FastAPI",
      "Scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "Snowflake",
      "Streamlit",
    ],
    featured: true,
    highlights: [
      "Automated ingestion and processing of financial news",
      "ML-based sentiment scoring per entity/ticker",
      "Interactive analytics dashboard for exploring sentiment trends",
    ],
    image: "/projects/financial-news-sentiment-analytics-platform.jpg",
    links: {},
    year: "2025",
    domain: ["Machine Learning", "Data Analytics", "Data Engineering"],
  },
  {
    slug: "customer-churn-prediction-dashboard",
    title: "Customer Churn Prediction Dashboard",
    tagline:
      "Predicts at-risk customers and visualizes churn drivers for retention teams.",
    description:
      "A machine-learning dashboard that predicts customer churn and explains the factors driving it.",
    problem:
      "Businesses lose revenue to churn without knowing which customers are at risk or why.",
    approach:
      "Trained and evaluated classification models on customer data, then wrapped predictions and feature-importance insights in an interactive dashboard.",
    impact:
      "Gives retention teams a ranked, explainable view of at-risk customers to prioritize outreach.",
    role: "Built the data preparation, models, and dashboard.",
    stack: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Streamlit"],
    featured: false,
    highlights: [
      "Churn probability scoring per customer",
      "Explainable feature-importance insights",
    ],
    image: "/projects/customer-churn-prediction-dashboard.jpg",
    links: {},
    year: "2025",
    domain: ["Machine Learning", "Data Analytics"],
  },
  {
    slug: "vendor-performance-analytics",
    title: "Vendor Performance Analytics",
    tagline:
      "Analytics on vendor data to benchmark performance and inform procurement.",
    description:
      "A data-analytics project that models and visualizes vendor performance across key operational metrics.",
    problem:
      "Procurement decisions are hard to make without a consolidated, comparable view of vendor performance.",
    approach:
      "Consolidated vendor data with SQL, engineered performance metrics, and built dashboards to benchmark and compare vendors.",
    impact:
      "Enables data-driven vendor selection and monitoring through clear, comparable performance views.",
    role: "Handled data modeling, metric design, and visualization.",
    stack: ["SQL", "PostgreSQL", "Python", "Pandas", "Tableau"],
    featured: false,
    highlights: [
      "Consolidated vendor performance metrics",
      "Benchmarking dashboards for procurement",
    ],
    image: "/projects/vendor-performance-analytics.jpg",
    links: {},
    year: "2024",
    domain: ["Data Analytics", "Data Engineering"],
  },
];
