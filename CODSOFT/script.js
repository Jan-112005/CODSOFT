const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // Stores the current number being entered
let firstOperand = null; // Stores the first operand
let operator = null; // Stores the operator

// Add event listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "C") {
            // Reset everything
            currentInput = "";
            firstOperand = null;
            operator = null;
            updateDisplay("0");
        } else if (value === "=") {
            if (firstOperand !== null && operator !== null && currentInput !== "") {
                // Perform the calculation
                const secondOperand = parseFloat(currentInput);
                const result = calculate(firstOperand, secondOperand, operator);
                updateDisplay(result);
                firstOperand = result; // Save the result for further operations
                operator = null; // Clear the operator
                currentInput = ""; // Clear current input
            }
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput !== "") {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput); // Set first operand
                } else if (operator) {
                    // Perform operation for chained calculations
                    firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
                    updateDisplay(firstOperand);
                }
                operator = value; // Save the operator
                currentInput = ""; // Clear the current input for the next number
            }
        } else {
            // Append number or decimal point to current input
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Update the calculator display
function updateDisplay(value) {
    display.textContent = value;
}

// Perform the calculation
function calculate(a, b, op) {
    switch (op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b !== 0 ? a / b : "Error"; // Prevent division by zero
        default:
            return 0;
    }
}
