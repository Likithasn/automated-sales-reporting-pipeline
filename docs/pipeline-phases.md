# Pipeline Build Phases

This project was built incrementally across 8 phases, each one adding a capability on top of the last.

## Phase 1 — Storage & Ingestion
Set up a dedicated Azure Storage account and resource group. Raw sales CSV files are uploaded here as the pipeline's landing zone.

## Phase 2 — Linked Services & Datasets
Configured ADF Linked Services to connect to both Blob Storage and Azure SQL Database. Defined Datasets describing the structure of the data being read and written.

## Phase 3 — Copy Activity
Built the first working pipeline: a Copy Activity that moves data directly from Blob Storage into Azure SQL. This proved the basic end-to-end path.

## Phase 4 — Mapping Data Flow (Validation & Transformation)
Built `DF_TransformSales`, a Mapping Data Flow that:
- Computes a derived `TotalAmount` field
- Splits rows into valid (Quantity > 0) and invalid records
- Sends valid rows to SQL, invalid rows to a rejected-files folder in Blob

## Phase 5 — Parameterization
Parameterized `folderName` and `fileName` end-to-end — from pipeline parameters, into the Data Flow parameters, into the Dataset parameters. Verified by running the same pipeline against a second file with zero code changes.

## Phase 6 — Triggers
Added a daily schedule trigger (`TR_DailySalesLoad`) running at 10 PM IST, so the pipeline executes automatically without manual intervention.

## Phase 7 — Lookup + ForEach (Metadata-Driven Processing)
Added a `PipelineConfig` SQL table listing files to process. A Lookup activity (`LK_GetActiveFiles`) reads the active files, and a ForEach activity (`FE_ProcessFiles`) loops the Data Flow over each one. This means new files can be added to the pipeline by adding a row to a table — no pipeline logic changes needed.

## Phase 8 — Incremental Load, Error Handling, API & Dashboard
- Added an `IsProcessed` flag to `PipelineConfig`; the Lookup query now filters `WHERE IsActive = 1 AND IsProcessed = 0`.
- Added a Script activity (`SP_MarkFileProcessed`) inside the ForEach to flip `IsProcessed = 1` after each file's Data Flow succeeds.
- Verified reruns do not duplicate rows in the `Sales` table.
- Built the **.NET Core Web API** (`SalesApi`) — Dapper-based, exposing `/api/sales`, `/api/sales/summary`, `/api/sales/by-region`, `/api/sales/by-date`, and `/api/pipeline/status`.
- Built the **React dashboard** (`sales-dashboard`) — summary cards, region bar chart, revenue trend line chart, pipeline file status, and an orders table, confirmed working end-to-end against `SalesDB`.

### Remaining work
- Add a `PipelineErrorLog` table and a failure-path Script activity for structured error logging.
- Add alerting/monitoring so failures surface immediately instead of silently.
