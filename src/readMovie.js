// 테스트용

const urlParams = new URL(location.href).searchParams;
const paramId = urlParams.get("id");
console.log(paramId);

const apiKey = "f31a9cbfb9fd2b34f7942a017d437954";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzFhOWNiZmI5ZmQyYjM0Zjc5NDJhMDE3ZDQzNzk1NCIsInN1YiI6IjY0NzA4OTQ1MTNhMzIwMDEzMzg2MDdhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IRZX6ubYrGSryWyuwy-pz7rwGMOmnbvU9PitigtZTcM",
  },
};
try {
  fetch(`https://api.themoviedb.org/3/movie/${paramId}?language=en-US`, options)
    .then((response) => response.json())
    .then((data) => {
      // 영화 정보 표시
      const movieTitle = data.title;
      const moviePoster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
      const movieOverview = data.overview;
      const movieVoteAverage = data.vote_average.toFixed(1);

      const movieDetailsContainer = document.getElementById("movie-details");

      const containerElement = document.createElement("div");
      containerElement.classList.add("movieDetail");

      const posterElementBox = document.createElement("div");
      posterElementBox.className = "moviePosterBox";

      const posterElement = document.createElement("img");
      posterElement.src = moviePoster;
      posterElement.alt = "영화 포스터";
      posterElementBox.appendChild(posterElement);

      const contentsElement = document.createElement("div");
      contentsElement.className = "movieDetailTextBox";

      const titleElement = document.createElement("h2");
      titleElement.textContent = movieTitle;
      contentsElement.appendChild(titleElement);

      const overviewElement = document.createElement("p");
      overviewElement.textContent = movieOverview;
      contentsElement.appendChild(overviewElement);

      const ratingElement = document.createElement("p");
      ratingElement.textContent = movieVoteAverage;
      contentsElement.appendChild(ratingElement);

      containerElement.appendChild(posterElementBox);
      containerElement.appendChild(contentsElement);

      movieDetailsContainer.appendChild(containerElement);
    })
    .catch((err) => {
      console.error(err);
    });
} catch (error) {
  console.error(error);
}
