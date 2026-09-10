# Explaining the Automated Sales Reporting Pipeline — Presentation Script

Use this as a talking script when walking your manager through the project. It's structured so you can speak naturally, section by section.

---

## 1. Opening — What the project is and why

"I built an end-to-end data pipeline called the **Automated Sales Reporting Pipeline**. The goal was to take raw sales data and turn it into a live reporting dashboard automatically, without any manual steps in between. I used this as a hands-on way to learn **Azure Data Factory (ADF)**, since that's a core enterprise data engineering tool.

The pipeline covers the full journey: **raw CSV file → cloud storage → automated transformation → database → API → dashboard.**"

---

## 2. The architecture, in one sentence

"At a high level, the flow is:

**CSV file → Azure Blob Storage → Azure Data Factory (validates & transforms) → Azure SQL Database → .NET API → React dashboard.**

Each stage hands off cleanly to the next, and everything after the file lands in storage runs automatically — no manual triggering."

*(If they want visuals, you can sketch this as five boxes with arrows.)*

---

## 3. Walking through it step by step

### Step 1 — Storage & Ingestion
"Sales data starts as a CSV file uploaded into **Azure Blob Storage** — that's the landing zone for raw data. I set up a dedicated storage account and resource group just for this project."

### Step 2 — Connecting the Pieces (Linked Services & Datasets)
"Next, I configured Azure Data Factory to actually *see* that storage account and the SQL database — these are called **Linked Services**. On top of that, I defined **Datasets**, which describe the shape of the data ADF is reading and writing."

### Step 3 — Moving the Data (Copy Activity)
"With the connections in place, I built a **Copy Activity** — a pipeline step that moves data from the Blob storage into Azure SQL. This was the first working end-to-end run: file in, data in the database."

### Step 4 — Cleaning & Transforming the Data (Mapping Data Flow)
"Raw data isn't always clean, so I built a **Mapping Data Flow** that: calculates a computed field, `TotalAmount`, and splits records into valid and invalid rows — for example, rejecting any row with a quantity of zero or less. Valid rows go to SQL; invalid ones get routed to a separate 'rejected' folder for review instead of silently breaking the pipeline."

### Step 5 — Making It Reusable (Parameterization)
"Instead of hardcoding one file name, I **parameterized** the whole pipeline — the file name and folder path flow through as parameters from the pipeline, into the data flow, into the datasets. I proved this works by running the exact same pipeline against a brand-new file with zero code changes."

### Step 6 — Automating the Schedule (Triggers)
"I added a **daily trigger** so the pipeline runs on its own every night at 10 PM IST — no one has to kick it off manually."

### Step 7 — Handling Multiple Files at Once (Lookup + ForEach)
"Real-world pipelines rarely process just one file. I added a **Lookup activity** that reads a control table — think of it as a to-do list of files to process — and a **ForEach loop** that runs the transformation for every active file in that list. This makes the pipeline **metadata-driven**: adding a new file to process is just a row in a table, not new pipeline logic."

### Step 8 — Making It Production-Grade (Incremental Load)
"Finally, I made sure reruns don't create duplicate data. I added an `IsProcessed` flag to that control table, so the Lookup only picks up files that are active *and* not yet processed. After each file succeeds, a small script flips that flag. I tested this by rerunning the pipeline multiple times — no duplicates ever appeared."

### Step 9 — Making the Data Usable (API + Dashboard)
"Data sitting in a SQL table isn't useful to a business user, so I built two more layers on top:
- A **.NET Core Web API** that exposes clean endpoints — total sales, summaries, breakdowns by region and by date, and pipeline health status.
- A **React dashboard** that consumes those endpoints and shows summary cards, a revenue trend chart, a regional breakdown chart, an orders table, and live pipeline status — all pulling real data from the pipeline I built."

---

## 4. Wrap-up — What this demonstrates

"End to end, this project shows I can:
- Design and build a **cloud data pipeline** from scratch — ingestion, transformation, and loading
- Build pipelines that are **reusable and metadata-driven**, not hardcoded
- Handle **data quality** — validating and separating bad records instead of ignoring them
- Build for **production concerns** — scheduling, avoiding duplicate processing, and monitoring
- Connect the pipeline to a **real API and front-end** so the output is actually usable by a business user, not just sitting in a database"

---

## 5. If they ask "what's left / what's next"

"The last piece I'm finishing is more robust **error handling and monitoring** — logging pipeline failures into a dedicated error table and building an alerting path for when something breaks, so issues surface immediately instead of silently."

---

### Quick reference — tech stack
- **Storage:** Azure Blob Storage
- **Orchestration/ETL:** Azure Data Factory (Linked Services, Datasets, Copy Activity, Mapping Data Flows, Triggers, Lookup + ForEach)
- **Database:** Azure SQL Database
- **API:** ASP.NET Core Web API (Dapper)
- **Frontend:** React (Vite)
