using Microsoft.AspNetCore.Mvc;
using ProjectManager.Api.Models;
using ProjectManager.Api.Services;

namespace ProjectManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly DataService _dataService;

    public TasksController(DataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<ProjectTask>> GetTasks()
    {
        return Ok(_dataService.GetTasks());
    }

    [HttpGet("{id}")]
    public ActionResult<ProjectTask> GetTask(int id)
    {
        var task = _dataService.GetTask(id);
        if (task == null) return NotFound();
        return Ok(task);
    }

    [HttpGet("project/{projectId}")]
    public ActionResult<IEnumerable<ProjectTask>> GetTasksByProject(int projectId)
    {
        return Ok(_dataService.GetTasksByProject(projectId));
    }

    [HttpPost]
    public ActionResult<ProjectTask> CreateTask(ProjectTask task)
    {
        var createdTask = _dataService.AddTask(task);
        return CreatedAtAction(nameof(GetTask), new { id = createdTask.Id }, createdTask);
    }

    [HttpPut("{id}")]
    public ActionResult<ProjectTask> UpdateTask(int id, ProjectTask task)
    {
        var updatedTask = _dataService.UpdateTask(id, task);
        if (updatedTask == null) return NotFound();
        return Ok(updatedTask); 
    }

    [HttpPatch("{id}/status")]
    public ActionResult<ProjectTask> UpdateTaskStatus(int id, [FromBody] string status) // Изменен возвращаемый тип
    {
        var updatedTask = _dataService.UpdateTaskStatus(id, status);
        if (updatedTask == null) return NotFound();
        return Ok(updatedTask); 
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var result = _dataService.DeleteTask(id);
        if (!result) return NotFound();
        return NoContent();
    }
}