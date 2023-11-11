const numberList = Array.from(document.querySelectorAll('.number'));
const equalSign = document.querySelector('.equal-sign');
const operator = document.querySelectorAll('.operator')
const display = document.querySelector('.display');
const clr = document.querySelector('.clr');
const themeBtn = document.querySelector('.theme-btn');
const theme = document.querySelectorAll('.theme');
let currentTheme = localStorage.getItem('theme');
let clearDisplay = false;
let arithemethicOperator;
let themeChoice;
let selectedNumber;
let firstNumber = '';
let secondNumber = '';

setTheme(currentTheme);

numberList.forEach(item => {
    item.addEventListener('click', () => {
        display.classList.remove('error')
        selectedNumber = parseInt(item.textContent);
        if (clearDisplay) { 
            display.textContent = selectedNumber.toString();
            clearDisplay = false;
        } else {     
            display.textContent += selectedNumber.toString();
        }    
    })
})

operator.forEach(item => {
    item.addEventListener('click', () => {
        clearDisplay = true;
        firstNumber = parseInt(display.textContent);
        console.log(firstNumber)
        arithemethicOperator = item.getAttribute('data-sign')
        console.log(arithemethicOperator)
    })
})

equalSign.addEventListener('click', () => {
    let result;
    secondNumber = parseInt(display.textContent);
    try {
        if (arithemethicOperator === 'plus') {
            result = firstNumber + secondNumber;
        } else if(arithemethicOperator === 'minus') {
            result = firstNumber - secondNumber;
        } else if (arithemethicOperator === 'divide') {
            if (secondNumber == 0) {
                throw new Error('Error!')
            } else {
                result = firstNumber/secondNumber;
            }
        } else if (arithemethicOperator === 'multiply') {
            result = firstNumber * secondNumber;
        }
    } catch (error) {
        console.log(error)
        display.textContent = (error.message)
        display.classList.add('error');
    }
    
    if (result) {
        display.textContent = result.toString();
    }
   
    clearDisplay = true;
})


clr.addEventListener('click', () => {
    display.classList.remove('error')
    display.textContent = '';
    firstNumber = '';
    secondNumber = '';
})

themeBtn.addEventListener('click', () => {
    themeBtn.classList.add('active');
})


theme.forEach(item => {
    item.addEventListener('click', () => {
        themeChoice = item.getAttribute('data-theme');
        setTheme(themeChoice);
        themeBtn.classList.remove('active');
    })
})

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
}