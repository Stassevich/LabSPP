using Microsoft.AspNetCore.Mvc;
using ProjectManager.Api.Models;
using ProjectManager.Api.Services;

namespace ProjectManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly DataService _dataService;

    public ProjectsController(DataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Project>> GetProjects()
    {
        return Ok(_dataService.GetProjects());
    }

    [HttpGet("{id}")]
    public ActionResult<Project> GetProject(int id)
    {
        var project = _dataService.GetProject(id);
        if (project == null) return NotFound();
        return Ok(project);
    }

    [HttpPost]
    public ActionResult<Project> CreateProject(Project project)
    {
        var createdProject = _dataService.AddProject(project);
        return CreatedAtAction(nameof(GetProject), new { id = createdProject.Id }, createdProject);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProject(int id, Project project)
    {
        var updatedProject = _dataService.UpdateProject(id, project);
        if (updatedProject == null) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProject(int id)
    {
        var result = _dataService.DeleteProject(id);
        if (!result) return NotFound();
        return NoContent();
    }
}