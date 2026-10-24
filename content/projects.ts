import type { Project } from "@/types";

/**
 * Project case studies (SRS §7.5, Appendix A). The portfolio showcases exactly
 * four projects, in this array order, led by the flagship (`featured: true`).
 * Homepage cards, detail routes, the timeline, and the sitemap all read this
 * list. Optional fields degrade gracefully when absent (DATA-6). Repository
 * links are the public GitHub remotes; live and demo links stay unset because
 * none of these projects has a verified public deployment (FR-PROJ-6).
 *
 * Vendor Performance dates are intentionally still `year: "2024"`. The project
 * description says August–September 2025 and the résumé says June–July 2025.
 * Set `period` once one of those ranges is confirmed.
 */
export const projects: Project[] = [
  {
    slug: "financial-news-sentiment-analytics-platform",
    title:
      "Real-Time Financial News Analytics & Stock Movement Prediction Platform",
    tagline:
      "Historical news backfill, FinBERT sentiment, and live BUY/HOLD/SELL inference on one PostgreSQL pipeline.",
    description:
      "An end-to-end pipeline that backfills historical financial news from GDELT, ingests live news from Finnhub, scores each article with FinBERT, and predicts BUY, HOLD, or SELL with XGBoost. News, sentiment, prices, engineered features, and predictions are stored in PostgreSQL. Streamlit is the interface over that pipeline, not a standalone static dashboard.",
    problem:
      "Financial news and price history sit in different feeds. A notebook or a static dashboard cannot backfill the archive, score new articles, and store a repeatable BUY/HOLD/SELL prediction with the same features used in training.",
    approach:
      "Built one pipeline for both the historical backfill and live inference. GDELT supplies the archive and Finnhub supplies live articles, normalized into the same schema. FinBERT labels each article positive, neutral, or negative. Forty-one hybrid features combine those sentiment aggregates with technical indicators computed from stored OHLCV prices. XGBoost classifies the 5-day direction as BUY, HOLD, or SELL, and the live path writes the class and its three class probabilities to PostgreSQL.",
    impact:
      "Historical news can be backfilled, a new article can be scored and featurized with the training feature set, and each BUY/HOLD/SELL prediction is stored with its class probabilities. No trading return is claimed.",
    role: "Designed and built the ingestion, feature, training, storage, and live-inference pipeline.",
    stack: [
      "Python",
      "XGBoost",
      "FinBERT",
      "PostgreSQL",
      "SQLAlchemy",
      "Pandas",
      "Scikit-learn",
      "Streamlit",
      "Finnhub API",
      "GDELT API",
    ],
    featured: true,
    highlights: [
      "GDELT historical backfill and Finnhub live ingestion share one article schema",
      "FinBERT sentiment on each article: positive, neutral, or negative",
      "41 hybrid features, including RSI, MACD, EMA, SMA, Bollinger Bands, ATR, rolling sentiment, and price momentum",
      "Live inference stores the BUY/HOLD/SELL class and its class probabilities",
    ],
    objectives: [
      "Ingest historical financial news from GDELT and live financial news from Finnhub.",
      "Score articles with FinBERT and keep the sentiment results in PostgreSQL.",
      "Engineer the same 41 sentiment and technical features for training and for live inference.",
      "Predict BUY, HOLD, or SELL with XGBoost and persist each prediction.",
    ],
    architecture:
      "Historical OHLCV prices are loaded from Yahoo Finance and stored with the news. The serving path is: GDELT backfill or Finnhub live fetch → shared article schema → FinBERT sentiment → SQLAlchemy writes to PostgreSQL (articles, sentiment, prices) → 41-feature engineering → XGBoost BUY/HOLD/SELL prediction with class probabilities → append-only prediction storage. The live command reuses the training feature code instead of a second implementation. Streamlit reads those stored results and can trigger the same inference path.",
    features: [
      "Multi-source news ingestion, with GDELT for the archive and Finnhub for the live feed",
      "Transformer sentiment from FinBERT, stored per article",
      "Per-ticker, per-day feature rows covering sentiment windows and technical indicators",
      "BUY above a +2% 5-day return, SELL below −2%, and HOLD in between",
      "Live inference: ingest, sentiment, features, prediction, class probabilities, and PostgreSQL storage",
      "A Streamlit application over live predictions, news, historical analysis, indicators, and sentiment",
    ],
    implementation: [
      "SQLAlchemy models persist news articles, sentiment results, stock prices, and predictions. Article, sentiment, and price writes upsert; predictions append.",
      "The 41 features combine sentiment aggregates and rolling 3-day and 7-day sentiment with 19 technical indicators: SMA 10/20, EMA 10/20, RSI 14, MACD line, signal, and histogram, Bollinger upper, lower, and width, ATR 14, 20-day volatility, 1/5/10-day returns, and volume change, average, and ratio. Indicators are computed in pandas.",
      "Labels and the trained classifier use the 5-day return. Evaluation uses chronological TimeSeriesSplit rather than a random split. The published run reports 41.03% accuracy, 39.54% balanced accuracy, and an MCC of 0.1084 on 471 labelled samples. The project README still marks those dataset counts for recompute after the next backfill.",
      "Live inference loads the saved model, builds one 41-column vector for the article date from stored history plus the new article, and writes the predicted class with BUY, HOLD, and SELL probabilities.",
    ],
    challenges: [
      "GDELT and Finnhub had to land in one schema or the backfill and the live path would diverge.",
      "Training and live inference had to call the same feature function. A second implementation would silently change the 41 inputs.",
      "A random split leaks later prices into training. TimeSeriesSplit avoids that and produces a lower, stricter score than the earlier random-split run.",
    ],
    lessonsLearned: [
      "Sentiment alone was the weaker baseline. The model uses it together with technical features, and the chronological score is still close to a three-class chance line.",
      "Storing articles, sentiment, prices, features, and predictions separately makes a prediction traceable back to the row that produced it.",
      "The live path should import the batch feature code. Duplicating it is how training and inference drift apart.",
    ],
    futureImprovements: [
      "Recompute the published article, feature, and metric counts after the next historical backfill.",
      "The tracked universe in the published dataset is five tickers. Widening it is future work.",
      "No public deployment is set up. A hosted demo would be a separate step.",
    ],
    screenshots: [
      {
        src: "/projects/financial-news-analytics/live-inference.webp",
        alt: "Live inference view showing a BUY, HOLD, or SELL prediction with class probabilities",
        caption: "Live inference: news in, sentiment, features, and a stored BUY/HOLD/SELL prediction.",
      },
      {
        src: "/projects/financial-news-analytics/sentiment-and-features.webp",
        alt: "Sentiment and technical feature view for a tracked ticker",
        caption: "FinBERT sentiment alongside the technical features used by the model.",
      },
      {
        src: "/projects/financial-news-analytics/historical-analysis.webp",
        alt: "Historical news and price analysis for the backfilled dataset",
        caption: "Historical backfill: stored news, sentiment, and prices for a date range.",
      },
    ],
    image: "/projects/financial-news-analytics/cover.webp",
    links: {
      repo: "https://github.com/Victor5899/financial-news-analytics",
    },
    year: "2026",
    period: { start: "June 2026", end: "July 2026" },
    domain: ["Machine Learning", "Data Analytics", "Data Engineering"],
  },
  {
    slug: "oracle-ai-vector-search",
    title: "Oracle AI Vector Search – Intelligent Document Q&A System",
    tagline:
      "PDF and TXT documents become 384-dimensional vectors in Oracle, then context for an OpenAI answer.",
    description:
      "A document question-answering system. Uploaded PDF and TXT files are extracted, chunked, and embedded with Sentence Transformers. Chunks and 384-dimensional vectors are stored in Oracle AI Database 26ai. A question retrieves the nearest chunks and the OpenAI API answers from that context. FastAPI exposes the pipeline; a React app handles upload, querying, and the answer.",
    problem:
      "Keyword search misses a passage that answers the question in different words, and an answer generated without the retrieved passage is not grounded in the uploaded document.",
    approach:
      "Built a retrieval-augmented generation path with a hard separation between the browser and the database. The React app talks only to FastAPI. The API extracts text, chunks it, embeds it, stores vectors in Oracle, retrieves by cosine distance, and asks the OpenAI API to answer from those chunks.",
    impact:
      "A PDF or TXT file can be uploaded, searched by meaning, and answered from the retrieved chunks. No public deployment, traffic, or latency improvement is claimed.",
    role: "Built the extraction, embedding, Oracle storage, retrieval API, and React interface.",
    stack: [
      "Python",
      "Oracle AI Database 26ai",
      "FastAPI",
      "React.js",
      "Sentence Transformers",
      "OpenAI API",
    ],
    featured: false,
    highlights: [
      "PDF and TXT upload, text extraction, and overlapping chunks",
      "384-dimensional embeddings from sentence-transformers/all-MiniLM-L6-v2",
      "Chunk and vector storage in Oracle AI Database 26ai",
      "Answers are generated from retrieved chunks, not from the question alone",
    ],
    objectives: [
      "Accept PDF and TXT uploads and extract their text.",
      "Chunk that text and embed each chunk as a 384-dimensional vector.",
      "Store chunks and embeddings in Oracle for similarity search.",
      "Answer a question from the retrieved context through a REST API and a React UI.",
    ],
    architecture:
      "Document ingestion → text extraction and chunking → embedding generation → Oracle vector storage → similarity retrieval → context-aware answer generation. The React app uploads a file and sends a question to FastAPI. The API extracts text with pypdf for PDFs and UTF-8 for TXT, splits it into overlapping chunks of about 500–800 words with a 75-word overlap, and embeds each chunk with all-MiniLM-L6-v2. Vectors are written to an Oracle VECTOR(384, FLOAT32) column. A query is embedded the same way and ranked with VECTOR_DISTANCE cosine search, using an HNSW index for the approximate lookup. The top chunks are passed to the OpenAI API. The browser never opens Oracle and never sees the API key.",
    features: [
      "PDF and TXT uploads with cleaned text extraction",
      "Ordered, overlapping chunks sized for the embedding model",
      "Semantic search over stored chunks, nearest first",
      "REST endpoints for upload and question answering",
      "A React interface for the document list, the question, and the generated answer",
    ],
    implementation: [
      "Extraction rejects any extension other than .pdf and .txt, and it rejects a file that yields no text, including a scanned PDF with no text layer.",
      "Embeddings are checked for length 384 before insert. The query vector uses the same model and the same dimension as the stored column.",
      "Retrieval defaults to the top 5 chunks and can run as an approximate HNSW search or an exact scan.",
      "Render and Vercel configuration exists in the repository for a later deploy. The project README says not to deploy until the wallet and database access steps are done, so this site does not link a live demo.",
    ],
    challenges: [
      "The embedding width is fixed by the Oracle column. A model change without a column change would fail the insert.",
      "Empty or image-only PDFs have no text to chunk. The extractor reports that instead of storing a blank document.",
      "The API holds the database credentials and the OpenAI key. The React bundle does not.",
    ],
    lessonsLearned: [
      "Retrieval has to happen before generation. The answer is only as grounded as the chunks that were passed in.",
      "One embedding function for documents and queries keeps the two vectors in the same space.",
      "Deployment wiring is not a deployment. The wallet, access list, and host are still prerequisites.",
    ],
    futureImprovements: [
      "Deploy the API and the React app after the Oracle wallet and access-control list are in place.",
      "Support file types other than PDF and TXT.",
      "Add a measured retrieval evaluation. None is published in the repository.",
    ],
    screenshots: [
      {
        src: "/projects/oracle-vector-search/document-upload.webp",
        alt: "Document upload screen for a PDF or TXT file",
        caption: "Upload: PDF or TXT in, then extraction, chunking, and embedding.",
      },
      {
        src: "/projects/oracle-vector-search/semantic-query.webp",
        alt: "Semantic query box and retrieved document chunks",
        caption: "Semantic query against the chunks stored in Oracle.",
      },
      {
        src: "/projects/oracle-vector-search/generated-answer.webp",
        alt: "AI-generated answer shown with the retrieved context",
        caption: "Answer generated from the retrieved chunks.",
      },
    ],
    image: "/projects/oracle-vector-search/cover.webp",
    links: {
      repo: "https://github.com/Victor5899/oracle-ai-vector-search",
    },
    year: "2026",
    period: { start: "August 2026", end: "October 2026" },
    domain: ["Machine Learning", "Software"],
  },
  {
    slug: "customer-churn-prediction-dashboard",
    title: "E-Commerce Customer Churn Prediction & Analytics Platform",
    tagline:
      "A leakage-aware churn model on 5,630 e-commerce records, with a Streamlit dashboard for scoring and review.",
    description:
      "A churn pipeline on the e-commerce workbook: 5,630 customer records, duplicate removal before the split, and a comparison of Logistic Regression, Random Forest, Gradient Boosting, and XGBoost. The selected Random Forest is served by a Streamlit dashboard for batch scoring, risk segments, feature importance, ROC and PR review, and retention suggestions.",
    problem:
      "The raw file repeats customers. Scoring it without removing those copies leaks identical rows into training and test, and a probability alone does not tell a retention team which band a customer falls in or which saved metric the model actually reached.",
    approach:
      "Audited exact duplicate feature rows, collapsed them before splitting, and fit imputation, one-hot encoding, and scaling inside the training pipeline. RandomizedSearchCV compared four classifiers on cross-validated PR-AUC. The Streamlit app loads the saved model and scores an uploaded CSV or XLSX file. It does not retrain.",
    impact:
      "On the saved held-out test set the selected Random Forest reaches 98.7% ROC-AUC and 94.5% PR-AUC. An earlier report, before duplicate rows were removed from the split, stated 98.9% ROC-AUC and 96.2% PR-AUC. No revenue or retained-customer impact is claimed.",
    role: "Built the data audit, model comparison, threshold selection, and Streamlit dashboard.",
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Random Forest",
      "XGBoost",
      "Streamlit",
      "Matplotlib",
      "OpenPyXL",
    ],
    featured: false,
    highlights: [
      "5,630 customer records, 5,074 after removing 556 exact duplicate rows",
      "18 model features; CustomerID is excluded and Churn is the label",
      "Logistic Regression, Random Forest, Gradient Boosting, and XGBoost compared with RandomizedSearchCV",
      "Saved test result for the selected Random Forest: 98.7% ROC-AUC and 94.5% PR-AUC",
    ],
    objectives: [
      "Predict churn from the e-commerce customer table without letting duplicate rows cross the split.",
      "Compare Logistic Regression, Random Forest, Gradient Boosting, and XGBoost on PR-AUC.",
      "Keep the reported model metrics traceable to a saved evaluation.",
      "Give the dashboard a way to score a batch, segment risk, and inspect ROC, PR, and importance.",
    ],
    architecture:
      "The workbook sheet is validated, then exact duplicate feature rows are collapsed. A group-aware stratified split keeps any remaining identical feature record inside one partition: about 64% train, 16% validation, 20% test. Each candidate is a scikit-learn pipeline of imputation, scaling or one-hot encoding, and a classifier, tuned with RandomizedSearchCV on the training partition only. The selected pipeline is saved. Streamlit loads that artifact, checks that the metrics file matches the model hash, and scores uploaded files in batch.",
    features: [
      "Batch churn prediction from a CSV or XLSX upload, using the saved threshold",
      "Low, Medium, and High risk segments on the model score",
      "Impurity and permutation feature importance",
      "ROC and PR curves with the saved held-out metrics",
      "Retention suggestions from ordered rules on complaints, tenure, satisfaction, and recency",
    ],
    implementation: [
      "The model uses the 18 original columns. There is no separate feature-engineering step. Seven numeric columns with missing values are imputed inside the pipeline, categorical columns are one-hot encoded, and numeric columns are scaled. Statistics are fit on training folds only.",
      "Selection is the highest mean cross-validated PR-AUC. Random Forest won. Its saved test metrics on 1,015 customers are 98.7% ROC-AUC and 94.5% PR-AUC. The earlier 98.9% ROC-AUC and 96.2% PR-AUC figures came from a split that let duplicate rows appear on both sides, and the project README marks them as superseded.",
      "The decision threshold is chosen on the validation partition. The dashboard will not show the saved evaluation if the metrics file does not match the loaded model.",
      "Retention actions are labelled as heuristic rules. The page does not estimate customers retained, revenue saved, or lifetime value, because the dataset has no record of past outreach.",
    ],
    challenges: [
      "556 duplicate groups shared features and the churn label and differed mainly by CustomerID. Leaving them in place inflated the earlier test scores.",
      "Churn is the minority class, about 16.8% before deduplication, so PR-AUC was the selection metric rather than accuracy.",
      "A threshold tuned on the same rows used to report it looks better than it is. Validation picks the threshold; the test set is scored once.",
    ],
    lessonsLearned: [
      "Deduplicate before the split. The model comparison is not meaningful if the same customer is in train and test.",
      "The two headline pairs are not interchangeable. 98.9% / 96.2% is the earlier report. 98.7% / 94.5% is the saved test evaluation.",
      "A retention rule is not a measured treatment. The dashboard keeps that distinction on the page.",
    ],
    futureImprovements: [
      "The repository lists no deployment, no REST API, and no automated retraining.",
      "Category spellings such as Phone and Mobile Phone are still stored as separate labels.",
      "Outreach effectiveness cannot be measured until the data includes the result of a past retention action.",
    ],
    screenshots: [
      {
        src: "/projects/ecommerce-churn/churn-prediction.webp",
        alt: "Churn prediction page with batch scores and a probability histogram",
        caption: "Batch churn prediction for an uploaded customer file.",
      },
      {
        src: "/projects/ecommerce-churn/risk-segmentation.webp",
        alt: "Customer risk segments split into low, medium, and high bands",
        caption: "Risk segments on the scored batch.",
      },
      {
        src: "/projects/ecommerce-churn/model-evaluation.webp",
        alt: "Model evaluation page with ROC and precision-recall curves and feature importance",
        caption: "ROC, PR, and feature importance for the saved Random Forest.",
      },
    ],
    image: "/projects/ecommerce-churn/cover.webp",
    links: {
      repo: "https://github.com/Victor5899/ecommerce-customer-churn-prediction",
    },
    year: "2026",
    period: { start: "May 2026", end: "June 2026" },
    domain: ["Machine Learning", "Data Analytics"],
  },
  {
    slug: "vendor-performance-analytics",
    title: "Vendor Performance Data Analysis",
    tagline:
      "Sales, purchasing, and inventory for a liquor distributor, aggregated from millions of rows to one vendor-brand table.",
    description:
      "A local analytics pipeline. Six retail extracts, including 12,825,363 sales rows and 2,372,474 purchase rows, are loaded into SQLite, reduced to a 10,692-row vendor-brand summary, and examined for sales, procurement concentration, inventory turnover, bulk-purchase pricing, and a margin comparison.",
    problem:
      "The transaction files are too large to chart row by row, vendor names and keys are inconsistent across extracts, and procurement questions need one table that already carries sales, purchases, profit, and turnover.",
    approach:
      "Loaded the six CSV extracts into SQLite, with the two large files streamed in chunks. A SQL summary joins purchases, sales, and freight to the brand and vendor grain, and pandas then derives profit, margin, stock turnover, and the sales-to-purchase ratio. The analysis notebook reads only that summary.",
    impact:
      "On the filtered summary, the top 10 vendors account for 65.69% of purchase dollars. Large orders show a lower mean unit purchase price than small orders, and low-sales vendors have a higher mean profit margin than high-sales vendors. The margin gap is statistically significant.",
    role: "Built the SQLite ingestion, the vendor summary, and the analysis notebook.",
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "SQL",
      "SQLite",
      "Matplotlib",
      "Seaborn",
      "SciPy",
    ],
    featured: false,
    highlights: [
      "12,825,363 sales rows and 2,372,474 purchase rows loaded into SQLite",
      "10,692-row vendor-brand summary with profit, margin, and stock turnover",
      "Top 10 vendors account for 65.69% of purchase dollars",
      "Welch t-test on profit margin: t = −17.6440, p < 0.0001",
    ],
    objectives: [
      "Load the six source extracts into a rebuildable SQLite database without holding the largest file in memory.",
      "Reduce the transaction grain to one row per vendor and brand.",
      "Measure sales, purchase concentration, inventory turnover, and bulk-purchase price.",
      "Test whether profit margins differ between high-sales and low-sales vendors.",
    ],
    architecture:
      "Six read-only CSV extracts go through a chunked pandas load into SQLite tables. One SQL statement builds freight, purchase, and sales aggregates and left-joins them on vendor and brand. Pandas trims names, fills missing volume with 0, and derives GrossProfit, ProfitMargin, StockTurnover, and SalesToPurchaseRatio. Divisions by zero become 0, so the summary has no inf or NaN. The notebook queries the 10,692-row summary and never scans the full sales table. Matplotlib, Seaborn, and SciPy produce the charts, the confidence intervals, and the t-test.",
    features: [
      "Chunked ingestion of the sales and purchase files into SQLite",
      "Vendor-brand metrics for sales, purchases, margin, and stock turnover",
      "Purchase-concentration and sales-leader rankings",
      "Bulk-purchase price comparison across small, medium, and large order thirds",
      "A 95% confidence interval and a Welch two-sample t-test on profit margin",
    ],
    implementation: [
      "VendorName is trimmed on the way in, because trailing spaces were splitting one vendor into several names. Sales calls the vendor key VendorNo; the other files call it VendorNumber. The summary joins across that rename.",
      "The notebook keeps rows with ProfitMargin between 0 and 120 and TotalSalesDollars greater than 0, which leaves 8,565 of 10,692 summary rows.",
      "Purchase concentration: Diageo North America 16.30%, Martignetti Companies 8.30%, Pernod Ricard USA 7.76%, and 65.69% combined for the top 10. The same three lead sales, at $67,990,099.42, $39,330,359.36, and $32,063,196.19.",
      "Mean unit purchase price falls from $39.06 on small orders to $15.49 on medium and $10.78 on large, about a 72% drop from small to large. The lowest mean stock turnovers are Alisa Carr Beverages 0.62, Highland Wine Merchants 0.71, and Park Street Imports 0.75. Unsold inventory totals $2.71M.",
      "High-sales vendors, split at the 75th percentile of sales dollars, have a 95% margin interval of 30.74% to 31.61% (mean 31.17%). Low-sales vendors, at the 25th percentile, have 40.48% to 42.62% (mean 41.55%). The Welch test rejects equal means.",
    ],
    challenges: [
      "purchases.csv and sales.csv are 345 MB and 1.5 GB. They are streamed in 500,000-row chunks and are not stored in Git.",
      "Freight is a vendor total, but the summary repeats it on every brand row for that vendor. Summing the column across rows overstates freight. The pipeline leaves that behavior in place.",
      "The two large extracts are required to rebuild the database and are not in the repository. The committed summary CSV cannot be regenerated without them.",
    ],
    lessonsLearned: [
      "Aggregate in SQL, then analyze the summary. The notebook does not need the 12.8 million sales rows.",
      "Trim keys before the join. The padded vendor names were a real source of double counting.",
      "A chart of unit price by order size is not the whole result. The margin comparison needed an interval and a test.",
    ],
    futureImprovements: [
      "Stop repeating vendor-level freight on every brand row, or document a safe way to total it.",
      "Publish a download for the two extracts that exceed GitHub's file limit, so the database can be rebuilt from the clone.",
    ],
    screenshots: [
      {
        src: "/projects/vendor-performance/sales-trends.webp",
        alt: "Chart of the vendors and brands with the highest sales",
        caption: "Highest-sales vendors and brands from the summary table.",
      },
      {
        src: "/projects/vendor-performance/purchase-concentration.webp",
        alt: "Chart of purchase-dollar concentration across the top vendors",
        caption: "Purchase concentration: share of purchase dollars by vendor.",
      },
      {
        src: "/projects/vendor-performance/inventory-turnover.webp",
        alt: "Chart of vendors with the lowest inventory turnover",
        caption: "Lowest mean stock turnover, a marker for slow-moving stock.",
      },
    ],
    image: "/projects/vendor-performance/cover.webp",
    // Short full-page capture. Cover-cropping the shared 4:3 and 16:9 frames
    // cuts the chart rows and the sides of the browser window.
    imageFit: "contain",
    links: {
      repo: "https://github.com/Victor5899/vendor-performance-analysis",
    },
    // DATE UNCONFIRMED. Description: August–September 2025. Résumé: June–July 2025.
    // Leave `year` as published until one range is confirmed, then set `period`.
    year: "2024",
    domain: ["Data Analytics", "Data Engineering"],
  },
];
