// const movieCards = document.querySelectorAll('.movie-card')
// const detailTitle = document.querySelector('#detail-title')

const detailTitle = document
  .querySelectorAll(".movie-card")
  .getElementsByClassName("detail-title");
const titleSection = document.querySelector("#title-section");

titleSection.textContent = detailTitle;
