export default class Transaction {
  constructor(description, amount, type, category, date = new Date()) {
    this.description = description;
    this.amount = amount;
    this.type = type;
    this.date = new Date(date);
    this.id = crypto.randomUUID();
    this.category = category;
    this.notes = "";
    this.currency = "GBP";
    this.createdAt = new Date();
  }
}
