const inputDisplay = document.getElementById('Input_container');
const prevOpDisplay = document.getElementById('previous_op');
const sciKeys = document.getElementById('sci-keys');
const toggleSci = document.getElementById('toggle-sci');

let currentExpression = '';
let isScientificOpen = false;

// Toggle Scientific Mode
toggleSci.addEventListener('click', () => {
    isScientificOpen = !isScientificOpen;
    sciKeys.classList.toggle('active');
    toggleSci.textContent = isScientificOpen ? 'Hide' : 'Show';
});

// Append regular values
function appendValue(value) {
    if (value === '*' ) {
        currentExpression += '*';
        inputDisplay.value += '×';
    } else if (value === '/') {
        currentExpression += '/';
        inputDisplay.value += '÷';
    } else {
        currentExpression += value;
        inputDisplay.value += value;
    }
}

// Append scientific functions
function appendSci(fn) {
    currentExpression += fn;
    inputDisplay.value += fn;
}

// Clear display
function clearDisplay() {
    currentExpression = '';
    inputDisplay.value = '';
    prevOpDisplay.textContent = '';
}

// Delete last character
function deleteLast() {
    currentExpression = currentExpression.slice(0, -1);
    inputDisplay.value = inputDisplay.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        if (!currentExpression) return;

        // Save original for history display
        const originalInput = inputDisplay.value;
        
        // Prepare expression for evaluation
        let evalExpression = currentExpression
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/pow\(/g, 'Math.pow(')
            .replace(/π/g, 'Math.PI')
            .replace(/e/g, 'Math.E');

        // Note: For trig functions, we should probably handle Degrees vs Radians.
        // For simplicity here, we use Radians (as Math.sin does).
        
        const result = eval(evalExpression);
        
        // Handle precision issues (e.g., 0.1 + 0.2)
        const formattedResult = Number(result.toFixed(8)).toString();
        
        prevOpDisplay.textContent = originalInput + ' =';
        inputDisplay.value = formattedResult;
        currentExpression = formattedResult;
        
    } catch (error) {
        inputDisplay.value = 'Error';
        setTimeout(clearDisplay, 1500);
    }
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (/[0-9]/.test(key)) appendValue(key);
    if (key === '.') appendValue('.');
    if (key === '+') appendValue('+');
    if (key === '-') appendValue('-');
    if (key === '*') appendValue('*');
    if (key === '/') appendValue('/');
    if (key === '%') appendValue('%');
    if (key === '(') appendValue('(');
    if (key === ')') appendValue(')');
    if (key === 'Enter' || key === '=') calculate();
    if (key === 'Backspace') deleteLast();
    if (key === 'Escape') clearDisplay();
});
