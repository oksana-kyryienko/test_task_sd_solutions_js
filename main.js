const root = document.querySelector(".main");

const newTodoField = root.querySelector(".new-todo");

const itemsList = root.querySelector(".todo-list");

let list = new Map([]);

root.querySelector(".delete").addEventListener("click", () => {
  const result = confirm("Do you want to clear a field?");
  if (!result) {
    return;
  }
  itemsList.value = "";
  list = new Map([]);
});

function isValid(str) {
  return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?@]/g.test(str);
}

root.querySelector(".add").addEventListener("click", () => {
  let valueFromInput = newTodoField.value;
  let firstPart = valueFromInput.split("=")[0];
  let secondPart = valueFromInput.split("=")[1];

  if (
    firstPart === "" ||
    secondPart === "" ||
    firstPart === undefined ||
    secondPart === undefined ||
    !isValid(firstPart) ||
    !isValid(secondPart) ||
    !firstPart.trim().length ||
    !secondPart.trim().length
  ) {
    itemsList.value = "Please, enter a proper value";
  } else {
    newTodoField.value = "";
    itemsList.value = "";
    list.set(firstPart.trim(), secondPart.trim());

    for (let [key, value] of list) {
      itemsList.value += key + " = " + value + "\n";
    }
  }
});

root.querySelector(".show-xml").addEventListener("click", (event) => {
  const xml = itemsList.value;

  alert(xml);
});

root.querySelector(".sort-value").addEventListener("click", () => {
  let list1 = new Map();
  let title = list.values();

  title = Array.from(title);
  title.sort();

  for (let name of title) {
    for (let [key, value] of list) {
      if (name == value) {
        list1.set(key, value);
      }
    }
  }
  list = list1;
  showOutput();
});

root.querySelector(".sort-name").addEventListener("click", () => {
  let list1 = new Map();

  let titleName = list.keys();

  titleName = Array.from(titleName);

  titleName.sort();

  for (let name of titleName) {
    for (let [key, value] of list) {
      if (name == key) {
        list1.set(name, value);
      }
    }
  }

  list = list1;
  showOutput();
});

let showOutput = () => {
  itemsList.value = "";
  for (let [key, value] of list) {
    itemsList.value += key + " = " + value + "\n";
  }
};
