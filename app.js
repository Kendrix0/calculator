const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const evaluate = document.querySelector('.evaluate');
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
    } else if (mode == '÷') {
        answer = (parseFloat(num1) / parseFloat(num2));
    } else if (mode == '×') {
        answer = (parseFloat(num1) * parseFloat(num2));
    } else if (mode == '+') {
        answer = (parseFloat(num1) + parseFloat(num2));
    } else if (mode == '-') {
        answer = (parseFloat(num1) - parseFloat(num2));
    } else {
        answer = parseFloat(num2 || num1);
    }
    pastNum = answer;
    current.innerHTML = pastNum
    return answer
}

function cleanse() {
    x = '';
    current.innerHTML = '0';
    lastPressed = ''
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
                history.innerHTML = displayPast +' ' + e.innerHTML;
            }
        }
    }
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
    x = x.toString();
    if (e.keyCode == 8) {
        if (!(x.length > 1) || ((x[0]=='-') && (x.length <= 2))) {
            x = '';
            current.innerHTML = 0;
        } else {
            newX = x.slice(0,-1);
            x = newX
            current.innerHTML = newX;
        }
    } else {
        return
    }
})

operands.forEach(btn => {
    btn.onclick = () => {
        if (lastPressed == 'evaluate') {
            x = '';
            lastPressed = 'operand'
            mode = 'none'
        }
        x += btn.innerHTML
        if (x >= 1000000000) {
            displayX = parseFloat(x).toExponential(5).toString()
            current.innerHTML = displayX;
        } else {
           current.innerHTML = x; 
        }
    }
    lastPressed = 'operand'
})

operators.forEach(btn => {
    btn.onclick = () => {
        if (lastPressed == 'operator') {
            mode = btn.innerHTML;
            updateHistory(btn);
        } else {
            if (lastPressed != 'evaluate') {
            operate(pastNum, x)
            }
            x = '';
            mode = btn.innerHTML;
            lastPressed = 'operator';
            updateHistory(btn);
        }
    }
})

sign.onclick = () => {
    if ((current.innerHTML === x) || lastPressed == 'operator') {
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

evaluate.onclick = () => {;
    lastPressed = 'evaluate';
    updateHistory(evaluate);
    operate(pastNum, x);
    if (Math.abs(answer) >= 1000000000 || (Math.abs(answer) < 0.0000001) && answer != 0) {
        displayX = parseFloat(answer).toExponential(5).toString();
        current.innerHTML = displayX;
    } else {
       current.innerHTML = answer; 
    }
    
}