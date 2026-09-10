using SalesApi.Models;

namespace SalesApi.Data;

public interface ISalesRepository
{
    Task<IEnumerable<Sale>> GetAllSalesAsync();
    Task<SalesSummary> GetSummaryAsync();
    Task<IEnumerable<RegionSummary>> GetByRegionAsync();
    Task<IEnumerable<DailySales>> GetByDateAsync();
    Task<IEnumerable<PipelineStatus>> GetPipelineStatusAsync();
}
