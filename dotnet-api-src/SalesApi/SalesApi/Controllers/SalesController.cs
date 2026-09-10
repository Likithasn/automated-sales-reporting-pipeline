using Microsoft.AspNetCore.Mvc;
using SalesApi.Data;

namespace SalesApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    private readonly ISalesRepository _repository;

    public SalesController(ISalesRepository repository)
    {
        _repository = repository;
    }

    // GET /api/sales
    [HttpGet]
    public async Task<IActionResult> GetAllSales()
    {
        var sales = await _repository.GetAllSalesAsync();
        return Ok(sales);
    }

    // GET /api/sales/summary
    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var summary = await _repository.GetSummaryAsync();
        return Ok(summary);
    }

    // GET /api/sales/by-region
    [HttpGet("by-region")]
    public async Task<IActionResult> GetByRegion()
    {
        var regions = await _repository.GetByRegionAsync();
        return Ok(regions);
    }

    // GET /api/sales/by-date
    [HttpGet("by-date")]
    public async Task<IActionResult> GetByDate()
    {
        var daily = await _repository.GetByDateAsync();
        return Ok(daily);
    }
}
