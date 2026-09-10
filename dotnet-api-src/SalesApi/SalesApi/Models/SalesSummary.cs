namespace SalesApi.Models;

public class SalesSummary
{
    public int TotalOrders { get; set; }
    public int TotalUnitsSold { get; set; }
    public decimal TotalRevenue { get; set; }
    public int UniqueCustomers { get; set; }
}

public class RegionSummary
{
    public string Region { get; set; } = string.Empty;
    public int OrderCount { get; set; }
    public decimal TotalRevenue { get; set; }
}

public class DailySales
{
    public DateTime OrderDate { get; set; }
    public decimal TotalRevenue { get; set; }
    public int OrderCount { get; set; }
}

public class PipelineStatus
{
    public string FileName { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public bool IsProcessed { get; set; }
}
