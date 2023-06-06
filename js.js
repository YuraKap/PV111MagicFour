var transactionForm = document.getElementById("transaction-form");
var transactionTypeSelect = document.getElementById("transaction-type");
var transactionAmountInput = document.getElementById("transaction-amount");
var transactionCurrencySelect = document.getElementById("transaction-currency");
var transactionWalletSelect = document.getElementById("transaction-wallet");
var transactionCategorySelect = document.getElementById("transaction-category");

var transactionFrame = document.getElementById("transaction-frame");



var incomeData = [];
var expenseData = [];

function populateWalletOptions() 
{
    var wallets = ["Wallet A", "Wallet B", "Wallet C"];
    for (var i = 0; i < wallets.length; i++) {
        var option = document.createElement("option");
        option.textContent = wallets[i];
        transactionWalletSelect.appendChild(option);
    }
}

function populateCategoryOptions() {
    var categories = ["Продукти", "Веселощі", "Пересування", "Оренда Житла"];
    for (var i = 0; i < categories.length; i++) {
        var option = document.createElement("option");
        option.textContent = categories[i];
        transactionCategorySelect.appendChild(option);
    }
}

function addTransaction(event) {
    event.preventDefault();
    var transactionType = transactionTypeSelect.value;
    var transactionAmount = parseFloat(transactionAmountInput.value);
    var transactionCurrency = transactionCurrencySelect.value;
    var transactionWallet = transactionWalletSelect.value;
    var transactionCategory = transactionCategorySelect.value;

    console.log("Transaction Type: " + transactionType);
    console.log("Amount: " + transactionAmount);
    console.log("Currency: " + transactionCurrency);
    console.log("Wallet: " + transactionWallet);
    console.log("Category: " + transactionCategory);

    transactionAmountInput.value = "";

    if (transactionType === "income") {
        incomeData.push(transactionAmount);
        expenseData.push(0);
    } else if (transactionType === "expense") {
        incomeData.push(0);
        expenseData.push(transactionAmount);
    }

    updateIncomeExpenseChart();
}


var incomeExpenseChart;

function updateIncomeExpenseChart() {
    if (incomeExpenseChart) {
        incomeExpenseChart.destroy();
    }

    incomeExpenseChart = new Chart("income-expense-chart", {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr"],
            datasets: [
                {
                    label: "Income",
                    backgroundColor: "rgba(20, 202, 12, 1)",
                    data: incomeData
                },
                {
                    label: "Expense",
                    backgroundColor: "rgba(255, 0, 0, 1)",
                    data: expenseData
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(0, 0, 0, 0.1)"
                    }
                }
            }
        }
    });
}

function init() {
    populateWalletOptions();
    populateCategoryOptions();
    updateIncomeExpenseChart();
}

transactionForm.addEventListener("submit", addTransaction);

init();