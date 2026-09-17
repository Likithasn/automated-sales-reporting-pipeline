# Automated Sales Reporting Pipeline

An end-to-end cloud data pipeline that ingests raw sales CSV files, validates and transforms them, loads them into a database, and exposes the results through an API-backed React dashboard — built on Microsoft Azure.

> Built as a hands-on learning project to gain practical experience with Azure Data Factory (ADF), covering the full path from raw data to a usable reporting dashboard.

---

## Architecture

```
CSV File  →  Azure Blob Storage  →  Azure Data Factory  →  Azure SQL Database  →  .NET Core API  →  React Dashboard
                                    (validate + transform)
```

Full breakdown: see [`docs/architecture.md`](docs/architecture.md)

---

## Live Demo

| What | Link |
|---|---|
| **Dashboard** | https://sales-reporting-dashboard.vercel.app |
| **API (Swagger docs)** | https://sales-api-qwnl.onrender.com/swagger |

> Note: the API is hosted on Render's free tier, which spins down after inactivity — the first request after idle time can take up to ~50 seconds to respond while it wakes up.

---

## Tech Stack

| Layer            | Technology                                   |
|-------------------|-----------------------------------------------|
| Storage           | Azure Blob Storage                            |
| Orchestration/ETL | Azure Data Factory (Pipelines, Data Flows, Triggers) |
| Database          | Azure SQL Database                            |
| Backend API       | ASP.NET Core Web API + Dapper                 |
| Frontend          | React (Vite)                                  |
| Hosting           | Render (API) · Vercel (Frontend)              |

---

## What This Project Demonstrates

- Designing a cloud ETL pipeline from raw ingestion through to a database
- Data validation and cleaning (splitting valid vs. invalid records)
- Building **reusable, parameterized** pipelines instead of hardcoded ones
- **Metadata-driven** processing using Lookup + ForEach over a control table
- Production concerns: scheduled triggers, incremental load (no duplicate processing)
- Exposing pipeline output through a REST API and a live dashboard
- Deploying and connecting a multi-service stack across separate cloud providers (Azure, Render, Vercel), including firewall, CORS, and caching troubleshooting

---

## Project Phases

The pipeline was built incrementally across 8 phases. Full step-by-step detail is in [`docs/pipeline-phases.md`](docs/pipeline-phases.md):

1. Blob Storage + raw CSV ingestion
2. ADF Linked Services & Datasets
3. Copy Activity → Azure SQL
4. Mapping Data Flow (validation + transform)
5. Parameterization (folder/file names, reusable pipeline)
6. Scheduled Trigger (daily run, 10 PM IST)
7. Lookup + ForEach (metadata-driven multi-file processing)
8. Incremental load + .NET API + React dashboard

---

## Repository Structure

```
├── README.md
├── docs/
│   ├── architecture.md
│   └── pipeline-phases.md
├── adf-pipelines/         # Exported ADF pipeline/dataflow JSON (ARM templates)
├── dotnet-api-src/        # ASP.NET Core Web API source (SalesApi)
├── react-dashboard-src/   # React dashboard source (sales-dashboard)
└── screenshots/           # Dashboard & ADF pipeline screenshots
```

---

## API Endpoints

| Endpoint                  | Description                          |
|----------------------------|---------------------------------------|
| `GET /api/sales`           | Raw sales records                    |
| `GET /api/sales/summary`   | Aggregated summary (totals, counts)  |
| `GET /api/sales/by-region` | Sales broken down by region          |
| `GET /api/sales/by-date`   | Sales trend over time                |
| `GET /api/pipeline/status` | Current pipeline/file processing status |

---

## Dashboard Features

- Summary cards (total revenue, order count, etc.)
- Revenue trend line chart
- Regional breakdown bar chart
- Pipeline file processing status
- Orders table

---

## Known Limitations

- **Error handling is not yet implemented.** A `PipelineErrorLog` table and a corresponding `/api/pipeline/errors` endpoint exist, but the ADF failure-path activity that would populate the table isn't wired up reliably yet.
- **Incremental load uses a simple boolean flag** (`IsProcessed`) rather than a timestamp-based watermark — fine for this project's scale, but a production system would typically track `LastModifiedDate` instead.
- **SQL Server firewall is broadly opened** (`0.0.0.0`–`255.255.255.255`) to allow Render's dynamic IPs to connect — acceptable for a free-tier learning project, not something to carry into production.

---

## Author

**Likitha S N**
[LinkedIn](https://linkedin.com/in/likithasn) · likithasn591@gmail.com
