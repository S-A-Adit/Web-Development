import Task from '../models/task.js';

export default class TodayTasks {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    updateTasks(newTasks) {
        this.tasks = newTasks;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'tasks-container';
        
        const todayTasks = this.tasks.filter(task => task.isDueToday());
        
        if (todayTasks.length === 0) {
            container.innerHTML = '<p class="no-tasks">No tasks due today</p>';
            return container;
        }

        const tasksList = document.createElement('ul');
        tasksList.className = 'tasks-list';

        todayTasks.forEach(task => {
            const taskItem = this.createTaskElement(task);
            tasksList.appendChild(taskItem);
        });

        container.appendChild(tasksList);
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
                    <span class="task-due">Today</span>
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