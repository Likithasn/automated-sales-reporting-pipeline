using Microsoft.AspNetCore.Mvc;
using SalesApi.Data;

namespace SalesApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PipelineController : ControllerBase
{
    private readonly ISalesRepository _repository;

    public PipelineController(ISalesRepository repository)
    {
        _repository = repository;
    }

    // GET /api/pipeline/status
    // Shows which files are active and whether they've been processed yet -
    // a lightweight view into the ADF PipelineConfig control table.
    [HttpGet("status")]
    public async Task<IActionResult> GetStatus()
    {
        var status = await _repository.GetPipelineStatusAsync();
        return Ok(status);
    }
}
