const input = document.getElementById("todo-input");
const button = document.getElementById("add-btn");
const tododList = document.getElementById("todo-list");

const validateInput = (todoItemText) => {
    if (todoItemText.trim() === "") {
        alert("No puedes registrar una tarea vacía");
        return false;
    }
    return true;
};

const editTodo = (spanElement, liElement) => {
    const inputItem = document.createElement("input");
    inputItem.type = "text";
    inputItem.value = spanElement.textContent;
    liElement.replaceChild(inputItem, spanElement);

    inputItem.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (!validateInput(inputItem.value)) {
                return;
            }
            spanElement.textContent = inputItem.value;
            liElement.replaceChild(spanElement, inputItem);
        }
    });

    inputItem.focus();

    inputItem.addEventListener("blur", () => {
        spanElement.textContent = inputItem.value;
        liElement.replaceChild(spanElement, inputItem);
    });
};

const appendElementToList = (todoItemText) => {
    const element = document.createElement("li");
    const text = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const modificarBtn = document.createElement("button");

    text.textContent = todoItemText;
    element.appendChild(text);

    modificarBtn.textContent = "✏️";
    modificarBtn.classList.add("edit-btn"); // Añadir clase para estilo
    element.appendChild(modificarBtn);

    deleteBtn.textContent = "Eliminar";
    element.appendChild(deleteBtn);

    element.addEventListener("click", (event) => {
        if (!event.target.closest("button")) {
            element.classList.toggle("completed");
        }
    });

    deleteBtn.addEventListener("click", () => {
        element.remove();
    });

    modificarBtn.addEventListener("click", () => {
        editTodo(text, element);
    });

    tododList.appendChild(element);
};

const addTodo = () => {
    const todoItemText = input.value;
    if (!validateInput(todoItemText)) return;

    appendElementToList(todoItemText);
    input.value = "";
};

button.addEventListener("click", addTodo);
