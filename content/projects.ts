import type { Project } from "@/types";

/**
 * Project case studies (SRS §7.5, Appendix A). The portfolio showcases exactly
 * three projects, led by the flagship (`featured: true`). Every field — including
 * the optional case-study detail fields consumed by `/projects/[slug]` — lives
 * here so the UI never hardcodes project information (DATA-1). Optional fields
 * degrade gracefully when absent (DATA-6); links are owner-supplied and render
 * only when present (FR-PROJ-6).
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
    objectives: [
      "Aggregate financial news from multiple sources into a single, queryable store.",
      "Quantify market sentiment per entity and ticker with explainable ML models.",
      "Expose sentiment trends through a fast API and an interactive dashboard.",
    ],
    architecture:
      "A staged pipeline moves data from raw ingestion to serving: collectors pull news into a raw store, a processing layer cleans and vectorizes the text, ML models score sentiment, and aggregated results land in PostgreSQL and Snowflake. A FastAPI service reads the curated tables and powers a Streamlit dashboard for exploration.",
    features: [
      "Per-ticker and per-sector sentiment aggregation over time",
      "Configurable time windows for trend comparison",
      "REST API endpoints for programmatic access to sentiment signals",
      "Interactive dashboard with drill-down into individual articles",
    ],
    implementation: [
      "Text cleaning and TF-IDF vectorization pipeline built with scikit-learn.",
      "Sentiment classifier benchmarked across logistic regression and XGBoost.",
      "Batch aggregation jobs materialize per-entity trends for fast reads.",
      "FastAPI serves cached, pre-aggregated results to keep dashboard latency low.",
    ],
    challenges: [
      "Normalizing noisy, inconsistently formatted news text across sources.",
      "Mapping mentions to the correct ticker/entity to avoid mis-attribution.",
      "Keeping dashboard queries responsive over a growing history of articles.",
    ],
    lessonsLearned: [
      "Investing early in a clean data contract simplifies every downstream stage.",
      "Pre-aggregation beats query-time computation for interactive dashboards.",
      "Explainability matters as much as accuracy when signals inform decisions.",
    ],
    futureImprovements: [
      "Add transformer-based sentiment models for finer nuance.",
      "Stream ingestion for near-real-time sentiment updates.",
      "Backtest sentiment signals against historical price movements.",
    ],
    screenshots: [
      {
        src: "/projects/financial-news-sentiment-analytics-platform-dashboard.jpg",
        alt: "Sentiment analytics dashboard showing per-ticker trends",
        caption: "Dashboard: per-ticker sentiment trends over time.",
      },
      {
        src: "/projects/financial-news-sentiment-analytics-platform-article.jpg",
        alt: "Article drill-down view with scored sentiment",
        caption: "Article drill-down with model-scored sentiment.",
      },
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
    objectives: [
      "Predict the likelihood of churn for each customer.",
      "Explain which factors drive an individual customer's risk.",
      "Give retention teams a prioritized, actionable view.",
    ],
    architecture:
      "A preprocessing pipeline engineers features from raw customer records, a trained classifier produces churn probabilities, and a Streamlit app loads the model to serve ranked predictions with per-feature explanations.",
    features: [
      "Ranked list of at-risk customers by churn probability",
      "Per-customer feature-importance breakdown",
      "Filterable segments to focus outreach",
    ],
    implementation: [
      "Feature engineering and encoding of categorical customer attributes.",
      "Model comparison between logistic regression and gradient-boosted trees.",
      "Feature-importance surfaced to make each prediction explainable.",
    ],
    challenges: [
      "Handling class imbalance between churned and retained customers.",
      "Translating model outputs into decisions non-technical teams can act on.",
    ],
    lessonsLearned: [
      "A slightly less accurate but explainable model is often more useful.",
      "Threshold selection should follow the business cost of each error type.",
    ],
    futureImprovements: [
      "Add SHAP values for richer local explanations.",
      "Integrate live data so scores refresh automatically.",
    ],
    screenshots: [
      {
        src: "/projects/customer-churn-prediction-dashboard-overview.jpg",
        alt: "Churn dashboard ranking at-risk customers",
        caption: "Ranked view of customers by churn probability.",
      },
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
    objectives: [
      "Consolidate fragmented vendor data into one analytical model.",
      "Define comparable performance metrics across vendors.",
      "Enable procurement to benchmark and monitor vendors visually.",
    ],
    architecture:
      "SQL transformations consolidate raw vendor records in PostgreSQL into a clean analytical model; Python and pandas derive performance metrics, which feed Tableau dashboards for benchmarking and monitoring.",
    features: [
      "Consolidated vendor performance model",
      "Side-by-side benchmarking across vendors",
      "Trend monitoring of key operational metrics",
    ],
    implementation: [
      "SQL views to unify and clean disparate vendor tables.",
      "Metric definitions engineered in pandas for consistency.",
      "Tableau dashboards designed for comparison and drill-down.",
    ],
    challenges: [
      "Reconciling inconsistent vendor identifiers across source systems.",
      "Choosing metrics that are fair to compare across vendor types.",
    ],
    lessonsLearned: [
      "Consistent metric definitions are essential for fair benchmarking.",
      "Clear visual hierarchy makes analytics genuinely decision-ready.",
    ],
    futureImprovements: [
      "Automate the data refresh into the analytical model.",
      "Add alerting when a vendor's metrics degrade.",
    ],
    screenshots: [
      {
        src: "/projects/vendor-performance-analytics-benchmark.jpg",
        alt: "Vendor benchmarking dashboard",
        caption: "Benchmarking dashboard comparing vendors.",
      },
    ],
    image: "/projects/vendor-performance-analytics.jpg",
    links: {},
    year: "2024",
    domain: ["Data Analytics", "Data Engineering"],
  },
];
