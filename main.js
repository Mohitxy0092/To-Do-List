document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addtask = document.getElementById("add-task-btn");
    const todolist = document.getElementById("todo-list");
    let task = JSON.parse(localStorage.getItem("task")) || [];
    task.forEach((task1) => RenderTask(task1));
    addtask.addEventListener('click', () => {
        const tasktext = todoInput.value.trim();
        if (tasktext === "" || task.some(t => t.text === tasktext)) return;
        const newtask = {
            id: Date.now(),
            text: tasktext,
            completed: false,
        };
        task.push(newtask);
        RenderTask(newtask);
        saveTask();
        todoInput.value = ""; // clear input after adding
        todoInput.focus();
    });
    todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addtask.click();
        }
    })
    function RenderTask(taskObj) {
        const li = document.createElement('li');
        li.setAttribute('data-id', taskObj.id);
        if (taskObj.completed) li.classList.add('completed')
        li.innerHTML = `<span>${taskObj.text}</span>
    <button>delete</button>`;
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            taskObj.completed = !taskObj.completed;
            li.classList.toggle('completed');
            saveTask()
        })
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation()
            task = task.filter(t => t.id !== taskObj.id)
            li.remove();
            saveTask();
        })
        todolist.appendChild(li);

    }
    function saveTask() {
        localStorage.setItem("task", JSON.stringify(task));
    }
})

