const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.evaluate');
const current = document.querySelector('.current');
const history = document.querySelector('.history');
const allClear = document.querySelector('.allClear');
const clear = document.querySelector('.clear');
const sign = document.querySelector('.sign');
const power = document.querySelector('.power');

let x = '';
let pastNum = '0';
let mode = 'none';
let answer = x;
let lastPressed = ''

function operate(num1, num2) {
    if (mode == 'power') {
        answer = (parseFloat(num1) ** parseFloat(num2));
        pastNum = answer;
        current.innerHTML = pastNum;
        convertToExponential()
    } else if (mode == '÷') {
        if (x == 0) {
            current.innerHTML = 'Error!'
        } else {
            answer = (parseFloat(num1) / parseFloat(num2));
            pastNum = answer;
            current.innerHTML = pastNum;
            convertToExponential()
        }
    } else if (mode == '×') {
        answer = (parseFloat(num1) * parseFloat(num2));
        pastNum = answer;
        current.innerHTML = pastNum;
        convertToExponential()
    } else if (mode == '+') {
        answer = (parseFloat(num1) + parseFloat(num2));
        pastNum = answer;
        current.innerHTML = pastNum;
        convertToExponential()
    } else if (mode == '-') {
        answer = (parseFloat(num1) - parseFloat(num2));
        pastNum = answer;
        current.innerHTML = pastNum;
        convertToExponential()
    } else {
        if (x == '') {
            answer = pastNum
            current.innerHTML = answer;
            convertToExponential()
        } else {
            answer = x;
            pastNum = x;
            current.innerHTML = answer;
        } 
    }
}

function cleanse() {
    x = '';
    current.innerHTML = '0';
    lastPressed = 'clear'
}

function updateHistory(e) {
    if (pastNum > 1000000) {
        displayPast = pastNum.toExponential(5)
    } else {
        displayPast = pastNum
    }
    if (mode=='none') {
        if (x === '') {
            history.innerHTML = displayPast
        } else {
            history.innerHTML = parseFloat(x)
        }
    } else {
        if (lastPressed == 'evaluate') {
            history.innerHTML = displayPast + ' ' + mode + ' ' + x + ' ='
        } else {
            if (mode == 'power') {
                history.innerHTML = displayPast + '^';
            } else {
                history.innerHTML = displayPast +' ' + e;
            }
        }
    }
}

function appendNumber(number) {
    if (lastPressed == 'evaluate' || lastPressed == 'clear') {
        x = '';
        lastPressed = 'operand'
        mode = 'none'
    }
    x += number
    if (x >= 1000000000) {
        displayX = parseFloat(x).toExponential(5).toString()
        current.innerHTML = displayX;
    } else {
        current.innerHTML = x; 
    }
    lastPressed = 'operand';
}

function setOperation(operator) {
    if (lastPressed == 'operator') {
        mode = operator;
        updateHistory(operator);
    } else {
        if (lastPressed != 'evaluate') {
            operate(pastNum, x)
        }
        x = '';
        mode = operator;
        lastPressed = 'operator';
        updateHistory(operator);
    }
}

function convertToExponential() {
    if (Math.abs(answer) >= 1000000000 || (Math.abs(answer) < 0.0000001) && answer != 0) {
        displayX = parseFloat(answer).toExponential(5).toString();
        current.innerHTML = displayX;
    } else {
        current.innerHTML = answer; 
    }
};

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
}

function deleteNumber() {
    if (!(x.length > 1) || ((x[0]=='-') && (x.length <= 2))) {
        x = '';
        current.innerHTML = 0;
    } else {
        newX = x.slice(0,-1);
        x = newX
        current.innerHTML = newX;
    }
}

function evaluate() {
    lastPressed = 'evaluate';
    updateHistory(evaluate);
    operate(pastNum, x);
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendNumber(e.key)
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') cleanse()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
}

allClear.onclick = () => {
    history.innerHTML = ''
    cleanse();
    pastNum = '0'
    mode = 'none'
    answer = x;
}

clear.onclick = () => {
    cleanse();
}

window.addEventListener('keydown', (e) => {
    handleKeyboardInput(e)
})

operands.forEach(btn => {
    btn.onclick = () => {
        appendNumber(btn.innerHTML)
    }
})

operators.forEach(btn => {
    btn.onclick = () => {
        setOperation(btn.innerHTML)
    }
})

sign.onclick = () => {
    if ((current.innerHTML === x.toString()) || lastPressed == 'operator') {
        if (x=='') {
            x += '-'
        } else {
            x = parseFloat(x) * -1;
        }
        current.innerHTML = x
    } else {
        pastNum *= -1;
        current.innerHTML = pastNum;
    }
}

power.onclick = () => {
    if (lastPressed != 'evaluate') {
        operate(pastNum, x)
    }
    x = '';
    mode = 'power';
    lastPressed = 'operator';
    updateHistory(power);
}

equals.onclick = () => {;
    evaluate()
}