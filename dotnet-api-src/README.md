# SalesApi — ASP.NET Core Web API

Place your `SalesApi` project source here (copy your local project folder into `dotnet-api-src/`, replacing this README, or alongside it).

## Suggested structure
```
dotnet-api-src/
├── SalesApi.sln
└── SalesApi/
    ├── Controllers/
    ├── Models/
    ├── Program.cs
    ├── appsettings.json         (DO NOT commit real connection strings — see below)
    └── SalesApi.csproj
```

## Before committing
- Move your real SQL connection string out of `appsettings.json` into `appsettings.Development.json` (gitignored) or environment variables / User Secrets.
- Commit an `appsettings.example.json` instead, with placeholder values, so others can see what config is expected.
