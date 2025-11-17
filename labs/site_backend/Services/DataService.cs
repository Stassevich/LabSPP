using ProjectManager.Api.Models;

namespace ProjectManager.Api.Services;

public class DataService
{
    private readonly List<Project> _projects;
    private readonly List<ProjectTask> _tasks;
    private int _projectIdCounter = 3;
    private int _taskIdCounter = 5;

    public DataService()
    {
        _projects = new List<Project>
        {
            new Project
            {
                Id = 1,
                Title = "Веб-приложение для управления задачами",
                Description = "Описание приложения. Много текста",
                Status = "active"
            },
            new Project
            {
                Id = 2,
                Title = "Мобильное приложение",
                Description = "Описание мобильного приложения",
                Status = "active"
            },
            new Project
            {
                Id = 3,
                Title = "Завершенный проект",
                Description = "Описание завершенного проекта",
                Status = "completed"
            }
        };

        _tasks = new List<ProjectTask>
        {
            new ProjectTask
            {
                Id = 1,
                ProjectId = 1,
                Title = "Проектирование архитектуры",
                Description = "Описание задачи",
                Assignee = "Алексей Петров",
                Status = "done"
            },
            new ProjectTask
            {
                Id = 2,
                ProjectId = 1,
                Title = "Реализация компонента",
                Description = "Описание задачи",
                Assignee = "Мария Сидорова",
                Status = "inProgress"
            },
            new ProjectTask
            {
                Id = 3,
                ProjectId = 1,
                Title = "Интеграция",
                Description = "Описание задачи",
                Assignee = "Иван Козлов",
                Status = "todo"
            },
            new ProjectTask
            {
                Id = 4,
                ProjectId = 2,
                Title = "Дизайн приложения",
                Description = "Описание задачи",
                Assignee = "Ольга Новикова",
                Status = "inProgress"
            },
            new ProjectTask
            {
                Id = 5,
                ProjectId = 3,
                Title = "Настройка сервера",
                Description = "Описание задачи",
                Assignee = "Дмитрий Волков",
                Status = "done"
            }
        };
    }

    
    public List<Project> GetProjects() => _projects.OrderByDescending(p => p.UpdatedAt).ToList();
    public Project? GetProject(int id) => _projects.FirstOrDefault(p => p.Id == id);

    public Project AddProject(Project project)
    {
        project.Id = ++_projectIdCounter;
        project.CreatedAt = DateTime.UtcNow;
        project.UpdatedAt = DateTime.UtcNow;
        _projects.Add(project);
        return project;
    }

    public Project? UpdateProject(int id, Project project)
    {
        var existingProject = GetProject(id);
        if (existingProject == null) return null;

        existingProject.Title = project.Title;
        existingProject.Description = project.Description;
        existingProject.Status = project.Status;
        existingProject.UpdatedAt = DateTime.UtcNow;

        return existingProject;
    }

    public bool DeleteProject(int id)
    {
        var project = GetProject(id);
        if (project == null) return false;

        _projects.Remove(project);
        _tasks.RemoveAll(t => t.ProjectId == id);
        return true;
    }

    // Task methods
    public List<ProjectTask> GetTasks() => _tasks.ToList();
    public List<ProjectTask> GetTasksByProject(int projectId) =>
        _tasks.Where(t => t.ProjectId == projectId).OrderByDescending(t => t.UpdatedAt).ToList();
    public ProjectTask? GetTask(int id) => _tasks.FirstOrDefault(t => t.Id == id);

    public ProjectTask AddTask(ProjectTask task)
    {
        task.Id = ++_taskIdCounter;
        task.CreatedAt = DateTime.UtcNow;
        task.UpdatedAt = DateTime.UtcNow;
        _tasks.Add(task);
        return task;
    }

    public ProjectTask? UpdateTask(int id, ProjectTask task)
    {
        var existingTask = GetTask(id);
        if (existingTask == null) return null;

        existingTask.Title = task.Title;
        existingTask.Description = task.Description;
        existingTask.Assignee = task.Assignee;
        existingTask.Status = task.Status;
        existingTask.ProjectId = task.ProjectId;
        existingTask.UpdatedAt = DateTime.UtcNow;

        return existingTask;
    }

    public ProjectTask? UpdateTaskStatus(int id, string status)
    {
        var existingTask = GetTask(id);
        if (existingTask == null) return null;

        existingTask.Status = status;
        existingTask.UpdatedAt = DateTime.UtcNow;
        return existingTask;
    }

    public bool DeleteTask(int id)
    {
        var task = GetTask(id);
        if (task == null) return false;
        _tasks.Remove(task);
        return true;
    }
}