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
        if (lastPressed = 'evaluate') {
            history.innerHTML = displayPast + mode + x + '='
        } else {
            if (mode == 'power') {
                history.innerHTML = displayPast + '^';
            } else {
                history.innerHTML = displayPast + e.innerHTML;
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
            nums[1] = parseFloat(x);
        } else {
            newX = parseFloat(x.toString().slice(0,-1));
            x = newX
            current.innerHTML = newX;
            nums[1] = parseFloat(newX);
        }
    } else {
        return
    }
})

operands.forEach(btn => {
    btn.onclick = () => {
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
        if (lastPressed != 'evaluate') {
            operate(pastNum, x)
        }
        x = '';
        mode = btn.innerHTML;
        equalsPressed = 'operator';
        updateHistory(btn);
    }
})

sign.onclick = () => {
    if (!equalsPressed) {
        
    }
    negX = parseFloat(answer) * -1;
    x = negX;
    current.innerHTML = x;
}

power.onclick = () => {
    if (lastPressed != 'evaluate') {
        operate(pastNum, x)
    }
    x = '';
    mode = 'power';
    equalsPressed = false;
    updateHistory(power);
}

evaluate.onclick = () => {;
    lastPressed = 'evaluate';
    updateHistory(evaluate);
    operate(pastNum, x);
    if (answer >= 1000000000) {
        displayX = parseFloat(answer).toExponential(5).toString();
        current.innerHTML = displayX;
    } else {
       current.innerHTML = answer; 
    }
    
}

// Need to correct how the sign change button behaves
// Need to correct how operand entry behaves after evaluation (i.e evaluating 2+2
//      then going straight into 4+5 should not display 24 then 5)

// Need to correct pastNum behavior after pressing AC then operator(i.e AC -> 5 -> +
//      should not display 0+... in history)

// Need to correct updateHistory function so that it does not display
//      pastNum operand x when x = '' (i.e 5+= since x is blank).