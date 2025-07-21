import Task from '../models/task.js';

export default class ProjectTasks {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    updateTasks(newTasks) {
        this.tasks = newTasks;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'projects-container';
        
        const projects = {};
        this.tasks.forEach(task => {
            const projectName = task.project || 'No Project';
            if (!projects[projectName]) {
                projects[projectName] = [];
            }
            projects[projectName].push(task);
        });

        if (Object.keys(projects).length === 0) {
            container.innerHTML = '<p class="no-tasks">No projects to display</p>';
            return container;
        }

        for (const [projectName, projectTasks] of Object.entries(projects)) {
            const projectSection = document.createElement('div');
            projectSection.className = 'project-section';
            
            const projectHeader = document.createElement('h2');
            projectHeader.className = 'project-header';
            projectHeader.textContent = projectName;
            
            const tasksList = document.createElement('ul');
            tasksList.className = 'tasks-list';

            projectTasks.forEach(task => {
                const taskItem = this.createTaskElement(task);
                tasksList.appendChild(taskItem);
            });

            projectSection.appendChild(projectHeader);
            projectSection.appendChild(tasksList);
            container.appendChild(projectSection);
        }

        return container;
    }

    createTaskElement(task) {
        const taskElement = document.createElement('li');
        taskElement.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;

        taskElement.innerHTML = `
            <div class="task-checkbox">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
            </div>
            <div class="task-content">
                <h3 class="task-title">${task.title}</h3>
                ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                <div class="task-footer">
                    ${task.dueDate ? `<span class="task-due">${task.dueDate.toLocaleDateString()}</span>` : ''}
                    <span class="task-priority">${'★'.repeat(5-task.priority)}</span>
                </div>
            </div>
        `;

        const checkbox = taskElement.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            task.toggleCompletion();
            taskElement.classList.toggle('completed', task.completed);
        });

        return taskElement;
    }
}