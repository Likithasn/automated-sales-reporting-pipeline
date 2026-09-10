using Dapper;
using Microsoft.Data.SqlClient;
using SalesApi.Models;

namespace SalesApi.Data;

public class SalesRepository : ISalesRepository
{
    private readonly string _connectionString;

    public SalesRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("SalesDb")
            ?? throw new InvalidOperationException("Connection string 'SalesDb' not found in appsettings.json");
    }

    private SqlConnection CreateConnection() => new SqlConnection(_connectionString);

    public async Task<IEnumerable<Sale>> GetAllSalesAsync()
    {
        const string sql = @"
            SELECT OrderId, OrderDate, CustomerName, Product, Category,
                   Quantity, UnitPrice, Region, TotalAmount
            FROM Sales
            ORDER BY OrderDate DESC, OrderId DESC;";

        using var connection = CreateConnection();
        return await connection.QueryAsync<Sale>(sql);
    }

    public async Task<SalesSummary> GetSummaryAsync()
    {
        const string sql = @"
            SELECT
                COUNT(*)                         AS TotalOrders,
                ISNULL(SUM(Quantity), 0)         AS TotalUnitsSold,
                ISNULL(SUM(TotalAmount), 0)      AS TotalRevenue,
                COUNT(DISTINCT CustomerName)     AS UniqueCustomers
            FROM Sales;";

        using var connection = CreateConnection();
        var result = await connection.QuerySingleAsync<SalesSummary>(sql);
        return result;
    }

    public async Task<IEnumerable<RegionSummary>> GetByRegionAsync()
    {
        const string sql = @"
            SELECT
                Region,
                COUNT(*)                    AS OrderCount,
                ISNULL(SUM(TotalAmount), 0) AS TotalRevenue
            FROM Sales
            GROUP BY Region
            ORDER BY TotalRevenue DESC;";

        using var connection = CreateConnection();
        return await connection.QueryAsync<RegionSummary>(sql);
    }

    public async Task<IEnumerable<DailySales>> GetByDateAsync()
    {
        const string sql = @"
            SELECT
                OrderDate,
                ISNULL(SUM(TotalAmount), 0) AS TotalRevenue,
                COUNT(*)                    AS OrderCount
            FROM Sales
            GROUP BY OrderDate
            ORDER BY OrderDate ASC;";

        using var connection = CreateConnection();
        return await connection.QueryAsync<DailySales>(sql);
    }

    public async Task<IEnumerable<PipelineStatus>> GetPipelineStatusAsync()
    { 
        const string sql = @"
            SELECT FileName, IsActive, IsProcessed
            FROM PipelineConfig
            ORDER BY FileName;";

        using var connection = CreateConnection();
        return await connection.QueryAsync<PipelineStatus>(sql);
    }
}
