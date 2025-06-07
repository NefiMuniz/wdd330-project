import { createAccountNav } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("account-nav");
  if (navContainer) {
    navContainer.appendChild(createAccountNav());
  }
});
