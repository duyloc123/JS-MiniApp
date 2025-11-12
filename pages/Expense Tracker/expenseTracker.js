const typeExpense = document.getElementById('type');
const inputTransaction = document.getElementById('transactionName');
const inputAmount = document.getElementById('inputAmount');
const addTransaction = document.getElementById('btn__addTransaction');
const listTransaction = document.getElementById('transactionList');

function initliAppTrakcer() {
    renderData(data);
}

let data = [
    {
        id: 1,
        transaction__name: "Buy Coffee",
        amount: 5
    }
];

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
        spendingElement.innerHTML = "Spending";
        const deleteExpense = document.createElement('button');
        deleteExpense.setAttribute("class","btn__deleteTransaction");
        deleteExpense.innerHTML = "Delete Transaction";
        deleteExpense.addEventListener('click', () => deleteItem(item.id));

        listTransaction.appendChild(liElement);
        liElement.appendChild(divTransaction);
        liElement.appendChild(divAmount);
        divTransaction.appendChild(transactionElement);
        divAmount.appendChild(amountElement);
        liElement.appendChild(spendingElement);
        liElement.appendChild(deleteExpense);
    });
};

addTransaction.addEventListener('click', (event) => {
    event.preventDefault();
    btnAdd();
});

function btnAdd() {
    if(inputTransaction.value !== "" || inputAmount.value !== "") {
        const newTransaction = {
            id: data.length,
            transaction__name: inputTransaction.value,
            amount: Number(inputAmount.value)
        }
        data.push(newTransaction);
        renderData(data);
    } else {
        alert("Please enter transaction information");
    }
}

function deleteItem(id) {
    const findIndex = data.findIndex(item => item.id === id);
    data.splice(findIndex, 1);
    renderData(data);
}

initliAppTrakcer();