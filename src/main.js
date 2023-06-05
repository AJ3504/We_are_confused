import { showMovies } from "./showMovies.js";
import { sortMovies } from "./sortMovies.js";

showMovies();

const searchInput = document.querySelector("#search-input");
searchInput.focus();

const form = document.querySelector("#search-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sortMovies(searchInput);
});
