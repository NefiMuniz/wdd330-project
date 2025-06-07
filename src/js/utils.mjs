// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Dynamic navigation
export function createAccountNav() {
  const nav = document.createElement("nav");
  nav.className = "account-nav";

  const links = [
    { href: "/account/index.html", label: "🏠 Home" },
    { href: "/account/entries.html", label: "📝 Entries" },
    { href: "/account/report.html", label: "📊 Report" },
    { href: "/account/help.html", label: "❓ Help" }
  ];

  const currentPath = window.location.pathname;

  const listItems = links.map(link => {
    const isActive = currentPath.endsWith(link.href);
    return `
      <li>
        <a href="${link.href}" class="nav-link${isActive ? " active" : ""}">
          ${link.label}
        </a>
      </li>
    `;
  }).join("");

  nav.innerHTML = `<ul>${listItems}</ul>`;
  return nav;
}

// Quote API
export async function getDailyQuote() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quote from API Ninjas");
  }

  const data = await response.json();
  return {
    quote: data[0].quote,
    author: data[0].author,
  };
}

