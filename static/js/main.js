// 1.api요청 : 함수 fetchMovieData()
const fetchMovieData = async () => {
    //
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzFhOWNiZmI5ZmQyYjM0Zjc5NDJhMDE3ZDQzNzk1NCIsInN1YiI6IjY0NzA4OTQ1MTNhMzIwMDEzMzg2MDdhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IRZX6ubYrGSryWyuwy-pz7rwGMOmnbvU9PitigtZTcM',
        },
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);

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
        let cardList = document.querySelector('.card-list');
        cardList.append(movieCard);
    });
};
showMovies();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 3.검색 -> 필터링해서 보여주기 : 함수 sortMovies()
let sortMovies = async (event) => {
    event.preventDefault();
    let movies = await fetchMovieData();

    let cardList = document.querySelector('.card-list');
    cardList.innerHTML = '';

    //필터링
    let searchInput = document.querySelector('#searchInput').value;

    if (searchInput.trim() === '') {
        swal('검색하려는 영화 제목을 입력하세요', '한 글자부터 입력 가능', 'warning');
    }

    // 최근검색어 앵커 클릭 조건 추가
    let targetKeyword = event ? event.target.dataset.keyword : null;
    if (!targetKeyword) {
        saveRecentKeyword();
    } else {
        searchInput = targetKeyword;
    }

    let filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchInput.toLowerCase()));
    if (filteredMovies.length === 0) {
        swal('검색하려는 영화가 없습니다', '', 'error');
        return;
    }
    console.log(filteredMovies);

    let movieCard;
    filteredMovies.map((item) => {
        movieCard = a(item);
        let cardList = document.querySelector('.card-list');
        cardList.append(movieCard);
    });
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 2,3 중복되는 부분 : a()함수
function a(item) {
    let { poster_path, title, overview, vote_average, id } = item;

    let movieCard = document.createElement('a'); // 상세p

    movieCard.className = 'movie-card';
    movieCard.target = 'movie-card';
    movieCard.href = `./pages/details.html?id=${id}`; // 상세p
    movieCard.onclick = function () {
        alert(`ID : ${id}`);
    };

    let posterPathElement = document.createElement('img');
    posterPathElement.src = `https://image.tmdb.org/t/p/w400/${poster_path}`;
    posterPathElement.style.marginLeft = '20px';
    posterPathElement.style.marginTop = '20px';

    let titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.marginLeft = '10px';
    titleElement.style.fontSize = '20px';

    let overviewElement = document.createElement('p');
    overviewElement.textContent = overview;
    overviewElement.style.marginLeft = '10px';
    overviewElement.style.marginRight = '10px';
    overviewElement.style.textAlign = 'justify';

    let voteAverageElement = document.createElement('p');
    voteAverageElement.textContent = `Rating: ${vote_average}`;
    voteAverageElement.style.marginLeft = '10px';
    voteAverageElement.style.marginRight = '10px';

    let idElement = document.createElement('p');
    idElement.textContent = `id: ${id}`;
    idElement.style.marginLeft = '10px';
    idElement.style.marginRight = '10px';

    movieCard.appendChild(posterPathElement);
    movieCard.appendChild(titleElement);
    movieCard.appendChild(overviewElement);
    movieCard.appendChild(voteAverageElement);
    movieCard.appendChild(idElement);

    return movieCard;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//기타기능 : 커서 자동focus
window.addEventListener('load', function () {
    let searchInput = document.querySelector('#searchInput');
    searchInput.focus();
});

// 최근검색어 - 이지영
const $recentList = document.querySelector('#recentList');
let keywordArr = JSON.parse(localStorage.getItem('recentkeyword')) || [];

const saveRecentKeyword = () => {
    let searchInput = document.querySelector('#searchInput');
    const newKeyword = searchInput.value;
    const MAXIMUM_SIZE = 5;

    if (newKeyword == '') return loadRecentKeyword();

    let repeatedIndex = keywordArr.indexOf(newKeyword);
    if (repeatedIndex !== -1) {
        keywordArr.splice(repeatedIndex, 1);
    }

    if (keywordArr.length >= MAXIMUM_SIZE) {
        keywordArr.pop();
    }
    keywordArr.unshift(newKeyword);
    localStorage.setItem('recentkeyword', JSON.stringify(keywordArr));

    loadRecentKeyword();
};

const delRecentKeyword = (e) => {
    let targetKeyword = e.target.dataset.keyword;
    keywordArr = keywordArr.filter((keyword) => keyword !== targetKeyword);
    localStorage.setItem('recentkeyword', JSON.stringify(keywordArr));

    loadRecentKeyword();
};

const loadRecentKeyword = () => {
    $recentList.textContent = '';
    for (const keyword of keywordArr) {
        let temp_html = `<li><a href="#" class="keyword_anchor" data-keyword="${keyword}">${keyword}</a><button type="button" class="del_btn" data-keyword="${keyword}" title="삭제">X</button></li>`;
        $recentList.insertAdjacentHTML('beforeend', temp_html);
    }

    let $delKeywardBtns = document.querySelectorAll('.del_btn');
    $delKeywardBtns.forEach((btn) => {
        btn.addEventListener('click', delRecentKeyword);
    });

    let $searchKeywordAnchors = document.querySelectorAll('.keyword_anchor');
    $searchKeywordAnchors.forEach((Anchor) => {
        Anchor.addEventListener('click', sortMovies);
    });
};

loadRecentKeyword();

// 다크테마 - 이지영
const $themeText = document.querySelector('#themeBtn b');
const $themeBtn = document.querySelector('#themeBtn');
const theme = localStorage.getItem('theme');

const initTheme = () => {
    if (theme) {
        $themeText.innerHTML = theme === 'dark' ? 'ON' : 'OFF';
        document.documentElement.setAttribute('data-theme', theme);
    }
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    $themeText.innerHTML = newTheme === 'dark' ? 'ON' : 'OFF';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

$themeBtn.addEventListener('click', toggleTheme);
initTheme();
