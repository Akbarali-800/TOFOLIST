// const elForm = document.getElementById("form");
// const elInput = document.getElementById("user");
// const box = document.getElementById("list");

// elForm.addEventListener("submit", (anonim) => {
//     anonim.preventDefault();

//     const inputVALUE = elInput.value.trim();

//     if (inputVALUE) {
//         const newLi = document.createElement("li");
//         const userName = document.createElement("h2");
//         const check = document.createElement("input");
//         const deletBtn = document.createElement("button");
//         const editBtn = document.createElement("button");

//         newLi.className = "item";
//         deletBtn.classList.add("delete-btn");
//         editBtn.classList.add("edit-btn");


//         userName.textContent = inputVALUE;
//         check.type = "checkbox";
//         deletBtn.textContent = "Delete";
//         editBtn.textContent = "Edit";

//         deletBtn.addEventListener("click", () => {
//             newLi.remove();
//         });

//         editBtn.addEventListener("click", () => {
//             const newInput = prompt("Enter new name:", userName.textContent);
//             if (newInput) {
//                 userName.textContent = newInput.trim();
//             }
//         });

//         check.addEventListener("change", () => {
//             userName.style.textDecoration = check.checked ? "line-through" : "none";
//         });

//         newLi.append(check, userName, deletBtn, editBtn);
//         box.append(newLi);
//     } else {
//         alert("Please enter a name");
//     }

//     elInput.value = "";
// });




const elForm = document.getElementById("form");
const elInput = document.getElementById("user");
const box = document.getElementById("list");
const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {
    const savedItems = JSON.parse(localStorage.getItem("todoList")) || [];
    savedItems.forEach((item) => createTodoItem(item));
});

elForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputVALUE = elInput.value.trim();

    if (inputVALUE) {
        createTodoItem(inputVALUE);
        saveToLocalStorage();
    } else {
        alert("Please enter a name");
    }

    elInput.value = "";
});

function createTodoItem(text) {
    const newLi = document.createElement("li");
    const userName = document.createElement("h2");
    const check = document.createElement("input");
    const deletBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    newLi.className = "item";
    deletBtn.classList.add("delete-btn");
    editBtn.classList.add("edit-btn");

    userName.textContent = text;
    check.type = "checkbox";
    deletBtn.textContent = "Delete";
    editBtn.textContent = "Edit";

    deletBtn.addEventListener("click", () => {
        newLi.remove();
        saveToLocalStorage();
    });

    editBtn.addEventListener("click", () => {
        const newInput = prompt("Enter new name:", userName.textContent);
        if (newInput) {
            userName.textContent = newInput.trim();
            saveToLocalStorage();
        }
    });

    check.addEventListener("change", () => {
        userName.style.textDecoration = check.checked ? "line-through" : "none";
        saveToLocalStorage();
    });

    newLi.append(check, userName, deletBtn, editBtn);
    box.append(newLi);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const items = [];
    document.querySelectorAll(".item h2").forEach((h2) => {
        items.push(h2.textContent);
    });
    localStorage.setItem("todoList", JSON.stringify(items));
}

