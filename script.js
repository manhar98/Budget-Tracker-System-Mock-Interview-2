let totalBudget = 0;
let expenses = [];

function addBudget() {
    const budgetInput =
        document.getElementById("budgetInput");
    const budget =
        Number(budgetInput.value);
    if (budget <= 0 || isNaN(budget)) {
        alert("Please enter a valid budget.");
        return;
    }
    totalBudget += budget;
    budgetInput.value = "";
    updateUI();
}

function addExpense() {

    const titleInput =
        document.getElementById("expenseTitle");
    const amountInput =
        document.getElementById("expenseAmount");
    const title =
        titleInput.value.trim();
    const amount =
        Number(amountInput.value);
    if (title === "") {
        alert("Please enter expense title.");
        return;
    }
    if (amount <= 0 || isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }
    const expense = {
        id: Date.now(),
        title: title,
        amount: amount
    };
    expenses.push(expense);
    titleInput.value = "";
    amountInput.value = "";
    updateUI();
}

function removeExpense(id) {

    expenses = expenses.filter(
        function(expense) {
            return expense.id !== id;
        }
    );
    updateUI();
}

function getTotalExpense() {

    let total = 0;
    expenses.forEach(
        function(expense) {
            total += expense.amount;
        }
    );
    return total;
}

function updateUI() {
    const totalExpense =
        getTotalExpense();
    const budgetLeft =
        totalBudget - totalExpense;
    document.getElementById("totalBudget")
        .textContent =
        totalBudget.toFixed(2);
    document.getElementById("totalExpense")
        .textContent =
        totalExpense.toFixed(2);
    document.getElementById("budgetLeft")
        .textContent =
        budgetLeft.toFixed(2);
    const expenseList =
        document.getElementById("expenseList");
    expenseList.innerHTML = "";
    expenses.forEach(
        function(expense) {
            const row =
                document.createElement("tr");
            row.innerHTML = `
                <td>
                    ${expense.title}
                </td
                <td>
                    ${expense.amount.toFixed(2)}
                </td>
                <td
                    <button
                        class="remove-btn"
                        onclick="removeExpense(${expense.id})"
                    >
                        Remove
                    </button>
                </td>
            `;
            expenseList.appendChild(row);
        });
}

function resetAll() {
    const confirmReset =
        confirm(
            "Are you sure you want to reset everything?"
        );
    if (!confirmReset) {
        return;
    }

    totalBudget = 0;
    expenses = [];
    document.getElementById("budgetInput")
        .value = "";
    document.getElementById("expenseTitle")
        .value = "";
    document.getElementById("expenseAmount")
        .value = "";
    updateUI();
}

updateUI();