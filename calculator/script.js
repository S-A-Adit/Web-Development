// Basic math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
    if (b === 0) {
        currentDisplayValue = "Really? ÷0?";
        setTimeout(clearCalculator, 1500);
        return NaN;
    }
    return a / b; 
}

// Calculator state variables
let firstNumber = null;
let operator = null;
let currentDisplayValue = '0';
let shouldResetDisplay = false;
let lastInputWasOperator = false;

// DOM elements
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equals');
const backspaceButton = document.querySelector('.backspace');

// Initialize display
updateDisplay();

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => handleOperator(button.textContent));
});

equalButton.addEventListener('click', calculate);
decimalButton.addEventListener('click', appendDecimal);
clearButton.addEventListener('click', clearCalculator);
backspaceButton.addEventListener('click', backspace);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    else if (e.key === '.') appendDecimal();
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const opMap = {'*': '×', '/': '÷'};
        handleOperator(opMap[e.key] || e.key);
    }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape') clearCalculator();
    else if (e.key === 'Backspace') backspace();
});

// Display function
function updateDisplay() {
    display.textContent = currentDisplayValue;
    // Disable decimal button if there's already a decimal point
    decimalButton.disabled = currentDisplayValue.includes('.');
}

// Number input handler
function appendNumber(number) {
    if (shouldResetDisplay) {
        currentDisplayValue = '0';
        shouldResetDisplay = false;
    }
    
    if (currentDisplayValue === '0' && number !== '0') {
        currentDisplayValue = number;
    } else if (currentDisplayValue !== '0') {
        currentDisplayValue += number;
    }
    
    lastInputWasOperator = false;
    updateDisplay();
}

// Decimal point handler
function appendDecimal() {
    if (shouldResetDisplay) {
        currentDisplayValue = '0.';
        shouldResetDisplay = false;
        updateDisplay();
        return;
    }
    
    if (!currentDisplayValue.includes('.')) {
        currentDisplayValue += '.';
        updateDisplay();
    }
    lastInputWasOperator = false;
}

// Backspace function
function backspace() {
    if (shouldResetDisplay) return;
    
    if (currentDisplayValue.length === 1) {
        currentDisplayValue = '0';
    } else {
        currentDisplayValue = currentDisplayValue.slice(0, -1);
    }
    updateDisplay();
}

// Operator handler
function handleOperator(newOperator) {
    const inputValue = parseFloat(currentDisplayValue);
    
    if (firstNumber === null && !isNaN(inputValue)) {
        firstNumber = inputValue;
    } else if (operator && !lastInputWasOperator) {
        const result = operate(operator, firstNumber, inputValue);
        if (isNaN(result)) return; // Skip if division by zero
        
        currentDisplayValue = `${roundResult(result)}`;
        firstNumber = result;
        updateDisplay();
    }
    
    operator = newOperator;
    shouldResetDisplay = true;
    lastInputWasOperator = true;
}

// Calculation function
function calculate() {
    if (operator === null || firstNumber === null) return;
    
    const inputValue = parseFloat(currentDisplayValue);
    if (isNaN(inputValue)) return;
    
    const result = operate(operator, firstNumber, inputValue);
    if (isNaN(result)) return; // Skip if division by zero
    
    currentDisplayValue = `${roundResult(result)}`;
    firstNumber = null;
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// Rounding function to prevent overflow
function roundResult(num) {
    return parseFloat(num.toFixed(8));
}

// Clear function - complete reset
function clearCalculator() {
    currentDisplayValue = '0';
    firstNumber = null;
    operator = null;
    shouldResetDisplay = false;
    lastInputWasOperator = false;
    updateDisplay();
}

// Operation function
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
        default: return b;
    }
}