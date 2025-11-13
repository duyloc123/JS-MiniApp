const typeExpense = document.getElementById('selectExpense');
const inputTransaction = document.getElementById('transactionName');
const inputAmount = document.getElementById('inputAmount');
const addTransaction = document.getElementById('btn__addTransaction');
const listTransaction = document.getElementById('transactionList');
const blance = document.getElementById('blanceText');
const sumIncome = document.getElementById('incomeText');
const showEx = document.getElementById('expenseText');
const loading = document.getElementById('loading');

function initliAppTrakcer() {
    data =  JSON.parse(window.localStorage.getItem("data")) || [];
    showWallet();
    showExpense();
    showIncome();
    renderData(data);
}

let wallet;
let income;
let expense;
let data;

function renderData(dataSource) {
    listTransaction.innerHTML = "";
    dataSource.forEach((item) => {
        const liElement = document.createElement("li");
        liElement.style.paddingTop = "30px";
        const divTransaction = document.createElement("div");
        divTransaction.innerHTML = "Name:";
        divTransaction.style.fontWeight = "800";
        const transactionElement = document.createElement('p');
        transactionElement.setAttribute('class','transactionName');
        transactionElement.innerHTML = `${item.transaction__name}`;
        const divAmount = document.createElement("div");
        divAmount.innerHTML = "Amount:";
        divAmount.style.fontWeight = "800";
        const amountElement = document.createElement('p');
        amountElement.setAttribute('class','transactionAmout');
        amountElement.innerHTML = `${item.amount}$`;
        const spendingElement = document.createElement('p');
        spendingElement.setAttribute('class','spending');
        spendingElement.setAttribute('id','spending');
        spendingElement.style.textAlign = "center";
        const deleteExpense = document.createElement('button');
        deleteExpense.setAttribute("class","btn__deleteTransaction");
        deleteExpense.innerHTML = "Delete Transaction";
        deleteExpense.addEventListener('click', () => {
             deleteItem(item.id);
        });

        if(item.status === "Expense") {
            spendingElement.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
            spendingElement.innerHTML = item.status;
        } else {
            spendingElement.style.backgroundColor = "rgba(37, 104, 245, 0.8)";
            spendingElement.innerHTML = item.status;
        }

        wallet = income - expense;
        const prices = formatPrice(wallet);
        blance.innerHTML = `${prices.toLocaleString()}$`;

        listTransaction.appendChild(liElement);
        liElement.appendChild(divTransaction);
        liElement.appendChild(divAmount);
        divTransaction.appendChild(transactionElement);
        divAmount.appendChild(amountElement);
        liElement.appendChild(spendingElement);
        liElement.appendChild(deleteExpense);
    });
};

// Button Add Transaction, button type expense

addTransaction.addEventListener('click', (event) => {
    event.preventDefault();
    btnAdd();
});

typeExpense.addEventListener('change', () => {
    optionExpense();
});

function btnAdd() {
        if(inputTransaction.value !== "" || inputAmount.value !== "") {
            if(typeExpense.value !== "") {
                loading.style.display = "block";
                listTransaction.style.opacity = "0.2";
                setTimeout(() => {
                    const newTransaction = {
                    id: data.length,
                    transaction__name: inputTransaction.value,
                    amount: Number(inputAmount.value),
                    status: typeExpense.value
                }
                    data.push(newTransaction);
                    showIncome();
                    showExpense();
                    renderData(data);
                    inputTransaction.value = "";
                    inputAmount.value = "";
                    window.localStorage.setItem("data", JSON.stringify(data));
                    loading.style.display = "none";
                    listTransaction.style.opacity = "1";
                },2000)
            } else {
                alert("Please select transaction information")
            };
        } else {
            alert("Please enter transaction information");
        }
}

function deleteItem(id) {
    loading.style.display = "block";
    listTransaction.style.opacity = "0.2";
    setTimeout(() => {
        const findIndex = data.findIndex(item => item.id === id);
        data.splice(findIndex, 1);
        showIncome();
        showExpense();
        showWallet();
        renderData(data);
        window.localStorage.setItem("data", JSON.stringify(data));
        loading.style.display = "none";
        listTransaction.style.opacity = "1";
    },2000)
}

function formatPrice(prices) {
    return Intl.NumberFormat(
        "en-US", {
            minimumFractionDigits: 2,
        }
    ).format(prices);
}

function optionExpense(){
    if(typeExpense.value === "Income") {
        const filter = data.filter(item => item.status === "Income");
        const sumIncome = filter.reduce((acc, cur) => {
            return acc += cur.amount;
        },0)
        income = sumIncome;
        renderData(filter);
    } else if(typeExpense.value === "Expense") {
        const filter = data.filter(item => item.status === "Expense");
        renderData(filter);
    } else {
        renderData(data);
    }
}

function showIncome() {
    const filterIncome = data.filter(item => item.status === "Income");
        const reduceIncome = filterIncome.reduce((acc, cur) => {
            return acc += cur.amount;
        },0)
        income = reduceIncome;
        const formatIncome = formatPrice(income);
        sumIncome.innerHTML = `${formatIncome.toLocaleString()}$`;

}

function showExpense() {
    const filterExpense = data.filter(item => item.status === "Expense");
        const sumExpense = filterExpense.reduce((acc, cur) => {
            return acc += cur.amount;
        },0)
        expense = sumExpense;
        const formatExpense = formatPrice(expense);
        showEx.innerHTML = `${formatExpense.toLocaleString()}$`;
}

function showWallet() {
    wallet = income - expense || 0;
    const prices = formatPrice(wallet);
    blance.innerHTML = `${prices.toLocaleString()}$`;
}

initliAppTrakcer();