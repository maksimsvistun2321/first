document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.height = '100vh';
document.body.style.backgroundColor = '#f0f0f0';
document.body.style.margin = '0';


const calculator = document.createElement('div');
// calculator.style.width = '500px';
// calculator.style.height = '800px'
// calculator.style.padding = '20px';
// calculator.style.backgroundColor = 'black';
// calculator.style.display = 'flex';
// calculator.style.flexDirection = 'column';
// calculator.style.alignItems = 'justify';
calculator.classList.add('calculator-body');
document.body.appendChild(calculator);


const display = document.createElement('input');
display.type = 'text';
display.readOnly = true;
display.style.width = '100%';
display.style.height = '80px';
display.style.alignSelf = 'center';
display.style.color = 'white';
display.style.backgroundColor = 'black';
display.style.fontSize = '70px';
display.style.textAlign = 'right';
display.style.padding = '10px';
display.style.border = '1px solid black';
display.style.borderRadius = '5px';
display.style.marginBottom = '20px';
calculator.appendChild(display);


const buttonsContainer = document.createElement('div');
buttonsContainer.style.height = '75%';
buttonsContainer.style.display = 'grid';
buttonsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
buttonsContainer.style.gap = '10px';
buttonsContainer.classList.add('buttons-container')
calculator.appendChild(buttonsContainer);


const buttons = [
    'AC', '+/-', '%',  '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
];

buttons.forEach(text => {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.height = '75px';
    button.style.width = '75px';
    button.style.fontSize = '25px';
    button.style.color = 'white';
    button.style.border = '1px solid #3E3A3A';
    button.style.borderRadius = '50%';
    // button.style.backgroundColor = '#3E3A3A';
    button.style.backgroundColor = ['/', '*', '-', '+', '='].includes(text) ? '#ffa500' : '#3E3A3A';
    button.style.cursor = 'pointer';
    if (text === '0') {
        button.style.gridColumn = 'span 2';
    }
    if (text === 'AC' || text === '+/-' || text === '%') {
        button.style.backgroundColor = '#958686';
    }
    button.addEventListener('click', () => onButtonClick(text));
    buttonsContainer.appendChild(button);
});



let currentInput = '';
let operator = '';
let firstValue = '';
let secondValue = '';
let result = '';

function onButtonClick(text) {
    if (text === '=') {
        secondValue = currentInput;
        currentInput = '';
        calculateResult();
        display.value = result;
    } else if (['/', '*', '-', '+', '%'].includes(text)) {
        if (firstValue && currentInput) {
            secondValue = currentInput;
            calculateResult();
            firstValue = result;
            currentInput = '';
        } else {
            firstValue = currentInput;
            currentInput = '';
        }
        operator = text;
    } else {
        currentInput += text;
        display.value = currentInput;
    }
    if (text === 'AC') {
        currentInput = '';
        operator = '';
        firstValue = '';
        secondValue = '';
        result = '';
        display.value = '';
    }
}

function calculateResult() {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);
    switch (operator) {
        case '/':
            result = num1 / num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '+':
            result = num1 + num2;
            break;
        case '%':
            result = num1 * (num2 / 100);
            break;
    }
    firstValue = '';
    secondValue = '';
    operator = '';
}

const style = document.createElement('style');
style.textContent = `
.calculator-body {
    width: 500px;
    height: 100%;
    padding: 20px;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: justify;
}

@media (max-width: 1024px) {
    .calculator-body {
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .buttons-container{
        width: 100%;
    }
    .buttons{
        width:100px;
    }
}
`;
document.head.appendChild(style);