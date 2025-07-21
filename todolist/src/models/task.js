class Task {
    constructor(title, { description, dueDate, priority, project } = {}) {
        if (!title) throw new Error("Title is required");
        
        this.title = title;
        this.description = description || "";
        this.dueDate = dueDate || null;
        this.setPriority(priority || 4);
        this.completed = false;
        this.project = project || null;
    }

    setPriority(priority) {
        const priorityNum = Number(priority);
        if (priorityNum < 1 || priorityNum > 4) {
            throw new Error("Priority must be between 1 (highest) and 4 (lowest)");
        }
        this.priority = priorityNum;
    }

    toggleCompletion() {
        this.completed = !this.completed;
        return this.completed;
    }

    isDueToday() {
        if (!this.dueDate) return false;
        const today = new Date();
        return (
            this.dueDate.getDate() === today.getDate() &&
            this.dueDate.getMonth() === today.getMonth() &&
            this.dueDate.getFullYear() === today.getFullYear()
        );
    }

    isDueThisWeek() {
        if (!this.dueDate) return false;
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return this.dueDate >= today && this.dueDate <= nextWeek;
    }
}

export default Task;