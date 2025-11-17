const number = document.querySelectorAll('.number');
const themeSwitch = document.getElementById('switch');
const checkBox = document.getElementById('checkbox');
const inputNumber = document.getElementById('inputNumber');

checkBox.addEventListener('click', () => {
    themeSwitch.classList.toggle('active');
    !checkBox.checked ? document.body.style.backgroundColor = "#e8e8e8" : document.body.style.backgroundColor = "#212121";
});


let currentNumber = "";
let previousNumber = "";

let result = "";
let operator = ""

function initCalculationApp() {
    number.forEach(item => {
        item.addEventListener('click',() => {
            const value = item.dataset.value;
            if(value) {
                currentNumber += value;
                inputNumber.value = currentNumber;
                return;
            }
            switch(item.id) {
                case "btnAddNumber":
                    excuteMethod("+");
                break;
                case "btnSubtraction":
                    excuteMethod("-");
                break;
                case "btnMultiplication":
                    excuteMethod("x");
                break;
                case "btnDivision":
                    excuteMethod("/");
                break;
                case "btnClear" :
                    inputNumber.value = "";
                    currentNumber = "";
                    previousNumber = "";
                    result = "";
                break;
                case "btnResult":
                    if(currentNumber && previousNumber && operator) {
                        result = calculation(previousNumber,currentNumber,operator);
                        inputNumber.value = result;
                        currentNumber = String(result);
                        previousNumber = "";
                        operator = "";
                    } 
                default: return ;
            }
        });
    });

}

function excuteMethod(op) {
    if(currentNumber && previousNumber && operator) {
        result = calculation(previousNumber,currentNumber,operator);
        inputNumber.value = result;
        previousNumber = String(result);
    } else if(currentNumber) {
        previousNumber = currentNumber;
    } else {
        return;
    };
    operator = op;
    currentNumber = "";
}

function calculation(a,b,op) {
    const numA = Number(a);
    const numB = Number(b);

    switch(op) {
        case "+":
            return numA + numB;
        case "-":
            return numA - numB;
        case "x":
            return numA * numB;
        case "/":
            return numA / numB;
        default: return 0; 
    }
}

initCalculationApp();


