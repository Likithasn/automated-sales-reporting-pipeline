# Architecture

## Overview

```
 ┌────────────┐     ┌──────────────────┐     ┌────────────────────┐     ┌───────────────┐     ┌──────────────┐     ┌──────────────┐
 │  CSV File  │ --> │ Azure Blob        │ --> │ Azure Data Factory │ --> │ Azure SQL      │ --> │ .NET Core API │ --> │ React         │
 │            │     │ Storage (raw)     │     │ (validate/         │     │ Database       │     │ (SalesApi)     │     │ Dashboard     │
 │            │     │                    │     │  transform)        │     │ (SalesDB)      │     │                │     │               │
 └────────────┘     └──────────────────┘     └────────────────────┘     └───────────────┘     └──────────────┘     └──────────────┘
```

## Components

### 1. Storage layer — Azure Blob Storage
Raw sales CSV files land in a dedicated storage account. This is the entry point to the pipeline — nothing downstream runs until a file is here.

### 2. Orchestration & transformation — Azure Data Factory
- **Linked Services** connect ADF to Blob Storage and Azure SQL.
- **Datasets** define the shape of data being read/written.
- **Copy Activity** moves raw data into SQL.
- **Mapping Data Flow** (`DF_TransformSales`) computes derived fields (e.g. `TotalAmount`) and splits rows into valid (→ SQL) vs invalid (→ a rejected-files folder in Blob).
- **Triggers** run the pipeline on a daily schedule automatically.
- **Lookup + ForEach** activities read a control table (`PipelineConfig`) and loop the transform over every active, unprocessed file — making the pipeline metadata-driven rather than hardcoded to one file.
- **Incremental load logic**: an `IsProcessed` flag on `PipelineConfig`, flipped by a Script activity after each successful run, prevents duplicate processing on reruns.

### 3. Data layer — Azure SQL Database
Holds the cleaned, validated sales data (`Sales` table) plus pipeline control/metadata (`PipelineConfig`, and eventually `PipelineErrorLog`).

### 4. API layer — ASP.NET Core Web API
A Dapper-based Web API (`SalesApi`) exposes clean, purpose-built endpoints on top of the SQL data — summary aggregates, regional breakdowns, date-based trends, and pipeline status — so consumers never query the database directly.

### 5. Presentation layer — React Dashboard
A Vite-based React app (`sales-dashboard`) consumes the API and renders:
- Summary cards
- Revenue trend line chart
- Region breakdown bar chart
- Pipeline file status panel
- Orders table

## Design principles followed

- **Separation of concerns** — ingestion, transformation, storage, API, and UI are all distinct layers.
- **Reusability** — pipeline behavior is driven by parameters and a metadata table, not hardcoded values.
- **Data quality first** — invalid records are rejected and routed aside rather than silently loaded or dropped.
- **Idempotency** — reruns do not create duplicate data, thanks to the `IsProcessed` flag.
