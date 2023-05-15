const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const inputNode = document.querySelector("#expenseInput");
const addButtonNode = document.querySelector("#addButton");
const clearButtonNode = document.querySelector("#clearButton");
const limitNode = document.querySelector("#limitValue");
const totalValueNode = document.querySelector("#totalValue");
const statusNode = document.querySelector("#statusText");
const historyList = document.querySelector("#historyList");
const taskSelect = document.querySelector("#taskSelect");
const openButtonNode = document.querySelector("#openButton");
const popap = document.querySelector("#popap");
const closeButtonNode = document.querySelector("#closeButton");
const changeButtonNode = document.querySelector("#changeButton");
const limitInputNode = document.querySelector("#limitInput");

let expenses = [];

let limit = parseInt(limitNode.innerText);

const getLimitFromUser = () => parseInt(limitInputNode.value);
const getExpenseFromUser = () => parseInt(inputNode.value);
const getExpenseTypeFromUser = () => taskSelect.value;

const changeButtonHandler = () => {
  limit = getLimitFromUser();
  getLimitText();
  render();
  clearLimitInput();
}

const getLimitText = () => {
  limitNode.innerText = limit;
}

const addButtonHandler = () => {
  const type = getExpenseTypeFromUser();
  const expense = getExpenseFromUser();
  if (!expense) {
    return;
  }

  expenses.push({
    expense: expense,
    type: type,
  });

  render();
  clearInput();
}

const clearLimitInput = () => {
  limitInputNode.value = "";
};

const clearInput = () => {
  inputNode.value = "";
};

const renderHistory = () => {
  historyList.innerHTML = "";
  expenses.forEach((expense) => {
    const historyItem = document.createElement("li");
    historyItem.innerText = `${expense.expense} руб. - ${expense.type}`;
    historyList.appendChild(historyItem);
  });
};


const getTotal = () => {
  let sum = 0;
  expenses.forEach((expense) => {
    sum += expense.expense;
  });
  return sum;
};

const renderStatus = () => {
  const total = getTotal();
  totalValueNode.innerText = total;

  if (total <= limit) {
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.classList.remove("status-color_red");
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${total - limit} руб)`;
    statusNode.classList.add("status-color_red");
  }
};

const render = () => {
  renderStatus();
  renderHistory();
};

const clearButtonHandler = () => {
  expenses = [];
  render();
};

const openButtonHandler = () => {
  popap.classList.add("display");
};

const closeButtonHandler = () => {
  popap.classList.remove("display");
};

addButtonNode.addEventListener("click", addButtonHandler);
clearButtonNode.addEventListener("click", clearButtonHandler);
openButtonNode.addEventListener("click", openButtonHandler);
closeButtonNode.addEventListener("click", closeButtonHandler);
changeButtonNode.addEventListener("click", changeButtonHandler);
