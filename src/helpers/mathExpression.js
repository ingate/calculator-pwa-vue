function appendToExpression(expression, char) {
    const digitChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operatorChars = ['-', '+', '×', '÷'];
    const lastChar = expression.substring(expression.length - 1);

    let result = '';
    switch (expression.length) {
        case 0:
            // which key is pressed?
            if (digitChars.includes(char) || char === '-') {
                result = char;
            } else if (char === '.') {
                result = '0.';
            } else {
                result = '0';
            }
            break;

        case 1:
            if (expression === '0') {
                // if there are '0' zero in expression
                if (digitChars.includes(char)) {
                    // replace zero with digit
                    result = char;
                } else if (char === '-') {
                    // replace zero to minus
                    result = '-';
                } else {
                    result = '0';
                }
            } else if (expression === '-' && ['-', '+'].includes(char)) {
                // replace '-' to '0' by pressing '+' or '-'
                result = '0';
            } else {
                result = '' + expression + char;
            }
            break;

        default:
            // which key pressed?
            if (operatorChars.includes(char)) {
                // operator is pressed
                if (lastChar === '.') {
                    // don't add operator after point '.'
                    result = expression;
                } else if (lastChar === char) {
                    // don't duplicate operators
                    result = expression;
                } else if (
                    operatorChars.includes(lastChar) &&
                    lastChar !== char
                ) {
                    // allow replace operators
                    result =
                        '' +
                        expression.substring(0, expression.length - 1) +
                        char;
                } else {
                    // append operator
                    result = '' + expression + char;
                }
            } else if (char === '.') {
                // point is pressed
                const lastNumber = expression.match(/(.*[-+/*])?(.*)/)
                    ? expression.match(/(.*[-+/*])?(.*)/)[2]
                    : expression;
                if (lastNumber && lastNumber.includes('.')) {
                    // don't duplicate point delimeter in last number (.)
                    result = expression;
                } else if (operatorChars.includes(lastChar)) {
                    // don't add point after operator
                    result = expression;
                } else {
                    // append point
                    result = '' + expression + char;
                }
            } else {
                // append char to expression
                result = '' + expression + char;
            }
            break;
    }
    return result;
}

function evaluateExpression(expression) {
    let result;
    try {
        // replace nice operators with native
        let native = expression
            .toString()
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        const lastChar = native.substring(native.length - 1);
        // if last char is operator or point, process without this char
        if (['-', '+', '*', '/', '.'].includes(lastChar)) {
            native = native.substring(0, native.length - 1);
        }
        result = eval(native);
        // replace non numbers (like 'undefined') with NaN
        if (isNaN(result)) {
            result = NaN;
        }
    } catch (e) {
        result = NaN;
    }
    return result;
}

export { appendToExpression, evaluateExpression };
