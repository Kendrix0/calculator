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
        answer = parseFloat(num2);
    }
    pastNum = answer;
    return answer
}

function cleanse() {
    x = '';
    current.innerHTML = '0';
}

allClear.onclick = () => {
    history.innerHTML = ''
    cleanse();
    pastNum = '0'
    x = ''
    mode = 'none'
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
        current.innerHTML = x;
    }
})

operators.forEach(btn => {
    btn.onclick = () => {
        x = '';
        mode = btn.innerHTML;
        history.innerHTML = pastNum + btn.innerHTML;
    }
})

sign.onclick = () => {
    negX = parseFloat(answer) * -1;
    x = negX;
    current.innerHTML = x;
}

power.onclick = () => {
    current.innerHTML = x + '^';
}

evaluate.onclick = () => {;
    if (mode=='none') {
        history.innerHTML = x
    } else {
    history.innerHTML = pastNum + mode + x + '='
    }
    console.log(operate(pastNum, x));
    current.innerHTML = answer
}