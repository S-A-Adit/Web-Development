import AllTasks from './views/AllTasks.js';
import TodayTasks from './views/today.js';
import ThisWeekTasks from './views/thisweek.js';
import PriorityTasks from './views/priority.js';
import ProjectTasks from './views/project.js';
import Task from './models/task.js';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const content = document.getElementById('content');
    const addTaskBtn = document.querySelector('.add-task-btn');
    const taskModal = document.getElementById('task-modal');
    const closeModal = document.querySelector('.close-modal');
    const taskForm = document.getElementById('task-form');
    const tabs = document.querySelectorAll('.tab');

    // Initialize tasks
    let tasks = [
        new Task('Complete project', {
            description: 'Finish all the remaining tasks',
            dueDate: new Date(),
            priority: 1,
            project: 'Work'
        }),
        new Task('Buy groceries', {
            description: 'Milk, eggs, bread',
            dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
            priority: 3,
            project: 'Personal'
        }),
        new Task('Call mom', {
            dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            priority: 2
        }),
    ];

    // Initialize views
    const allTasksView = new AllTasks(tasks);
    const todayTasksView = new TodayTasks(tasks);
    const weekTasksView = new ThisWeekTasks(tasks);
    const priorityTasksView = new PriorityTasks(tasks);
    const projectTasksView = new ProjectTasks(tasks);

    // Tab switching logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            content.innerHTML = '';
            switch(tab.dataset.tab) {
                case 'all':
                    content.appendChild(allTasksView.render());
                    break;
                case 'today':
                    content.appendChild(todayTasksView.render());
                    break;
                case 'week':
                    content.appendChild(weekTasksView.render());
                    break;
                case 'priority':
                    content.appendChild(priorityTasksView.render());
                    break;
                case 'projects':
                    content.appendChild(projectTasksView.render());
                    break;
            }
        });
    });

    // Initial render
    content.appendChild(allTasksView.render());

    // Modal handling (same as before)
    addTaskBtn.addEventListener('click', () => taskModal.style.display = 'flex');
    closeModal.addEventListener('click', () => taskModal.style.display = 'none');
    window.addEventListener('click', (e) => e.target === taskModal && (taskModal.style.display = 'none'));

    // Task form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newTask = new Task(
            document.getElementById('task-title').value,
            {
                description: document.getElementById('task-description').value,
                dueDate: document.getElementById('task-due').value ? new Date(document.getElementById('task-due').value) : null,
                priority: parseInt(document.getElementById('task-priority').value),
                project: document.getElementById('task-project').value || null
            }
        );

        tasks.push(newTask);
        allTasksView.updateTasks(tasks);
        todayTasksView.updateTasks(tasks);
        weekTasksView.updateTasks(tasks);
        priorityTasksView.updateTasks(tasks);
        projectTasksView.updateTasks(tasks);
        
        taskForm.reset();
        taskModal.style.display = 'none';
    });
});