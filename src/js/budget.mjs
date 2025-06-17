import Transaction from "./transaction.mjs";

export default class Budget {
  constructor() {
    this.transactions = this.loadTransactions();
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    this.saveTransactions();
  }

  get totalIncome() {
    return this.transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get totalExpenses() {
    return this.transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get balance() {
    return this.totalIncome - this.totalExpenses;
  }

  loadTransactions() {
    const data = JSON.parse(localStorage.getItem("transactions")) || [];
    return data.map(
      (t) =>
        new Transaction(t.description, t.amount, t.type, t.category, t.date),
    );
  }

  removeTransaction(id) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.saveTransactions();
  }

  saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }
}
