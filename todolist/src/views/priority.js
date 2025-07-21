import Task from '../models/task.js';

export default class PriorityTasks {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    updateTasks(newTasks) {
        this.tasks = newTasks;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'tasks-container';
        
        const sortedTasks = [...this.tasks].sort((a, b) => a.priority - b.priority);
        
        if (sortedTasks.length === 0) {
            container.innerHTML = '<p class="no-tasks">No tasks to display</p>';
            return container;
        }

        const tasksList = document.createElement('ul');
        tasksList.className = 'tasks-list';

        sortedTasks.forEach(task => {
            const taskItem = this.createTaskElement(task);
            tasksList.appendChild(taskItem);
        });

        container.appendChild(tasksList);
        return container;
    }

    createTaskElement(task) {
        const priorityLabels = ['Critical', 'High', 'Medium', 'Low'];
        
        const taskElement = document.createElement('li');
        taskElement.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;

        taskElement.innerHTML = `
            <div class="task-checkbox">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
            </div>
            <div class="task-content">
                <h3 class="task-title">${task.title}</h3>
                <span class="priority-label">${priorityLabels[task.priority - 1]}</span>
                ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                <div class="task-footer">
                    ${task.dueDate ? `<span class="task-due">${task.dueDate.toLocaleDateString()}</span>` : ''}
                    ${task.project ? `<span class="task-project">${task.project}</span>` : ''}
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