const container = document.querySelector(".list-container");
const categorieMap = document.querySelectorAll(".idea");
const person = document.querySelector(".person");
let categorypersonal = person.getAttribute("data-category");
const popup = document.querySelector(".popup");
const today_count = document.querySelector(".today-count");
const total = document.querySelector(".total-count");

window.addEventListener("DOMContentLoaded", (e) => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  displayTodo(todos);

  total.innerHTML = todos.length;
  today_count.innerHTML = todos.length;

  const form = document.querySelector(".form");
  const addBtn = document.querySelector(".addbtns");
  const closeBtn = document.querySelector("form i");

  const username = document.querySelector(".searchbtn");

  const user = localStorage.getItem("username") || "";

  username.value = user;
  username.addEventListener("change", (e) => {
    let newName = e.target.value;
    localStorage.setItem("username", newName);
  });

  // Close to form by cliking the cancel btn
  closeBtn.addEventListener("click", (e) => {
    form.classList.add("display");
  });

  // Add to todo list
  addBtn.addEventListener("click", (e) => {
    form.classList.remove("display");
  });

  const months = [
    "January",
    "Febuary",
    "Match",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // surmiting a todo
  function surmit() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.classList.add("display");
      let date = new Date(),
        month = months[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear();

      lists = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        disabled: false,
        count: todos.length,
        creatAt: `${month} ${day} ${year}`,
      };

      if (!lists.content || !lists.category) {
        alert("All filled required");
      } else {
        todos.push(lists);
        setTimeout(() => {
          popup.innerHTML = "Todo Item Added Successfully";
          popup.classList.add("show");
        }, 200);

        setTimeout(() => {
          popup.classList.remove("show");
        }, 2500);
      }
      e.target.reset();
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodo(todos);
      total.innerHTML = todos.length;
      today_count.innerHTML = todos.length;
    });
  }
  surmit();
});

categorieMap.forEach((map) => {
  map.addEventListener("click", (e) => {
    const filer = e.currentTarget.dataset.id;
    const menuItem = todos.filter((todo) => {
      if (todo.category === filer) {
        return todo;
      }
    });
    if (filer === "all") {
      displayTodo(todos);
    } else {
      displayTodo(menuItem);
    }
  });
});

const search_item = document.querySelector(".search_tash");

search_item.addEventListener("keyup", (e) => {
  const data = e.target.value.toLowerCase();
  const newdata = todos.filter((todo) => {
    return todo.content.toLocaleLowerCase().includes(data);
  });
  if (newdata) {
    displayTodo(newdata);
  } else {
    console.log("no item");
  }
});

// display each todo on the page
function displayTodo(elem) {
  const container = document.querySelector(".list-container");
  container.innerHTML = "";
  elem.forEach((item) => {
    // create element
    const li = document.createElement("li");
    li.innerHTML = `           <div class="top">
                        <input type="checkbox" ${
                          item.disabled ? "checked" : ""
                        } class="check">
                        <span></span>

                        <input type="text" class="todoItem" value="${
                          item.content
                        }" readonly>
                        
                        <div class="icon">
                            <i class='bx bx-edit-alt edit'></i>
                            <i class='bx bx-trash del'></i>
                        </div>
                      </div>

                        <div class="category-input">
                            <div class="border">
                            <div class="${item.category}"></div>
                            <p>${item.category}</p>
                            </div>
                    
                            <div class="date"><i class='bx bx-calendar'></i> ${
                              item.creatAt
                            }</div>
                            
                        </div>`;

    container.append(li);

    total.innerHTML = todos.length;
    today_count.innerHTML = todos.length;

    const todoItem = li.querySelector(".todoItem");
    const checks = li.querySelector(".check");

    if (item.disabled) {
      todoItem.classList.add("done");
    }

    // add the check button on th todos
    checks.addEventListener("change", (e) => {
      item.disabled = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (item.disabled) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }
      displayTodo(todos);
      total.innerHTML = todos.length;
      today_count.innerHTML = todos.length;
    });

    // edit item on the todos
    const edit = li.querySelector(".edit");

    edit.addEventListener("click", (e) => {
      const todoItem = li.querySelector(".todoItem");
      todoItem.removeAttribute("readonly");
      todoItem.focus();
      todoItem.addEventListener("blur", (e) => {
        todoItem.setAttribute("readonly", true);
        item.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodo(todos);
      });
      total.innerHTML = todos.length;
      today_count.innerHTML = todos.length;
    });

    li.addEventListener("click", (e) => {
      const todoItem = li.querySelector(".todoItem");
      todoItem.removeAttribute("readonly");
      todoItem.focus();
      todoItem.addEventListener("blur", (e) => {
        todoItem.setAttribute("readonly", true);
        item.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodo(todos);
        total.innerHTML = todos.length;
        today_count.innerHTML = todos.length;
      });
    });

    // delect item on the todo
    const del = li.querySelector(".del");
    del.addEventListener("click", (e) => {
      const trash = document.querySelector(".addanime");
      const cover = document.querySelector(".cover");
      const drop = document.querySelector(".animate1");
      const comfirmId = confirm(
        "Are you sure you want to delete this item in your todo list"
      );

      if (!comfirmId) return;
      todos = todos.filter((t) => t != item);

      // trash.classList.add("trash");

      setTimeout(() => {
        popup.innerHTML = "Todo Item Deleted Successfully";
        popup.classList.add("show");
        cover.classList.add("cover1");
        drop.classList.add("animate");
      }, 200);

      setTimeout(() => {
        popup.classList.remove("show");
      }, 2500);

      setTimeout(() => {
        cover.classList.remove("cover1");
        drop.classList.remove("animate");
      }, 3800);

      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodo(todos);
      total.innerHTML = todos.length;
      today_count.innerHTML = todos.length;
    });
  });
}
