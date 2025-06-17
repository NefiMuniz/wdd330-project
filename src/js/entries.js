import { qs } from "./utils.mjs";
import { convertCurrency } from "./currency.mjs";
import Budget from "./budget.mjs";
import Transaction from "./transaction.mjs";

// const entriesKey = "finhome-entries";
// const balanceElement = qs("#balance");
const balanceGBP = qs("#balance-gbp");
const balanceAUD = qs("#balance-aud");
const entriesList = qs("#entries");
const form = qs("#entry-form");
const categorySelect = qs("#category");
const budget = new Budget();

loadCategories();
qs("#type").addEventListener("change", loadCategories);

async function loadCategories() {
  try {
    const res = await fetch("../json/categories.json");
    const categories = await res.json();
    const type = qs("#type").value;

    categorySelect.innerHTML = "<option value=''>Select a category</option>";
    categories[type].forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  } catch (err) {
    console.error("Failed to load categories:", err);
  }
}

// Get saved entries
// let entries = getLocalStorage(entriesKey) || [];

// Render entries
async function renderEntries() {
  entriesList.innerHTML = "";
  let total = 0;

  budget.transactions.forEach((entry) => {
    const li = document.createElement("li");
    li.classList.add("fade-in");
    li.textContent = `${entry.type === "income" ? "+" : "-"} $${entry.amount.toFixed(2)} - [${entry.category}]: ${entry.description}`;
    entriesList.appendChild(li);

    total += entry.type === "income" ? entry.amount : -entry.amount;
  });

  // balanceElement.textContent = `$${total.toFixed(2)}`;
  balanceGBP.textContent = `£$${total.toFixed(2)}`;

  try {
    const converted = await convertCurrency("GBP", "AUD", total);
    balanceAUD.textContent = `A$${converted.toFixed(2)}`;
  } catch (err) {
    balanceAUD.textContent = "Conversion error";
    console.error(err);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = qs("#type").value;
  const description = qs("#description").value.trim();
  const amount = parseFloat(qs("#amount").value);
  const category = categorySelect.value;

  if (description && !isNaN(amount)) {
    const transaction = new Transaction(description, amount, type, category);
    budget.addTransaction(transaction);
    // setLocalStorage(entriesKey, entries);
    renderEntries();
    form.reset();
    loadCategories();
  }
});

renderEntries();
