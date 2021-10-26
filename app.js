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
let expression = [0,''];

function operate(operands, operator) {
    return operands[0]
}

function cleanse() {
    x = '';
    current.innerHTML = '0';
    expression.splice(0,2,x)
}

allClear.onclick = () => {
    history.innerHTML = ''
    cleanse();
    expression = [0, '', ''];
}

clear.onclick = () => {
    cleanse();
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 8) {
        if (-1 < x/10 && x/10 < 1) {
            x = 0;
            current.innerHTML = x;
            expression.splice(0,1,Number(x));
        } else {
            newX = parseFloat(x.toString().slice(0,-1));
            x = newX
            current.innerHTML = newX;
            expression.splice(0,1,Number(newX))
        }

    }
})

operands.forEach(btn => {
    btn.onclick = () => {
        x += btn.innerHTML
        current.innerHTML = x;
        expression.splice(0,1,Number(x))
    }
})

operators.forEach(btn => {
    btn.onclick = () => {
        history.innerHTML = x + btn.innerHTML;
        expression.splice(0,1,x);
        x = ''
        if (expression[1] !== '') {
            operate(expression, btn.innerHTML)
        }
    }
})

sign.onclick = () => {
    negX = parseFloat(Number(x) * -1);
    x = negX;
    expression.splice(0,1,negX);
    current.innerHTML = negX;
}

power.onclick = () => {
    expression.splice(1,1, '**');
    current.innerHTML = x + '^';
}

evaluate.onclick = () => {
    history.innerHTML = operate(expression);
    console.log(operate(expression))
}