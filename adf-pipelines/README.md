# ADF Pipeline Definitions

Place your exported Azure Data Factory ARM templates / pipeline JSON here.

## How to export your ADF pipelines

1. Go to your Data Factory (`adf-sales-pipeline247`) in the Azure Portal.
2. Open **Manage** → **ARM Template** → **Export ARM Template**.
3. Download the zip — it contains JSON definitions for every pipeline, dataset, linked service, data flow, and trigger.
4. Unzip it and copy the relevant JSON files into this folder (e.g. `pipelines/`, `dataflows/`, `datasets/`, `triggers/`).

> ⚠️ Before committing: open each linked service JSON and make sure no connection strings, account keys, or secrets are present. ADF normally references these via Azure Key Vault or parameters, but double-check before pushing to a public repo.
