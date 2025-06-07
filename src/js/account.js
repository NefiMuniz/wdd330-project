import { getDailyQuote } from "../js/utils.mjs";

async function renderDailyQuote() {
  const quoteContainer = document.getElementById("quote-container");
  try {
    const { quote, author } = await getDailyQuote();
    quoteContainer.innerHTML = `
      <blockquote>
        “${quote}”
        <footer>— ${author}</footer>
      </blockquote>
    `;
  } catch (error) {
    quoteContainer.textContent =
      "Sorry, we couldn't load the quote at the moment.";
  }
}

renderDailyQuote();
