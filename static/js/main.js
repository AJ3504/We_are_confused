// 1.api요청 : 함수 fetchMovieData()
const fetchMovieData = async () => {
  //
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzFhOWNiZmI5ZmQyYjM0Zjc5NDJhMDE3ZDQzNzk1NCIsInN1YiI6IjY0NzA4OTQ1MTNhMzIwMDEzMzg2MDdhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IRZX6ubYrGSryWyuwy-pz7rwGMOmnbvU9PitigtZTcM",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );

  const data = await response.json();

  return data.results;
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 2. 화면에 먼저 전체 목록 보여주기 : 함수 showMovies()

let showMovies = async () => {
  let movies = await fetchMovieData();

  let movieCard;
  movies.map((item) => {
    movieCard = a(item);
    let cardList = document.querySelector(".card-list");
    cardList.append(movieCard);
  });
};
showMovies();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 3.검색 -> 필터링해서 보여주기 : 함수 sortMovies()
let sortMovies = async (event) => {
  event.preventDefault();
  let movies = await fetchMovieData();

  let cardList = document.querySelector(".card-list");
  cardList.innerHTML = "";

  //필터링
  let searchInput = document.getElementById("searchInput").value;
  if (searchInput.trim() === "") {
    alert("검색하려는 영화 제목을 입력하세요");
  }
  let filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  if (filteredMovies.length === 0) {
    alert("검색하려는 영화가 없습니다");
    return;
  }
  console.log(filteredMovies);

  let movieCard;
  filteredMovies.map((item) => {
    movieCard = a(item);
    let cardList = document.querySelector(".card-list");
    cardList.append(movieCard);
  });
};
console.log(searchvalidation);

a(filteredMovies);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 2,3 중복되는 부분 : a()함수
function a(item) {
  let { poster_path, title, overview, vote_average, id } = item;

  let movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  movieCard.onclick = function () {
    alert(`ID : ${id}`);
  };

  let posterPathElement = document.createElement("img");
  posterPathElement.src = `https://image.tmdb.org/t/p/w400/${poster_path}`;
  posterPathElement.style.marginLeft = "20px";
  posterPathElement.style.marginTop = "20px";

  let titleElement = document.createElement("h3");
  titleElement.textContent = title;
  titleElement.style.marginLeft = "10px";
  titleElement.style.fontSize = "20px";

  let overviewElement = document.createElement("p");
  overviewElement.textContent = overview;
  overviewElement.style.marginLeft = "10px";
  overviewElement.style.marginRight = "10px";
  overviewElement.style.textAlign = "justify";

  let voteAverageElement = document.createElement("p");
  voteAverageElement.textContent = `Rating: ${vote_average}`;
  voteAverageElement.style.marginLeft = "10px";
  voteAverageElement.style.marginRight = "10px";

  let idElement = document.createElement("p");
  idElement.textContent = `id: ${id}`;
  idElement.style.marginLeft = "10px";
  idElement.style.marginRight = "10px";

  movieCard.appendChild(posterPathElement);
  movieCard.appendChild(titleElement);
  movieCard.appendChild(overviewElement);
  movieCard.appendChild(voteAverageElement);
  movieCard.appendChild(idElement);

  return movieCard;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//기타기능 : 커서 자동focus
window.addEventListener("load", function () {
  let searchInput = document.querySelector("#searchInput");
  searchInput.focus();
});
