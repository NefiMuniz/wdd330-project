import {
  qs,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";
import { convertCurrency } from "./currency.mjs";

const entriesKey = "finhome-entries";
// const balanceElement = qs("#balance");
const balanceGBP = qs("#balance-gbp");
const balanceAUD = qs("#balance-aud");
const entriesList = qs("#entries");
const form = qs("#entry-form");

// Get saved entries
let entries = getLocalStorage(entriesKey) || [];

// Render entries
async function renderEntries() {
  entriesList.innerHTML = "";
  let total = 0;

  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.type === "income" ? "+" : "-"} $${entry.amount.toFixed(2)} - ${entry.description}`;
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

  if (description && !isNaN(amount)) {
    entries.push({ type, description, amount });
    setLocalStorage(entriesKey, entries);
    renderEntries();
    form.reset();
  }
});

renderEntries();
